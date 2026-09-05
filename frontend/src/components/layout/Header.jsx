import { useState } from 'react';
import { LMS_NOW } from '../../data/studentDashboard.js';
import { useLms } from '../../context/LmsContext.jsx';
import { IconBell, IconMenu, IconSearch, IconX } from '../Icons.jsx';
import styles from './Header.module.css';

const TYPE_ICON = {
  success: '✓',
  error: '!',
  warning: '⚠',
  info: 'ℹ',
  announcement: '📢',
  grade: '📝',
  payment: '₹',
};

export default function Header() {
  const {
    currentUser,
    notifications,
    unreadCount,
    markAllRead,
    markNotificationRead,
    toggleSidebar,
  } = useLms();
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const firstName = currentUser.name.split(' ')[0];
  const hour = LMS_NOW.getHours();
  const timeGreet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const headerDate = LMS_NOW.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const initials = currentUser.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className={styles.header}>
      <button type="button" className={styles.iconBtn} onClick={toggleSidebar} aria-label="Toggle sidebar">
        <IconMenu size={20} />
      </button>

      <div className={styles.titleBlock}>
        <p className={styles.greeting}>
          {timeGreet}, <span className={styles.greetingName}>{firstName}</span> — Keep up the great work
        </p>
        <h1 className={styles.title}>Dashboard</h1>
      </div>

      <p className={styles.date}>{headerDate}</p>

      {searchOpen ? (
        <div className={styles.searchOpen}>
          <div className={styles.searchField}>
            <span className={styles.searchGlyph}>
              <IconSearch size={16} />
            </span>
            <input autoFocus placeholder="Search…" className={styles.searchInput} aria-label="Search" />
          </div>
          <button type="button" className={styles.closeSearch} onClick={() => setSearchOpen(false)} aria-label="Close search">
            <IconX size={18} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className={`${styles.iconBtn} ${styles.searchToggle}`}
          onClick={() => setSearchOpen(true)}
          aria-label="Open search"
        >
          <IconSearch size={18} />
        </button>
      )}

      <div className={styles.notifWrap}>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={() => setNotifOpen((open) => !open)}
          aria-label="Notifications"
        >
          <IconBell size={18} />
          {unreadCount > 0 ? (
            <span className={styles.notifCount}>{unreadCount > 9 ? '9+' : unreadCount}</span>
          ) : null}
        </button>

        {notifOpen ? (
          <>
            <button type="button" className={styles.notifBackdrop} aria-label="Close notifications" onClick={() => setNotifOpen(false)} />
            <div className={styles.notifPanel} role="dialog" aria-label="Notifications">
              <div className={styles.notifHead}>
                <h3 className={styles.notifTitle}>Notifications</h3>
                {unreadCount > 0 ? (
                  <button type="button" className={styles.markRead} onClick={markAllRead}>
                    Mark all read
                  </button>
                ) : null}
              </div>
              <div className={styles.notifList}>
                {notifications.length === 0 ? (
                  <div className={styles.notifEmpty}>No notifications</div>
                ) : (
                  notifications.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`${styles.notifItem} ${!item.read ? styles.notifUnread : ''}`}
                      onClick={() => markNotificationRead(item.id)}
                    >
                      <span className={styles.notifIcon}>{TYPE_ICON[item.type] ?? 'ℹ'}</span>
                      <div className={styles.notifBody}>
                        <p className={`${styles.notifItemTitle} ${!item.read ? styles.notifItemTitleUnread : ''}`}>
                          {item.title}
                        </p>
                        <p className={styles.notifMessage}>{item.message.slice(0, 60)}…</p>
                        <p className={styles.notifDate}>
                          {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </p>
                      </div>
                      {!item.read ? <span className={styles.unreadDot} /> : null}
                    </button>
                  ))
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div className={styles.avatar} title={currentUser.name}>
        {initials}
      </div>
    </header>
  );
}
