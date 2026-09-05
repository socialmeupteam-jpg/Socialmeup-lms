import styles from './Badge.module.css';

const VARIANTS = {
  primary: 'primary',
  cta: 'cta',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
  neutral: 'neutral',
  teal: 'teal',
};

export default function Badge({ children, variant = 'neutral', size = 'sm', dot = false, className = '' }) {
  const classNames = [
    styles.badge,
    styles[VARIANTS[variant] || 'neutral'],
    size === 'md' ? styles.md : styles.sm,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames}>
      {dot ? <span className={`${styles.dot} ${styles[`dot_${VARIANTS[variant] || 'neutral'}`]}`} /> : null}
      {children}
    </span>
  );
}

const STATUS_MAP = {
  active: { label: 'Active', variant: 'success' },
  completed: { label: 'Completed', variant: 'primary' },
  pending: { label: 'Pending', variant: 'warning' },
  submitted: { label: 'Submitted', variant: 'info' },
  graded: { label: 'Graded', variant: 'success' },
  late: { label: 'Late', variant: 'warning' },
  resubmit: { label: 'Resubmit', variant: 'cta' },
};

export function StatusBadge({ status }) {
  const mapped = STATUS_MAP[status] ?? { label: status, variant: 'neutral' };
  return (
    <Badge variant={mapped.variant} dot>
      {mapped.label}
    </Badge>
  );
}
