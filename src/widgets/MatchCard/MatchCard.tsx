import type { Match } from '@shared/types';
import { formatDate, formatTime, formatScore, STATUS_LABELS } from '@shared/lib';
import styles from './MatchCard.module.scss';

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const statusLabel = STATUS_LABELS[match.status] ?? match.status;
  const isFinished = match.status === 'FINISHED';
  const isLive = match.status === 'LIVE' || match.status === 'IN_PLAY';

  const scoreText =
    isFinished || isLive
      ? formatScore(match.score.fullTime, match.score.extraTime, match.score.penalties)
      : null;

  return (
    <div className={styles.card}>
      <div className={styles.meta}>
        <span className={styles.date}>{formatDate(match.utcDate)}</span>
        <span className={styles.time}>{formatTime(match.utcDate)}</span>
        <span
          className={`${styles.status} ${isLive ? styles.statusLive : ''} ${isFinished ? styles.statusDone : ''}`}
        >
          {statusLabel}
        </span>
      </div>

      <div className={styles.matchup}>
        <span className={styles.team}>{match.homeTeam.name}</span>
        <div className={styles.score}>
          {scoreText ? <span className={styles.scoreText}>{scoreText}</span> : <span>—</span>}
        </div>
        <span className={`${styles.team} ${styles.awayTeam}`}>{match.awayTeam.name}</span>
      </div>
    </div>
  );
}
