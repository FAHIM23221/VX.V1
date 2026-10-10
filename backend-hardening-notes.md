# Backend fixes to apply before deploying

- Set `CORS_ORIGIN=https://fahim23221.github.io` in Render. Browser Origin has no `/VX.V1` path.
- Do not use `origin: '*'` together with credentials. Use an explicit allowlist and `credentials: false` for this bearer-token API.
- Validate `context` is a non-null, non-array object before calling `Object.keys(context)`.
- Confirm Firebase private-key newline handling after storing the environment variable in Render.
- Choose an `OPENAI_MODEL` available in your API project; `gpt-3.5-turbo` may not be available to every new project.
- The frontend must read chat `data.response` and correction `data.correction`, matching the current server contract.
- Never commit `.env`, the OpenAI API key, or Firebase service-account JSON.
