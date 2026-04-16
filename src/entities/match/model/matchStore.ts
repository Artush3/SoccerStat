import { create } from 'zustand';
import { apiFetch } from '@shared/api';
import type { Match, MatchesResponse } from '@shared/types';

interface MatchFilters {
  dateFrom?: string;
  dateTo?: string;
}

interface MatchState {
  matches: Match[];
  count: number;
  loading: boolean;
  error: string | null;
  fetchLeagueMatches: (competitionId: number, filters?: MatchFilters) => Promise<void>;
  fetchTeamMatches: (teamId: number, filters?: MatchFilters) => Promise<void>;
}

export const useMatchStore = create<MatchState>((set) => ({
  matches: [],
  count: 0,
  loading: false,
  error: null,

  fetchLeagueMatches: async (competitionId, filters = {}) => {
    set({ loading: true, error: null });
    try {
      const params: Record<string, string> = {};
      if (filters.dateFrom) params.dateFrom = filters.dateFrom;
      if (filters.dateTo) params.dateTo = filters.dateTo;

      const data = await apiFetch<MatchesResponse>(`/competitions/${competitionId}/matches`, {
        params,
      });
      set({ matches: data.matches, count: data.count, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  fetchTeamMatches: async (teamId, filters = {}) => {
    set({ loading: true, error: null });
    try {
      const params: Record<string, string> = {};
      if (filters.dateFrom) params.dateFrom = filters.dateFrom;
      if (filters.dateTo) params.dateTo = filters.dateTo;

      const data = await apiFetch<MatchesResponse>(`/teams/${teamId}/matches`, { params });
      set({ matches: data.matches, count: data.count, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },
}));
