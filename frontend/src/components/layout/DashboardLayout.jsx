import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.mainCol}>
        <Header />
        <main className={styles.main}>
          <div className={styles.inner}>{children}</div>
        </main>
      </div>
    </div>
  );
}

export function SectionCard({ title, subtitle, action, children }) {
  return (
    <section className={styles.card}>
      {title || action ? (
        <div className={styles.cardHead}>
          <div>
            {title ? <h3 className={styles.cardTitle}>{title}</h3> : null}
            {subtitle ? <p className={styles.cardSubtitle}>{subtitle}</p> : null}
          </div>
          {action ? <div className={styles.cardAction}>{action}</div> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
