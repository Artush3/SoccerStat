import { useEffect, useState, useMemo } from 'react';
import { useLeagueStore } from '@entities/league';
import { LeagueCard } from '@widgets/LeagueCard';
import { SearchInput } from '@features/search';
import { Loader } from '@shared/ui/Loader';
import { ErrorMessage } from '@shared/ui/ErrorMessage';
import { Pagination } from '@shared/ui/Pagination';
import styles from './LeaguesPage.module.scss';

const PAGE_SIZE = 10;

export function LeaguesPage() {
  const { leagues, loading, error, fetchLeagues } = useLeagueStore();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (leagues.length === 0) fetchLeagues();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return leagues.filter(
      (l) => l.name.toLowerCase().includes(q) || l.area.name.toLowerCase().includes(q),
    );
  }, [leagues, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Лиги и соревнования</h1>
          <SearchInput
            value={search}
            onChange={handleSearch}
            placeholder="Поиск по названию или стране..."
          />
        </div>

        {loading && <Loader size="lg" />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <>
            {paginated.length === 0 ? (
              <p className={styles.empty}>Лиги не найдены</p>
            ) : (
              <div className={styles.grid}>
                {paginated.map((league) => (
                  <LeagueCard key={league.id} league={league} />
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
