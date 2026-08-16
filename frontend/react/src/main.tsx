import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { AllTestsPage } from './pages/MockTests/AllTestsPage';
import { CoursesPage } from './pages/Courses/CoursesPage';
import { PracticeHubPage } from './pages/Practice/PracticeHubPage';
import './index.css';

const AppRouter: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  if (currentPath.startsWith('/practice')) {
    return <PracticeHubPage />;
  }

  if (currentPath.startsWith('/courses') || currentPath.startsWith('/course')) {
    return <CoursesPage />;
  }

  if (currentPath.startsWith('/mock-test-session')) {
    return <AllTestsPage initialActiveSession={true} />;
  }

  if (currentPath.startsWith('/mock-tests') || currentPath.startsWith('/mock-test')) {
    return <AllTestsPage />;
  }

  return <DashboardPage />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
);
