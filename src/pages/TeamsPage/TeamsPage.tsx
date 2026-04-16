import { useEffect, useState, useMemo } from 'react';
import { useTeamStore } from '@entities/team';
import { TeamCard } from '@widgets/TeamCard';
import { SearchInput } from '@features/search';
import { Loader } from '@shared/ui/Loader';
import { ErrorMessage } from '@shared/ui/ErrorMessage';
import { Pagination } from '@shared/ui/Pagination';
import styles from './TeamsPage.module.scss';

const PAGE_SIZE = 12;

export function TeamsPage() {
  const { teams, loading, error, fetchTeams } = useTeamStore();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (teams.length === 0) fetchTeams();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return teams.filter(
      (t) =>
        t.name.toLowerCase().includes(q) || (t.shortName ?? '').toLowerCase().includes(q),
    );
  }, [teams, search]);

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
          <h1 className={styles.title}>Команды</h1>
          <SearchInput
            value={search}
            onChange={handleSearch}
            placeholder="Поиск по названию команды..."
          />
        </div>

        {loading && <Loader size="lg" />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <>
            {paginated.length === 0 ? (
              <p className={styles.empty}>Команды не найдены</p>
            ) : (
              <div className={styles.grid}>
                {paginated.map((team) => (
                  <TeamCard key={team.id} team={team} />
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
