import React from 'react';
import type { Aplikasi } from '../types';
import * as Icons from './icons/Icons';

interface AppMenuCardProps {
  app: Aplikasi;
  onClick: () => void;
}

const colorClasses = {
  blue: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300',
  green: 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300',
  purple: 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300',
  yellow: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-300',
  red: 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300',
  indigo: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300',
};

export const AppMenuCard: React.FC<AppMenuCardProps> = ({ app, onClick }) => {
  const Icon = Icons[app.icon];
  const cardColor = colorClasses[app.color as keyof typeof colorClasses] || colorClasses.indigo;

  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-start text-left p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full"
    >
      <div className={`p-3 rounded-lg ${cardColor} mb-4`}>
        {Icon && <Icon className="w-7 h-7" />}
      </div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">{app.nama_aplikasi}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex-grow">{app.deskripsi}</p>
      <span className="mt-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline">
        Buka Menu &rarr;
      </span>
    </button>
  );
};
