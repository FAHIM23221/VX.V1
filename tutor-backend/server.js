require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const admin = require('firebase-admin');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== Security: Initialize Firebase Admin =====
const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  clientId: process.env.FIREBASE_CLIENT_ID,
  authUri: process.env.FIREBASE_AUTH_URI,
  tokenUri: process.env.FIREBASE_TOKEN_URI,
};

try {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
  console.log('Firebase Admin initialized.');
} catch (err) {
  console.error('Firebase Admin init failed:', err.message);
}

const db = admin.firestore();
const auth = admin.auth();

// ===== Security: Initialize OpenAI (server-side only) =====
const openaiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(openaiConfig);

// ===== Middleware =====
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));

// ===== Rate Limiting =====
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 10,
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// ===== Input Validation =====
function sanitizeInput(text, maxLength = 1000) {
  if (typeof text !== 'string') return '';
  return text.trim().slice(0, maxLength).replace(/[<>"']/g, '');
}

function validateLanguage(lang) {
  return ['en', 'bn'].includes(lang) ? lang : 'en';
}

// ===== Firebase ID Token Verification Middleware =====
async function verifyIdToken(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token) {
    return res.status(401).json({ error: 'No auth token provided.' });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.uid = decodedToken.uid;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(403).json({ error: 'Invalid or expired token.' });
  }
}

// ===== Health Check =====
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'lexora-ai-tutor' });
});

// ===== AI Tutor Chat Endpoint =====
app.post('/api/tutor/chat', limiter, verifyIdToken, async (req, res) => {
  const { message, language = 'en', context = {} } = req.body;

  // Validate input
  const sanitized = sanitizeInput(message, 500);
  if (!sanitized) {
    return res.status(400).json({ error: 'Invalid message.' });
  }

  const lang = validateLanguage(language);

  try {
    // Call OpenAI API
    const systemPrompt =
      lang === 'bn'
        ? 'You are a beginner-friendly English tutor. Explain concepts in simple Bengali. Be concise, positive, and focus on one concept at a time.'
        : 'You are a beginner-friendly English tutor. Explain grammar and usage simply. Be encouraging and focus on one concept at a time.';

    const response = await openai.createChatCompletion({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: sanitized },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const tutorResponse = response.data.choices[0]?.message?.content || 'No response.';

    // Save to Firestore (per-user, scoped by UID)
    const conversationRef = db
      .collection('tutor_conversations')
      .doc(req.uid)
      .collection('chats')
      .doc();

    await conversationRef.set({
      userMessage: sanitized,
      tutorResponse,
      language: lang,
      context: context || {},
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      uid: req.uid,
    });

    res.json({
      success: true,
      response: tutorResponse,
      language: lang,
      conversationId: conversationRef.id,
    });
  } catch (err) {
    console.error('Tutor chat error:', err.message);
    res.status(500).json({ error: 'Failed to process request.' });
  }
});

// ===== Grammar Correction Endpoint =====
app.post('/api/tutor/correct', limiter, verifyIdToken, async (req, res) => {
  const { sentence, language = 'en' } = req.body;

  const sanitized = sanitizeInput(sentence, 500);
  if (!sanitized) {
    return res.status(400).json({ error: 'Invalid sentence.' });
  }

  const lang = validateLanguage(language);

  try {
    const prompt =
      lang === 'bn'
        ? `আপনি একটি ইংরেজি শিক্ষক। নিম্নলিখিত বাক্যটি পরীক্ষা করুন এবং সংক্ষিপ্ত মন্তব্য দিন:\n\n"${sanitized}"\n\nFeedback এবং সঠিক সংস্করণ তুরুপ শেয়ার করুন।`
        : `You are an English teacher. Review this sentence and provide brief, encouraging feedback:\n\n"${sanitized}"\n\nState if it's correct, suggest improvements if needed, and provide the corrected version.`;

    const response = await openai.createChatCompletion({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
      temperature: 0.5,
    });

    const correction = response.data.choices[0]?.message?.content || 'Unable to correct.';

    res.json({
      success: true,
      original: sanitized,
      correction,
      language: lang,
    });
  } catch (err) {
    console.error('Grammar correction error:', err.message);
    res.status(500).json({ error: 'Failed to correct sentence.' });
  }
});

// ===== Error Handler =====
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`AI Tutor backend running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
