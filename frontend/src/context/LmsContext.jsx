import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NOTIFICATIONS, STUDENT_USER } from '../data/studentDashboard.js';
import { clearSession } from '../services/authService.js';

const LmsContext = createContext(null);

export function LmsProvider({ children }) {
  const routerNavigate = useNavigate();
  const [currentUser] = useState(STUDENT_USER);
  const [currentPage] = useState('student-dashboard');
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const unreadCount = notifications.filter((item) => !item.read).length;

  const logout = useCallback(() => {
    clearSession();
    routerNavigate('/login');
  }, [routerNavigate]);

  const navigate = useCallback(
    (page) => {
      if (page === 'login') {
        logout();
        return;
      }
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    },
    [logout],
  );

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      currentPage,
      notifications,
      unreadCount,
      sidebarOpen,
      logout,
      navigate,
      markNotificationRead,
      markAllRead,
      toggleSidebar,
    }),
    [
      currentUser,
      currentPage,
      notifications,
      unreadCount,
      sidebarOpen,
      logout,
      navigate,
      markNotificationRead,
      markAllRead,
      toggleSidebar,
    ],
  );

  return <LmsContext.Provider value={value}>{children}</LmsContext.Provider>;
}

export function useLms() {
  const context = useContext(LmsContext);
  if (!context) {
    throw new Error('useLms must be used within LmsProvider');
  }
  return context;
}
