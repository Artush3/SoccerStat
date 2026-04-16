import styles from './Loader.module.scss';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
}

export function Loader({ size = 'md' }: LoaderProps) {
  return (
    <div className={`${styles.loader} ${styles[size]}`}>
      <span className={styles.spinner} />
    </div>
  );
}
