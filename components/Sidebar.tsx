
import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { View } from '../types';
import { HomeIcon, SearchIcon } from './icons/Icons';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  currentView: View;
  setView: Dispatch<SetStateAction<View>>;
}

const navItems = [
  { view: View.Dashboard, icon: HomeIcon, label: 'Beranda' },
  { view: View.JadwalDosen, icon: SearchIcon, label: 'Pencarian Jadwal' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, currentView, setView }) => {

  const handleNavClick = (view: View) => {
    setView(view);
    if (window.innerWidth < 1024) { // Close sidebar on mobile after click
        setIsOpen(false);
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      ></div>
      <aside
        className={`fixed lg:relative z-40 flex flex-col w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <svg className="w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
          </svg>
          <span className="ml-2 text-lg font-bold">Portal Akademik</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => handleNavClick(item.view)}
              className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                currentView === item.view 
                ? 'bg-indigo-500 text-white shadow'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">© 2024 Universitas Gemini</p>
        </div>
      </aside>
    </>
  );
};
