const TOKEN = import.meta.env.VITE_API_TOKEN as string;

// In dev, Vite proxies /api → https://api.football-data.org/v4 (bypasses CORS).
// In production, set VITE_API_BASE_URL to your backend/proxy URL.
const BASE_URL = "/api/proxy?path=";

interface FetchOptions {
  params?: Record<string, string>;
}

async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  // Build query string manually to avoid new URL() with relative paths
  let path = `${BASE_URL}${endpoint}`;

  if (options.params) {
    const qs = Object.entries(options.params)
      .filter(([, v]) => Boolean(v))
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');
    if (qs) path += `?${qs}`;
  }

  const response = await fetch(path, {
    headers: {
      'X-Auth-Token': TOKEN,
    },
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Превышен лимит запросов к API. Пожалуйста, подождите немного.');
    }
    if (response.status === 403) {
      throw new Error('Доступ запрещён. Проверьте токен API.');
    }
    throw new Error(`Ошибка API: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export { apiFetch };
