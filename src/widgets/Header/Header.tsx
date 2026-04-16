import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoIcon}>⚽</span>
          <span className={styles.logoText}>SoccerStat</span>
        </NavLink>

        <nav className={styles.nav}>
          <NavLink
            to="/leagues"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            Лиги
          </NavLink>
          <NavLink
            to="/teams"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            Команды
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
