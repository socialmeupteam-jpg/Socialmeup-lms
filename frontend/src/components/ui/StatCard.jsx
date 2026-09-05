import styles from './StatCard.module.css';

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconBg = '#E6F4F6',
  iconColor = '#007991',
  trend,
  onClick,
}) {
  const trendClass =
    trend && trend.positive !== false ? styles.trendPositive : styles.trendNegative;

  return (
    <div
      className={`${styles.card} ${onClick ? styles.clickable : ''}`}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className={styles.row}>
        <div className={styles.body}>
          <p className={styles.title}>{title}</p>
          <p className={styles.value}>{value}</p>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
          {trend ? (
            <div className={`${styles.trend} ${trendClass}`}>
              <span>{trend.positive !== false ? '↑' : '↓'}</span>
              <span>{trend.value}%</span>
              {trend.label ? <span className={styles.trendLabel}>{trend.label}</span> : null}
            </div>
          ) : null}
        </div>
        {icon ? (
          <div className={styles.icon} style={{ backgroundColor: iconBg, color: iconColor }}>
            {icon}
          </div>
        ) : null}
      </div>
    </div>
  );
}
