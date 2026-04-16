import { create } from 'zustand';
import { apiFetch } from '@shared/api';
import type { Competition, CompetitionsResponse } from '@shared/types';

interface LeagueState {
  leagues: Competition[];
  count: number;
  loading: boolean;
  error: string | null;
  fetchLeagues: () => Promise<void>;
}

export const useLeagueStore = create<LeagueState>((set) => ({
  leagues: [],
  count: 0,
  loading: false,
  error: null,

  fetchLeagues: async () => {
    set({ loading: true, error: null });
    try {
      const data = await apiFetch<CompetitionsResponse>('/competitions');
      set({ leagues: data.competitions, count: data.count, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },
}));
