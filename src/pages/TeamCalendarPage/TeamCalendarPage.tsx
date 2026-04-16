import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMatchStore } from '@entities/match';
import { useTeamStore } from '@entities/team';
import { MatchCard } from '@widgets/MatchCard';
import { DateFilter } from '@features/dateFilter';
import { Loader } from '@shared/ui/Loader';
import { ErrorMessage } from '@shared/ui/ErrorMessage';
import { Breadcrumbs } from '@shared/ui/Breadcrumbs';
import { Pagination } from '@shared/ui/Pagination';
import styles from './TeamCalendarPage.module.scss';

const PAGE_SIZE = 15;

export function TeamCalendarPage() {
  const { id } = useParams<{ id: string }>();
  const teamId = Number(id);

  const { matches, loading, error, fetchTeamMatches } = useMatchStore();
  const { teamDetail, fetchTeamDetail } = useTeamStore();

  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (teamId) {
      fetchTeamDetail(teamId);
      fetchTeamMatches(teamId);
    }
  }, [teamId]);

  const handleApply = () => {
    setPage(1);
    fetchTeamMatches(teamId, { dateFrom, dateTo });
  };

  const handleReset = () => {
    setDateFrom('');
    setDateTo('');
    setPage(1);
    fetchTeamMatches(teamId);
  };

  const totalPages = Math.ceil(matches.length / PAGE_SIZE);
  const paginated = matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const teamName = teamDetail?.name ?? `Команда #${teamId}`;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs
          items={[
            { label: 'Команды', to: '/teams' },
            { label: teamName },
          ]}
        />

        <div className={styles.teamHeader}>
          {teamDetail?.crest && (
            <img src={teamDetail.crest} alt={teamName} className={styles.crest} />
          )}
          <h1 className={styles.title}>{teamName}</h1>
        </div>

        <DateFilter
          dateFrom={dateFrom}
          dateTo={dateTo}
          onDateFromChange={setDateFrom}
          onDateToChange={setDateTo}
          onApply={handleApply}
          onReset={handleReset}
        />

        {loading && <Loader size="lg" />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <>
            {paginated.length === 0 ? (
              <p className={styles.empty}>Матчи не найдены</p>
            ) : (
              <div className={styles.list}>
                {paginated.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            )}
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </div>
    </main>
  );
}
