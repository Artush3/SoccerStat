// Competition / League types
export interface Area {
  id: number;
  name: string;
  flag?: string;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  area: Area;
  emblem?: string;
}

export interface CompetitionsResponse {
  count: number;
  competitions: Competition[];
}

// Team types
export interface Team {
  id: number;
  name: string;
  crest: string;
  shortName?: string;
}

export interface TeamsResponse {
  count: number;
  teams: Team[];
}

// Match types
export interface ScoreDetail {
  home: number | null;
  away: number | null;
}

export interface Score {
  fullTime: ScoreDetail;
  halfTime?: ScoreDetail;
  extraTime?: ScoreDetail;
  penalties?: ScoreDetail;
}

export type MatchStatus =
  | 'SCHEDULED'
  | 'LIVE'
  | 'IN_PLAY'
  | 'PAUSED'
  | 'FINISHED'
  | 'POSTPONED'
  | 'SUSPENDED'
  | 'CANCELLED';

export interface Match {
  id: number;
  utcDate: string;
  status: MatchStatus;
  homeTeam: { id: number; name: string };
  awayTeam: { id: number; name: string };
  score: Score;
  competition?: Competition;
}

export interface MatchesResponse {
  count: number;
  matches: Match[];
}

export interface TeamDetail extends Team {
  founded?: number;
  venue?: string;
  address?: string;
}
