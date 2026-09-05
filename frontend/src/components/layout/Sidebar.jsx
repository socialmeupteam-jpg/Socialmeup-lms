import { useLms } from '../../context/LmsContext.jsx';
import {
  IconAward,
  IconBook,
  IconCalendar,
  IconClipboard,
  IconCreditCard,
  IconDashboard,
  IconGraduate,
  IconHelp,
  IconLogOut,
  IconMail,
  IconMedal,
  IconSettings,
  IconX,
} from '../Icons.jsx';
import styles from './Sidebar.module.css';

const NAV_GROUPS = [
  {
    label: 'Main',
    items: [{ id: 'student-dashboard', label: 'Dashboard', icon: IconDashboard }],
  },
  {
    label: 'Learning',
    items: [
      { id: 'student-courses', label: 'My Courses', icon: IconBook },
      { id: 'student-assignments', label: 'Assignments', icon: IconClipboard },
      { id: 'student-attendance', label: 'Attendance', icon: IconCalendar },
      { id: 'student-grades', label: 'Grades', icon: IconAward },
    ],
  },
  {
    label: 'Finance',
    items: [
      { id: 'student-payments', label: 'Payments', icon: IconCreditCard },
      { id: 'student-certificates', label: 'Certificates', icon: IconMedal },
    ],
  },
  {
    label: 'Support',
    items: [
      { id: 'student-messages', label: 'Messages', icon: IconMail, badge: 2 },
      { id: 'student-grievances', label: 'Support', icon: IconHelp },
    ],
  },
];

export default function Sidebar() {
  const { currentUser, currentPage, navigate, logout, sidebarOpen, toggleSidebar } = useLms();

  const avatarInitials = currentUser.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      {sidebarOpen ? (
        <button
          type="button"
          className={styles.overlay}
          aria-label="Close sidebar"
          onClick={toggleSidebar}
        />
      ) : null}

      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}>
        <div className={styles.logoArea}>
          <div className={styles.logoRow}>
            <div className={styles.logoMark}>
              <IconGraduate size={18} />
            </div>
            <div>
              <p className={styles.logoName}>SocialMeUp</p>
              <p className={styles.logoSub}>Academy LMS</p>
            </div>
          </div>
          <button type="button" className={styles.closeBtn} onClick={toggleSidebar} aria-label="Close sidebar">
            <IconX size={18} />
          </button>
        </div>

        <div className={styles.userCard}>
          <div className={styles.userRow}>
            <div className={styles.userAvatar}>{avatarInitials}</div>
            <div className={styles.userMeta}>
              <p className={styles.userName}>{currentUser.name}</p>
              <p className={styles.userEmail}>{currentUser.email}</p>
            </div>
          </div>
          <div className={styles.roleWrap}>
            <span className={styles.roleBadge}>Student</span>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Student">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className={styles.sectionLabel}>{group.label}</p>
              <ul className={styles.list}>
                {group.items.map((item) => {
                  const isActive = currentPage === item.id;
                  const ItemIcon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                        onClick={() => navigate(item.id)}
                      >
                        <span className={`${styles.navIcon} ${isActive ? styles.navIconActive : ''}`}>
                          <ItemIcon size={18} />
                        </span>
                        <span className={`${styles.navLabel} ${isActive ? styles.navLabelActive : ''}`}>
                          {item.label}
                        </span>
                        {item.badge ? (
                          <span className={styles.badge}>{item.badge}</span>
                        ) : isActive ? (
                          <span className={styles.activeDot} />
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className={styles.bottom}>
          <button type="button" className={styles.bottomBtn} onClick={() => navigate('student-profile')}>
            <IconSettings size={18} />
            <span>Profile & Settings</span>
          </button>
          <button type="button" className={styles.bottomBtn} onClick={logout}>
            <IconLogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
