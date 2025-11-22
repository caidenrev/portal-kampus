
import React from 'react';
import type { ScheduleItem } from '../types';

interface ScheduleProps {
  schedule: ScheduleItem[];
}

const daysOfWeek: ScheduleItem['day'][] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

export const Schedule: React.FC<ScheduleProps> = ({ schedule }) => {

  const scheduleByDay = daysOfWeek.map(day => ({
    day,
    classes: schedule
      .filter(item => item.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime)),
  }));

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Jadwal Kuliah</h1>
      <div className="space-y-6">
        {scheduleByDay.map(({ day, classes }) => (
          <div key={day} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400 border-b pb-2 border-gray-200 dark:border-gray-700">{day}</h2>
            {classes.length > 0 ? (
              <ul className="space-y-4">
                {classes.map((item, index) => (
                  <li key={index} className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <div className="flex-shrink-0 w-32 font-semibold">
                      <span>{item.startTime} - {item.endTime}</span>
                    </div>
                    <div className="flex-grow">
                      <p className="font-bold text-gray-800 dark:text-white">{item.courseName}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.courseCode}</p>
                    </div>
                    <div className="flex-grow text-sm text-gray-600 dark:text-gray-300">
                      <p><strong>Dosen:</strong> {item.lecturer}</p>
                      <p><strong>Ruang:</strong> {item.room}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Tidak ada jadwal.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
