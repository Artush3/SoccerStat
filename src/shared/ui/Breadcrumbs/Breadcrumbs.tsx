import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Навигация">
      {items.map((item, index) => (
        <span key={index} className={styles.item}>
          {index < items.length - 1 && item.to ? (
            <>
              <Link to={item.to} className={styles.link}>
                {item.label}
              </Link>
              <span className={styles.separator}>›</span>
            </>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
