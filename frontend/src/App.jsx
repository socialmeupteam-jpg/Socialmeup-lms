import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LmsProvider } from './context/LmsContext.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';

const StudentDashboard = lazy(() => import('./pages/student/StudentDashboard.jsx'));

function StudentDashboardRoute() {
  return (
    <LmsProvider>
      <Suspense fallback={null}>
        <StudentDashboard />
      </Suspense>
    </LmsProvider>
  );
}

export default function App() {
  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/lms/student/dashboard" element={<StudentDashboardRoute />} />
      </Routes>
    </div>
  );
}
