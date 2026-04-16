export function formatDate(utcDate: string): string {
  const date = new Date(utcDate);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatTime(utcDate: string): string {
  const date = new Date(utcDate);
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export const STATUS_LABELS: Record<string, string> = {
  SCHEDULED: 'Запланирован',
  LIVE: 'В прямом эфире',
  IN_PLAY: 'В игре',
  PAUSED: 'Пауза',
  FINISHED: 'Завершён',
  POSTPONED: 'Отложен',
  SUSPENDED: 'Приостановлен',
  CANCELLED: 'Отменён',
};

export function formatScore(
  fullTime: { home: number | null; away: number | null },
  extraTime?: { home: number | null; away: number | null },
  penalties?: { home: number | null; away: number | null },
): string {
  const parts: string[] = [];
  if (fullTime.home !== null && fullTime.away !== null) {
    parts.push(`${fullTime.home}:${fullTime.away}`);
  }
  if (extraTime && extraTime.home !== null && extraTime.away !== null) {
    parts.push(`доп. ${extraTime.home}:${extraTime.away}`);
  }
  if (penalties && penalties.home !== null && penalties.away !== null) {
    parts.push(`пен. ${penalties.home}:${penalties.away}`);
  }
  return parts.join(' | ') || '—';
}
