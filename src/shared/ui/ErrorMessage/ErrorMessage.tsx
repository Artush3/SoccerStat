import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={styles.error}>
      <span className={styles.icon}>⚠️</span>
      <p className={styles.text}>{message}</p>
    </div>
  );
}
