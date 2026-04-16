import { useNavigate } from 'react-router-dom';
import type { Team } from '@shared/types';
import styles from './TeamCard.module.scss';

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/teams/${team.id}`);
  };

  return (
    <article
      className={styles.card}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`Перейти к команде ${team.name}`}
    >
      <div className={styles.crest}>
        {team.crest ? (
          <img src={team.crest} alt={`Герб ${team.name}`} className={styles.crestImg} />
        ) : (
          <span className={styles.crestPlaceholder}>🛡️</span>
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{team.name}</h3>
        {team.shortName && <p className={styles.short}>{team.shortName}</p>}
      </div>
      <span className={styles.arrow}>›</span>
    </article>
  );
}
