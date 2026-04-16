import { useNavigate } from 'react-router-dom';
import type { Competition } from '@shared/types';
import styles from './LeagueCard.module.scss';

interface LeagueCardProps {
  league: Competition;
}

export function LeagueCard({ league }: LeagueCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/leagues/${league.id}`);
  };

  return (
    <article
      className={styles.card}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`Перейти к лиге ${league.name}`}
    >
      <div className={styles.emblem}>
        {league.emblem ? (
          <img src={league.emblem} alt={`Эмблема ${league.name}`} className={styles.emblemImg} />
        ) : (
          <span className={styles.emblemPlaceholder}>🏆</span>
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{league.name}</h3>
        <p className={styles.area}>
          {league.area.flag && (
            <img src={league.area.flag} alt="" className={styles.flag} />
          )}
          {league.area.name}
        </p>
      </div>
      <span className={styles.arrow}>›</span>
    </article>
  );
}
