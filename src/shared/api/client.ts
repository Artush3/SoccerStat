// Проверяем, запущено ли приложение в окружении Vercel (dev или prod)
// Для локального vercel dev задаём VITE_USE_PROXY=true в .env.local
const isProxy = import.meta.env.PROD || import.meta.env.VITE_USE_PROXY === 'true';

const BASE_URL = isProxy ? '/api/proxy' : import.meta.env.VITE_API_BASE_URL;
const TOKEN = !isProxy ? import.meta.env.VITE_API_TOKEN : undefined;

interface FetchOptions {
  params?: Record<string, string>;
}

async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  let url: string;

  if (isProxy) {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const queryParams = new URLSearchParams();
    queryParams.append('path', cleanEndpoint);

    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
    }

    url = `${BASE_URL}?${queryParams.toString()}`;
  } else {
    url = `${BASE_URL}${endpoint}`;
    if (options.params) {
      const qs = Object.entries(options.params)
        .filter(([, v]) => Boolean(v))
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&');
      if (qs) url += `?${qs}`;
    }
  }

  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (TOKEN) {
    headers['X-Auth-Token'] = TOKEN;
  }

  const response = await fetch(url, { headers });

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