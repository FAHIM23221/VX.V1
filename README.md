# Lexora AI Tutor integration patch

This is an add-on for the existing Lexora `index.html`; it does not replace your existing page.

1. Upload `frontend-tutor-integration.js` and `frontend-tutor-styles.css` to the GitHub Pages root.
2. Add near the end of `<head>` in `index.html`:
```html
<script>window.LEXORA_TUTOR_API = 'https://YOUR-BACKEND.onrender.com';</script>
<link rel="stylesheet" href="frontend-tutor-styles.css">
<script src="frontend-tutor-integration.js" defer></script>
```
Replace the URL with the actual deployed backend URL.
3. Deploy `tutor-backend` as a Render Web Service with Root Directory `tutor-backend`, Build `npm install`, Start `npm start`, Health Check `/health`.
4. Add Firebase service-account fields and `OPENAI_API_KEY` only in Render Environment settings. Never upload private keys or OpenAI keys to GitHub or chat.

The backend currently responds with `response` for chat and `correction` for correction; this add-on uses those exact names.
