import { create } from 'zustand';
import { apiFetch } from '@shared/api';
import type { Team, TeamDetail, TeamsResponse } from '@shared/types';

interface TeamState {
  teams: Team[];
  count: number;
  teamDetail: TeamDetail | null;
  loading: boolean;
  error: string | null;
  fetchTeams: () => Promise<void>;
  fetchTeamDetail: (id: number) => Promise<void>;
}

export const useTeamStore = create<TeamState>((set) => ({
  teams: [],
  count: 0,
  teamDetail: null,
  loading: false,
  error: null,

  fetchTeams: async () => {
    set({ loading: true, error: null });
    try {
      const data = await apiFetch<TeamsResponse>('/teams');
      set({ teams: data.teams, count: data.count, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  fetchTeamDetail: async (id: number) => {
    set({ loading: true, error: null, teamDetail: null });
    try {
      const data = await apiFetch<TeamDetail>(`/teams/${id}`);
      set({ teamDetail: data, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },
}));
