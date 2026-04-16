import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { path, ...otherParams } = req.query; // извлекаем path и остальные параметры

  if (typeof path !== 'string') {
    return res.status(400).json({ error: 'Параметр ?path= обязателен' });
  }

  // Убираем начальный слеш, если есть
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Собираем query-строку для football-data.org из остальных параметров
  const apiUrl = new URL(`https://api.football-data.org/v4/${cleanPath}`);
  Object.entries(otherParams).forEach(([key, value]) => {
    if (typeof value === 'string') {
      apiUrl.searchParams.append(key, value);
    }
  });

  try {
    const apiKey = process.env.FOOTBALL_DATA_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API-ключ не найден' });
    }

    const response = await fetch(apiUrl.toString(), {
      headers: { 'X-Auth-Token': apiKey },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Ошибка прокси-сервера' });
  }
}