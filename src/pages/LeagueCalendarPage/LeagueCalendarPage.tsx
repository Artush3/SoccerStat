import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMatchStore } from '@entities/match';
import { useLeagueStore } from '@entities/league';
import { MatchCard } from '@widgets/MatchCard';
import { DateFilter } from '@features/dateFilter';
import { Loader } from '@shared/ui/Loader';
import { ErrorMessage } from '@shared/ui/ErrorMessage';
import { Breadcrumbs } from '@shared/ui/Breadcrumbs';
import { Pagination } from '@shared/ui/Pagination';
import styles from './LeagueCalendarPage.module.scss';

const PAGE_SIZE = 15;

export function LeagueCalendarPage() {
  const { id } = useParams<{ id: string }>();
  const competitionId = Number(id);

  const { matches, loading, error, fetchLeagueMatches } = useMatchStore();
  const { leagues, fetchLeagues } = useLeagueStore();

  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);

  const league = leagues.find((l) => l.id === competitionId);

  useEffect(() => {
    if (leagues.length === 0) fetchLeagues();
  }, []);

  useEffect(() => {
    if (competitionId) {
      fetchLeagueMatches(competitionId);
    }
  }, [competitionId]);

  const handleApply = () => {
    setPage(1);
    fetchLeagueMatches(competitionId, { dateFrom, dateTo });
  };

  const handleReset = () => {
    setDateFrom('');
    setDateTo('');
    setPage(1);
    fetchLeagueMatches(competitionId);
  };

  const totalPages = Math.ceil(matches.length / PAGE_SIZE);
  const paginated = matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs
          items={[
            { label: 'Лиги', to: '/leagues' },
            { label: league?.name ?? `Лига #${competitionId}` },
          ]}
        />

        <h1 className={styles.title}>{league?.name ?? 'Календарь лиги'}</h1>

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
