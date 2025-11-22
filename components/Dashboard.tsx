import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Aplikasi } from '../types';
import { View } from '../types';
import { AppMenuCard } from './AppMenuCard';

interface DashboardProps {
  apps: Aplikasi[];
  setView: Dispatch<SetStateAction<View>>;
}

export const Dashboard: React.FC<DashboardProps> = ({ apps, setView }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Selamat Datang di Portal Akademik</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Pilih layanan yang ingin Anda akses.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {apps.map((app) => (
          <AppMenuCard
            key={app.nama_aplikasi}
            app={app}
            onClick={() => {
                if(app.url in View) {
                    setView(app.url as View);
                } else {
                    // Handle external or non-view links if necessary
                    alert(`Navigasi ke ${app.nama_aplikasi} belum diimplementasikan.`);
                }
            }}
          />
        ))}
      </div>
    </div>
  );
};