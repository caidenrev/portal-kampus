
import React from 'react';
import type { StudentDetails } from '../types';

interface ProfileProps {
  student: StudentDetails;
}

const ProfileField: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{value}</dd>
  </div>
);

export const Profile: React.FC<ProfileProps> = ({ student }) => {
  return (
    <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Profil Mahasiswa</h1>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0">
                    <img
                        className="h-32 w-32 rounded-full object-cover ring-4 ring-indigo-300 dark:ring-indigo-600"
                        src={student.photoUrl}
                        alt="Foto Profil"
                    />
                </div>
                <div className="flex-grow w-full">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{student.name}</h2>
                    <p className="text-md text-indigo-600 dark:text-indigo-400">{student.studentId}</p>

                    <div className="mt-6 border-t border-gray-200 dark:border-gray-700">
                        <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                            <ProfileField label="Program Studi" value={student.major} />
                            <ProfileField label="Fakultas" value={student.faculty} />
                            <ProfileField label="Angkatan" value={student.year} />
                            <ProfileField label="Dosen Pembimbing Akademik" value={student.advisor} />
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
