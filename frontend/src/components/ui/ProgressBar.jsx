import styles from './ProgressBar.module.css';

export default function ProgressBar({
  value,
  max = 100,
  color = '#007991',
  bgColor = '#E6F4F6',
  height = 8,
  showLabel = false,
  label,
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div>
      {showLabel || label ? (
        <div className={styles.labelRow}>
          <span className={styles.label}>{label || 'Progress'}</span>
          <span className={styles.pct}>{Math.round(pct)}%</span>
        </div>
      ) : null}
      <div className={styles.track} style={{ height, backgroundColor: bgColor }}>
        <div className={styles.fill} style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export function CircularProgress({ value, size = 64, strokeWidth = 6, color = '#007991' }) {
  const radius = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (value / 100) * circ;

  return (
    <div className={styles.circular} style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }} aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E6F4F6"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={styles.circleFill}
        />
      </svg>
      <span className={styles.circularLabel}>
        <span className={styles.circularValue}>{value}%</span>
      </span>
    </div>
  );
}
