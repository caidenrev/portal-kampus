
export interface JadwalKuliah {
  courseName: string;
  lecturer: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';
  time: string; // e.g., "08:50 - 10:30"
  room: string;
  class: string;
  prodi: string;
  fakultas: string;
  semester: number;
}

export interface Aplikasi {
  nama_aplikasi: string;
  deskripsi: string;
  url: string; // This will map to a View enum key
  icon: 'CalendarIcon' | 'BookOpenIcon' | 'UserCircleIcon' | 'DocumentTextIcon' | 'CreditCardIcon';
  color: string; // e.g., 'blue', 'green'
}

export enum View {
    Dashboard = 'Dashboard',
    JadwalDosen = 'Pencarian Jadwal Dosen & Kelas',
}

// FIX: Add missing type definitions to resolve compilation errors.
export interface ScheduleItem {
  courseName: string;
  lecturer: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';
  startTime: string;
  endTime: string;
  room: string;
  courseCode: string;
}

export interface Course {
  code: string;
  name: string;
  credits: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
}

export interface Semester {
  semester: number;
  year: string;
  gpa: number;
  courses: Course[];
}

export interface StudentDetails {
  photoUrl: string;
  name: string;
  studentId: string;
  major: string;
  faculty: string;
  year: string;
  advisor: string;
}