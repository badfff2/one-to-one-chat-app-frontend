# one-to-one-chat-app-frontend

## Local configuration

Create a `.env` file in the project root (the same directory as `package.json`) with:

```env
VITE_API_BASE_URL=http://localhost:8088
VITE_API_METHOD=GET
```

Vite only exposes variables prefixed with `VITE_`. Restart the dev server after creating or changing `.env`.
