require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const admin = require('firebase-admin');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== Validate Required Environment Variables =====
const requiredEnvVars = [
  'FIREBASE_PROJECT_ID',
  'FIREBASE_PRIVATE_KEY_ID',
  'FIREBASE_PRIVATE_KEY',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_CLIENT_ID',
  'FIREBASE_AUTH_URI',
  'FIREBASE_TOKEN_URI',
  'OPENAI_API_KEY',
];

const missingVars = requiredEnvVars.filter(v => !process.env[v]);
if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '));
  process.exit(1);
}

// ===== Security: Initialize Firebase Admin =====
const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  clientId: process.env.FIREBASE_CLIENT_ID,
  authUri: process.env.FIREBASE_AUTH_URI,
  tokenUri: process.env.FIREBASE_TOKEN_URI,
};

let db, auth;

try {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  }
  db = admin.firestore();
  auth = admin.auth();
  console.log('✓ Firebase Admin initialized successfully');
} catch (err) {
  console.error('❌ Firebase Admin init failed:', err.message);
  process.exit(1);
}

// ===== Security: Initialize OpenAI (server-side only) =====
let openai;
try {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  console.log('✓ OpenAI client initialized successfully');
} catch (err) {
  console.error('❌ OpenAI init failed:', err.message);
  process.exit(1);
}

// ===== Middleware =====
app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
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
  return text.trim().slice(0, maxLength);
}

function validateLanguage(lang) {
  return ['en', 'bn'].includes(lang) ? lang : 'en';
}

function validateRequestBody(body, requiredFields) {
  const errors = [];
  requiredFields.forEach(field => {
    if (!(field in body)) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  return errors.length > 0 ? errors : null;
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
  const validationErrors = validateRequestBody(req.body, ['message']);
  if (validationErrors) {
    return res.status(400).json({ error: 'Bad request', details: validationErrors });
  }

  const sanitized = sanitizeInput(message, 500);
  if (!sanitized) {
    return res.status(400).json({ error: 'Message cannot be empty.' });
  }

  const lang = validateLanguage(language);

  // Validate context size
  if (typeof context !== 'object' || Object.keys(context).length > 20) {
    return res.status(400).json({ error: 'Invalid or oversized context.' });
  }

  try {
    // Call OpenAI API
    const systemPrompt =
      lang === 'bn'
        ? 'আপনি একজন শিক্ষানবিস-বান্ধব ইংরেজি শিক্ষক। সহজ বাংলায় ব্যাখ্যা করুন। সংক্ষিপ্ত, ইতিবাচক থাকুন এবং একবারে একটি ধারণায় ফোকাস করুন।'
        : 'You are a beginner-friendly English tutor. Explain grammar and usage simply. Be encouraging and focus on one concept at a time.';

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: sanitized },
      ],
      max_tokens: 300,
      temperature: 0.7,
      timeout: 30000,
    });

    const tutorResponse = response.choices[0]?.message?.content || 'No response.';

    // Save to Firestore (per-user, scoped by UID)
    try {
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

      return res.json({
        success: true,
        response: tutorResponse,
        language: lang,
        conversationId: conversationRef.id,
      });
    } catch (firestoreErr) {
      console.error('Firestore write error:', firestoreErr.message);
      // Return the AI response even if Firestore fails, but indicate persistence failed
      return res.status(207).json({
        success: true,
        response: tutorResponse,
        language: lang,
        warning: 'Response generated but not saved to history.',
      });
    }
  } catch (err) {
    console.error('Tutor chat error:', err.message);
    if (err.message.includes('API')) {
      return res.status(502).json({ error: 'AI service unavailable. Please try again.' });
    }
    res.status(500).json({ error: 'Failed to process request.' });
  }
});

// ===== Grammar Correction Endpoint =====
app.post('/api/tutor/correct', limiter, verifyIdToken, async (req, res) => {
  const { sentence, language = 'en' } = req.body;

  // Validate input
  const validationErrors = validateRequestBody(req.body, ['sentence']);
  if (validationErrors) {
    return res.status(400).json({ error: 'Bad request', details: validationErrors });
  }

  const sanitized = sanitizeInput(sentence, 500);
  if (!sanitized) {
    return res.status(400).json({ error: 'Sentence cannot be empty.' });
  }

  const lang = validateLanguage(language);

  try {
    const prompt =
      lang === 'bn'
        ? `আপনি একটি ইংরেজি শিক্ষক। নিম্নলিখিত বাক্যটি পর্যালোচনা করুন এবং সংক্ষিপ্ত, উৎসাহব্যঞ্জক প্রতিক্রিয়া প্রদান করুন:\n\n"${sanitized}"\n\nবলুন এটি সঠিক কিনা, প্রয়োজন হলে উন্নতি প্রস্তাব করুন এবং সঠিক সংস্করণ প্রদান করুন।`
        : `You are an English teacher. Review this sentence and provide brief, encouraging feedback:\n\n"${sanitized}"\n\nState if it's correct, suggest improvements if needed, and provide the corrected version.`;

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
      temperature: 0.5,
      timeout: 30000,
    });

    const correction = response.choices[0]?.message?.content || 'Unable to correct.';

    res.json({
      success: true,
      original: sanitized,
      correction,
      language: lang,
    });
  } catch (err) {
    console.error('Grammar correction error:', err.message);
    if (err.message.includes('API')) {
      return res.status(502).json({ error: 'AI service unavailable. Please try again.' });
    }
    res.status(500).json({ error: 'Failed to correct sentence.' });
  }
});

// ===== Error Handler =====
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal server error.' });
});

// ===== Start Server =====
const server = app.listen(PORT, () => {
  console.log(`✓ AI Tutor backend running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app;
