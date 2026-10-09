# Lexora AI English Tutor - Setup & Deployment Guide

## Overview

The AI English Tutor is a secure, scalable backend service that provides:
- Real-time English grammar explanations
- Sentence correction with feedback
- Beginner-friendly lessons (bilingual: English & Bengali)
- Per-user conversation history (Firestore)
- Rate limiting and input validation
- Server-side API key management (no secrets in frontend)

## Architecture

```
┌─────────────────────┐
│   Lexora Frontend   │  (index.html + tutor module)
│   (GitHub Pages)    │  Uses Firebase Auth, no API key exposure
└────────┬────────────┘
         │ HTTPS + Firebase ID Token
         ↓
┌─────────────────────────────────────────┐
│   Node.js/Express Backend               │
│   (tutor-backend/server.js)             │
│   - Verify Firebase ID token            │
│   - Validate & sanitize input           │
│   - Call OpenAI API (server-only)       │
│   - Store in Firestore (per-user)       │
│   - Rate limit requests                 │
└────────┬────────────────────┬───────────┘
         │                    │
         ↓                    ↓
    ┌─────────┐          ┌──────────┐
    │ OpenAI  │          │Firestore │
    │ API     │          │ Database │
    └─────────┘          └──────────┘
```

## Prerequisites

1. **Node.js** >= 14
2. **Firebase Project** (lexora-ba446)
3. **OpenAI API Key** (from openai.com)
4. **Firebase Admin SDK credentials** (JSON key from Firebase Console)

## Installation

### 1. Backend Setup

```bash
cd tutor-backend
npm install
```

### 2. Environment Configuration

1. Download Firebase Admin SDK private key:
   - Go to Firebase Console → Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save as `tutor-backend/.env`

2. Create `.env` file:

```env
# Firebase Admin SDK
FIREBASE_PROJECT_ID=lexora-ba446
FIREBASE_PRIVATE_KEY_ID=your_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@lexora-ba446.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=123456789
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token

# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-3.5-turbo

# Server
PORT=3000
NODE_ENV=production

# Rate Limiting (10 requests per minute)
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=10

# CORS
CORS_ORIGIN=https://fahim23221.github.io/VX.V1
```

### 3. Run Tests

```bash
node tests/validation.test.js
```

**Expected output:**
```
✓ sanitizeInput: normal text
✓ sanitizeInput: removes HTML tags
✓ sanitizeInput: respects maxLength
✓ validateLanguage: accepts en
✓ validateLanguage: accepts bn
✓ validateLanguage: defaults invalid to en

Results: 6 passed, 0 failed out of 6 tests
```

### 4. Deploy Firestore Rules

```bash
cd tutor-backend
firebase login
firebase init
firebase deploy --only firestore:rules
```

Or manually copy `firestore-rules.txt` into Firebase Console → Firestore → Rules.

## Deployment Options

### Option A: Heroku (Free Tier or Paid)

1. Create Heroku account and install CLI
2. Create new app: `heroku create lexora-ai-tutor`
3. Add environment variables:
   ```bash
   heroku config:set FIREBASE_PROJECT_ID=lexora-ba446
   heroku config:set FIREBASE_PRIVATE_KEY="..."
   # ... set all .env variables
   ```
4. Deploy:
   ```bash
   git push heroku main
   ```

### Option B: Google Cloud Run (Recommended)

1. Ensure you have `gcloud` CLI
2. Build and deploy:
   ```bash
   gcloud run deploy lexora-ai-tutor \
     --source tutor-backend \
     --platform managed \
     --region us-central1 \
     --set-env-vars FIREBASE_PROJECT_ID=lexora-ba446,OPENAI_API_KEY=sk-...
   ```

### Option C: AWS Lambda

1. Use AWS SAM or Serverless framework
2. Bundle Node app + dependencies
3. Set environment variables in Lambda console
4. Deploy and note the API Gateway URL

## Firestore Security Rules

The following rules are **required** for the tutor to work safely:

```firestore
match /tutor_conversations/{uid} {
  allow read, write: if request.auth.uid == uid;
  match /chats/{chatId} {
    allow read, create: if request.auth.uid == uid;
    allow update, delete: if false;  // Immutable history
  }
}
```

**Important:** This restricts all conversation data to the authenticated user's UID.

## Frontend Integration

The tutor is integrated into `index.html`:

1. **UI Tab:** A "Tutor" tab is added to the main Lexora tabs
2. **Auth:** Tutor requests use existing Firebase ID token from `firebase.auth().currentUser`
3. **Endpoint:** Set `window.LEXORA_TUTOR_API` to your backend URL:
   ```javascript
   window.LEXORA_TUTOR_API = 'https://lexora-ai-tutor.herokuapp.com';
   ```

## API Endpoints

### 1. Chat (`POST /api/tutor/chat`)

**Request:**
```json
{
  "message": "What is present continuous tense?",
  "language": "en",
  "context": { "currentWordLearn": "running" }
}
```

**Headers:**
```
Authorization: Bearer <Firebase ID Token>
Content-Type: application/json
```

**Response:**
```json
{
  "success": true,
  "response": "Present continuous describes actions happening right now...",
  "language": "en",
  "conversationId": "abc123"
}
```

### 2. Grammar Correction (`POST /api/tutor/correct`)

**Request:**
```json
{
  "sentence": "I am going to school yesterday",
  "language": "en"
}
```

**Response:**
```json
{
  "success": true,
  "original": "I am going to school yesterday",
  "correction": "Should be: 'I went to school yesterday' (past tense with yesterday)",
  "language": "en"
}
```

## Rate Limiting

- **Default:** 10 requests per minute per IP/token
- **Error:** HTTP 429 Too Many Requests
- **Adjust:** Set `RATE_LIMIT_MAX_REQUESTS` in `.env`

## Logging & Monitoring

1. **Backend Logs:**
   ```bash
   heroku logs --tail
   # or
   gcloud run logs read lexora-ai-tutor
   ```

2. **Firestore Usage:**
   - Firebase Console → Firestore → Usage
   - Monitor reads/writes under `tutor_conversations`

3. **OpenAI API Usage:**
   - openai.com → Usage → API → Overview
   - Set billing alerts

## Troubleshooting

### "Invalid or expired token"
- Check frontend is passing `Authorization: Bearer <token>`
- Ensure token is fresh (< 1 hour old)
- Verify Firebase auth is initialized in frontend

### "Failed to process request"
- Check OpenAI API key is valid
- Ensure Firestore rules are deployed
- Review backend logs for details

### Rate limit errors
- Increase `RATE_LIMIT_MAX_REQUESTS`
- Or implement client-side debouncing

## Cost Estimates (Monthly)

- **OpenAI (gpt-3.5-turbo):** ~$0.05–$2 (depending on usage)
- **Firestore:** $0.06 per 100K reads + $0.18 per 100K writes (free tier: 50K reads/day)
- **Cloud Run:** $0.00007 per vCPU-second (free tier: 2M requests/month)

## Security Checklist

- ✅ OpenAI API key stored in `.env`, never in frontend
- ✅ Firebase ID token verified server-side
- ✅ Input sanitized (max length, no HTML tags)
- ✅ Rate limiting enabled
- ✅ Firestore rules restrict access to user's own data
- ✅ CORS limited to frontend origin
- ✅ Conversation history is immutable (no delete/update)

## Support

For issues or questions:
1. Check logs: `heroku logs --tail` or `gcloud run logs read`
2. Review Firestore rules in Firebase Console
3. Test endpoints manually with `curl` or Postman
4. Verify `.env` variables are set correctly
