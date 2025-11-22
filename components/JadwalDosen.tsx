import React, { useState, useMemo, useEffect } from 'react';
import type { JadwalKuliah } from '../types';
import { SearchIcon } from './icons/Icons';
import * as Icons from './icons/Icons';


interface JadwalDosenProps {
  schedule: JadwalKuliah[];
}

const daysOfWeek: JadwalKuliah['day'][] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

const dayColors: { [key in JadwalKuliah['day']]: string } = {
    Senin: 'border-blue-500',
    Selasa: 'border-green-500',
    Rabu: 'border-yellow-500',
    Kamis: 'border-purple-500',
    Jumat: 'border-red-500',
};

const selectStyles = "w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 py-2 px-3";

export const JadwalDosen: React.FC<JadwalDosenProps> = ({ schedule }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dayFilter, setDayFilter] = useState<JadwalKuliah['day'] | 'Semua'>('Semua');
  const [fakultasFilter, setFakultasFilter] = useState<string>('Semua');
  const [prodiFilter, setProdiFilter] = useState<string>('Semua');
  const [semesterFilter, setSemesterFilter] = useState<string>('Semua');

  const fakultasOptions = useMemo(() => [...new Set(schedule.map(item => item.fakultas))], [schedule]);
  
  const prodiOptions = useMemo(() => {
    if (fakultasFilter === 'Semua') {
      return [...new Set(schedule.map(item => item.prodi))];
    }
    return [...new Set(schedule.filter(item => item.fakultas === fakultasFilter).map(item => item.prodi))];
  }, [schedule, fakultasFilter]);

  // Reset prodi filter when fakultas filter changes
  useEffect(() => {
    setProdiFilter('Semua');
  }, [fakultasFilter]);

  const filteredSchedule = useMemo(() => {
    return schedule.filter(item => {
      const matchesDay = dayFilter === 'Semua' || item.day === dayFilter;
      const matchesSearch = 
        item.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.lecturer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFakultas = fakultasFilter === 'Semua' || item.fakultas === fakultasFilter;
      const matchesProdi = prodiFilter === 'Semua' || item.prodi === prodiFilter;
      const matchesSemester = semesterFilter === 'Semua' || item.semester.toString() === semesterFilter;
      return matchesDay && matchesSearch && matchesFakultas && matchesProdi && matchesSemester;
    }).sort((a, b) => {
        const dayA = daysOfWeek.indexOf(a.day);
        const dayB = daysOfWeek.indexOf(b.day);
        if (dayA !== dayB) return dayA - dayB;
        return a.time.localeCompare(b.time);
    });
  }, [schedule, searchQuery, dayFilter, fakultasFilter, prodiFilter, semesterFilter]);

  const filterHeaderText = useMemo(() => {
    const parts = [];
    if (fakultasFilter !== 'Semua') {
      parts.push(fakultasFilter);
    }
    if (prodiFilter !== 'Semua') {
      parts.push(prodiFilter);
    }
    return parts.join(' / ');
  }, [fakultasFilter, prodiFilter]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header for active filters */}
      {filterHeaderText && (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Menampilkan Jadwal untuk: <span className="font-bold text-indigo-600 dark:text-indigo-400">{filterHeaderText}</span>
            </h2>
        </div>
      )}

      {/* Search and Filter Controls */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
        <div className="relative">
            <input
              type="text"
              placeholder="Cari nama dosen atau mata kuliah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-400" />
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
           <div>
              <label htmlFor="fakultas-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fakultas</label>
              <select id="fakultas-filter" value={fakultasFilter} onChange={(e) => setFakultasFilter(e.target.value)} className={selectStyles}>
                  <option value="Semua">Semua Fakultas</option>
                  {fakultasOptions.map(fakultas => <option key={fakultas} value={fakultas}>{fakultas}</option>)}
              </select>
           </div>
           <div>
              <label htmlFor="prodi-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Program Studi</label>
              <select id="prodi-filter" value={prodiFilter} onChange={(e) => setProdiFilter(e.target.value)} className={selectStyles}>
                  <option value="Semua">Semua Prodi</option>
                  {prodiOptions.map(prodi => <option key={prodi} value={prodi}>{prodi}</option>)}
              </select>
           </div>
           <div>
              <label htmlFor="semester-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Semester</label>
              <select id="semester-filter" value={semesterFilter} onChange={(e) => setSemesterFilter(e.target.value)} className={selectStyles}>
                  <option value="Semua">Semua Semester</option>
                  {[...Array(8).keys()].map(i => (
                    <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
                  ))}
              </select>
           </div>
        </div>
         <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2">
            <button
                onClick={() => setDayFilter('Semua')}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    dayFilter === 'Semua' 
                    ? 'bg-indigo-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
            >
                Semua Hari
            </button>
            {daysOfWeek.map(day => (
                <button
                    key={day}
                    onClick={() => setDayFilter(day)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                        dayFilter === day 
                        ? 'bg-indigo-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                >
                    {day}
                </button>
            ))}
         </div>
      </div>

      {/* Results */}
      <div>
        {filteredSchedule.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchedule.map((item, index) => (
              <div 
                key={index} 
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border-l-4 ${dayColors[item.day]} overflow-hidden`}>
                <div className="p-5">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white leading-tight">{item.courseName}</h3>
                        <span className="text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 px-2.5 py-1 rounded-full">{item.day}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.class} &middot; {item.prodi} &middot; Sem. {item.semester}</p>
                    <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <div className="flex items-center">
                            <Icons.UserCircleIcon className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{item.lecturer}</span>
                        </div>
                        <div className="flex items-center">
                            <Icons.ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{item.time}</span>
                        </div>
                        <div className="flex items-center">
                            <Icons.LocationMarkerIcon className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{item.room}</span>
                        </div>
                    </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <SearchIcon className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600" />
            <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">Jadwal Tidak Ditemukan</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">Coba ubah kata kunci pencarian atau filter Anda.</p>
          </div>
        )}
      </div>
    </div>
  );
};