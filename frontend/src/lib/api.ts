// In dev, Vite proxies /api → localhost:3001
// In production, set VITE_API_URL to your backend URL (e.g. https://noura-api.onrender.com)
export const API_BASE = import.meta.env.VITE_API_URL ?? '';
