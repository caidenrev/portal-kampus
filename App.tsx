
import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { JadwalDosen } from './components/JadwalDosen';
import { Dashboard } from './components/Dashboard';
import { Spinner } from './components/Spinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { generateScheduleData, generateAppData } from './services/geminiService';
import type { JadwalKuliah, Aplikasi } from './types';
import { View } from './types';

export default function App() {
  const [view, setView] = useState<View>(View.Dashboard);
  const [scheduleData, setScheduleData] = useState<JadwalKuliah[] | null>(null);
  const [appData, setAppData] = useState<Aplikasi[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch both datasets in parallel
      const [schedules, apps] = await Promise.all([
        generateScheduleData(),
        generateAppData(),
      ]);
      setScheduleData(schedules);
      setAppData(apps);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : 'An unknown error occurred. Check the console for details and ensure your API key is configured correctly.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const renderContent = () => {
    if (isLoading) return <Spinner />;
    if (error) return <ErrorDisplay message={error} onRetry={fetchData} />;

    switch (view) {
      case View.Dashboard:
        return appData && <Dashboard apps={appData} setView={setView} />;
      case View.JadwalDosen:
        return scheduleData && <JadwalDosen schedule={scheduleData} />;
      default:
        return <p>View not found</p>;
    }
  };

  const getHeaderTitle = () => {
    switch (view) {
        case View.Dashboard:
            return 'Beranda';
        case View.JadwalDosen:
            return 'Pencarian Jadwal Dosen & Kelas';
        default:
            return 'Portal Akademik';
    }
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        currentView={view}
        setView={setView}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle sidebar"
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">{getHeaderTitle()}</h1>
          <div className="w-8"></div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
