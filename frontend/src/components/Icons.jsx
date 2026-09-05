function Icon({ path, paths, size = 20, className = '', fill = false }) {
  const segments = paths ?? [path];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ? 'currentColor' : 'none'}
      stroke={fill ? 'none' : 'currentColor'}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {segments.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

export function IconMail({ size = 20, className = '' }) {
  return (
    <Icon
      size={size}
      className={className}
      path="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM22 6l-10 7L2 6"
    />
  );
}

export function IconShield({ size = 20, className = '' }) {
  return <Icon size={size} className={className} path="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />;
}

export function IconEye({ size = 20, className = '' }) {
  return (
    <Icon
      size={size}
      className={className}
      path="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12zM12 15a3 3 0 100-6 3 3 0 000 6"
    />
  );
}

export function IconGraduate({ size = 20, className = '' }) {
  return (
    <Icon
      size={size}
      className={className}
      path="M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5"
    />
  );
}

export function IconDashboard({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

export function IconBook({ size = 20, className = '' }) {
  return (
    <Icon
      size={size}
      className={className}
      path="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 014 17V5a2 2 0 012-2h14a2 2 0 012 2v10M4 19.5V21h16v-1.5M8 7h8M8 11h5"
    />
  );
}

export function IconClipboard({ size = 20, className = '' }) {
  return (
    <Icon
      size={size}
      className={className}
      path="M9 2h6a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1V3a1 1 0 011-1zM5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2zM9 12h6M9 16h4"
    />
  );
}

export function IconCalendar({ size = 20, className = '' }) {
  return (
    <Icon
      size={size}
      className={className}
      path="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
    />
  );
}

export function IconAward({ size = 20, className = '' }) {
  return (
    <Icon
      size={size}
      className={className}
      path="M12 15a6 6 0 100-12 6 6 0 000 12zM8.21 13.89L7 23l5-3 5 3-1.21-9.12"
    />
  );
}

export function IconCreditCard({ size = 20, className = '' }) {
  return (
    <Icon
      size={size}
      className={className}
      path="M1 10h22M1 6.5a2 2 0 012-2h18a2 2 0 012 2v11a2 2 0 01-2 2H3a2 2 0 01-2-2V6.5zM6 15h1M10 15h4"
    />
  );
}

export function IconMedal({ size = 20, className = '' }) {
  return (
    <Icon
      size={size}
      className={className}
      path="M12 2l2.09 6.26L20 9.27l-4.5 4.38 1.09 6.34L12 17l-4.59 2.99 1.09-6.34L4 9.27l5.91-.91L12 2z"
    />
  );
}

export function IconHelp({ size = 20, className = '' }) {
  return (
    <Icon
      size={size}
      className={className}
      path="M12 22a10 10 0 100-20 10 10 0 000 20zM9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"
    />
  );
}

export function IconSettings({ size = 20, className = '' }) {
  return (
    <Icon
      size={size}
      className={className}
      path="M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
    />
  );
}

export function IconLogOut({ size = 20, className = '' }) {
  return (
    <Icon
      size={size}
      className={className}
      path="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
    />
  );
}

export function IconMenu({ size = 20, className = '' }) {
  return <Icon size={size} className={className} path="M3 12h18M3 6h18M3 18h18" />;
}

export function IconX({ size = 20, className = '' }) {
  return <Icon size={size} className={className} path="M18 6L6 18M6 6l12 12" />;
}

export function IconBell({ size = 20, className = '' }) {
  return (
    <Icon
      size={size}
      className={className}
      path="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 01-3.46 0"
    />
  );
}

export function IconSearch({ size = 20, className = '' }) {
  return (
    <Icon
      size={size}
      className={className}
      path="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"
    />
  );
}

export function IconCheck({ size = 20, className = '' }) {
  return <Icon size={size} className={className} path="M20 6L9 17l-5-5" />;
}

export function IconPlay({ size = 20, className = '' }) {
  return <Icon size={size} className={className} path="M5 3l14 9-14 9V3z" fill />;
}

export function IconChevronRight({ size = 20, className = '' }) {
  return <Icon size={size} className={className} path="M9 18l6-6-6-6" />;
}

export function IconAlertTriangle({ size = 20, className = '' }) {
  return (
    <Icon
      size={size}
      className={className}
      path="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"
    />
  );
}

export function IconTrendingUp({ size = 20, className = '' }) {
  return <Icon size={size} className={className} path="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />;
}
