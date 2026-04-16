import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '@widgets/Header';
import { LeaguesPage } from '@pages/LeaguesPage';
import { LeagueCalendarPage } from '@pages/LeagueCalendarPage';
import { TeamsPage } from '@pages/TeamsPage';
import { TeamCalendarPage } from '@pages/TeamCalendarPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/leagues" replace />} />
        <Route path="/leagues" element={<LeaguesPage />} />
        <Route path="/leagues/:id" element={<LeagueCalendarPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/teams/:id" element={<TeamCalendarPage />} />
        <Route path="*" element={<Navigate to="/leagues" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
