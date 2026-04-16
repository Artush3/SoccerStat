import styles from './DateFilter.module.scss';

interface DateFilterProps {
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
}

export function DateFilter({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  onApply,
  onReset,
}: DateFilterProps) {
  const isApplyDisabled = !dateFrom || !dateTo;

  return (
    <div className={styles.filter}>
      <div className={styles.fields}>
        <label className={styles.field}>
          <span className={styles.label}>Дата с</span>
          <input
            type="date"
            className={styles.input}
            value={dateFrom}
            onChange={(e) => onDateFromChange(e.target.value)}
            aria-label="Дата начала"
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Дата по</span>
          <input
            type="date"
            className={styles.input}
            value={dateTo}
            onChange={(e) => onDateToChange(e.target.value)}
            aria-label="Дата окончания"
          />
        </label>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.applyBtn}
          onClick={onApply}
          disabled={isApplyDisabled}
          title={isApplyDisabled ? 'Укажите обе даты для фильтрации' : undefined}
        >
          Применить
        </button>
        <button className={styles.resetBtn} onClick={onReset}>
          Сбросить
        </button>
      </div>
    </div>
  );
}
