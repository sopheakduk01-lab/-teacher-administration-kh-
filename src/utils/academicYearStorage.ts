import {
  TeacherProfile,
  Student,
  AttendanceDatabase,
  GradeDatabase,
  LogbookEntry,
  InventoryItem,
  PLCMeeting,
  Quiz,
  LibraryBook,
} from '../types';
import {
  initialTeacherProfile,
  initialStudents,
  initialAttendance,
  initialGrades,
  initialLogbook,
  initialInventory,
  initialPLC,
  initialQuizzes,
  initialLibraryBooks,
} from '../data/initialData';

export interface AcademicYearDataBundle {
  year: string;
  teacher: TeacherProfile;
  students: Student[];
  attendance: AttendanceDatabase;
  grades: GradeDatabase;
  logbook: LogbookEntry[];
  inventory: InventoryItem[];
  plc: PLCMeeting[];
  quizzes: Quiz[];
  libraryBooks?: LibraryBook[];
  priFormData?: any;
  priLiveSyncActive?: boolean;
  lastModified?: number;
}

const STORAGE_ACTIVE_YEAR_KEY = 'teacher_active_academic_year';
const STORAGE_YEARS_LIST_KEY = 'teacher_academic_years_list';
const DEFAULT_YEAR = '២០២៥ - ២០២៦';

export function getActiveAcademicYear(): string {
  if (typeof window === 'undefined') return DEFAULT_YEAR;
  return localStorage.getItem(STORAGE_ACTIVE_YEAR_KEY) || DEFAULT_YEAR;
}

export function setActiveAcademicYear(year: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_ACTIVE_YEAR_KEY, year);
  const list = getAcademicYearsList();
  if (!list.includes(year)) {
    list.push(year);
    localStorage.setItem(STORAGE_YEARS_LIST_KEY, JSON.stringify(list));
  }
}

export interface CloneYearOptions {
  cloneTeacher: boolean;
  cloneStudents: boolean;
  cloneInventory: boolean;
  clonePLC: boolean;
  cloneQuizzes: boolean;
  cloneTimetable: boolean;
  cloneSyllabus: boolean;
}

export function saveAcademicYearsList(list: string[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_YEARS_LIST_KEY, JSON.stringify(list));
}

export function cloneYearData(sourceYear: string, targetYear: string, options: CloneYearOptions): void {
  if (typeof window === 'undefined') return;
  const sourceBundle = loadCompleteYearBundle(sourceYear);

  if (options.cloneTeacher) {
    saveYearScopedData(targetYear, 'teacher', { ...sourceBundle.teacher, academicYear: targetYear });
  }
  if (options.cloneStudents) {
    saveYearScopedData(targetYear, 'students', sourceBundle.students);
  }
  if (options.cloneInventory) {
    saveYearScopedData(targetYear, 'inventory', sourceBundle.inventory);
  }
  if (options.clonePLC) {
    saveYearScopedData(targetYear, 'plc', sourceBundle.plc);
  }
  if (options.cloneQuizzes) {
    saveYearScopedData(targetYear, 'quizzes', sourceBundle.quizzes);
  }
  if (options.cloneTimetable) {
    const timetable = loadYearScopedData(sourceYear, 'timetable', null);
    if (timetable) saveYearScopedData(targetYear, 'timetable', timetable);
  }
  if (options.cloneSyllabus) {
    const syllabus = loadYearScopedData(sourceYear, 'syllabus', null);
    if (syllabus) saveYearScopedData(targetYear, 'syllabus', syllabus);
  }
}

export function deleteYearData(year: string): void {
  if (typeof window === 'undefined') return;
  const keys = ['teacher', 'students', 'attendance', 'grades', 'logbook', 'inventory', 'plc', 'quizzes', 'library_books', 'timetable', 'syllabus'];
  for (const k of keys) {
    localStorage.removeItem(`year_${year}_${k}`);
  }
}

export function getAcademicYearsList(): string[] {
  if (typeof window === 'undefined') return [DEFAULT_YEAR];
  const raw = localStorage.getItem(STORAGE_YEARS_LIST_KEY);
  if (!raw) return [DEFAULT_YEAR, '២០២៤ - ២០២៥', '២០២៦ - ២០២៧'];
  try {
    return JSON.parse(raw);
  } catch {
    return [DEFAULT_YEAR];
  }
}

export function loadYearScopedData<T>(year: string, key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  const storageKey = `year_${year}_${key}`;
  const raw = localStorage.getItem(storageKey);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function saveYearScopedData<T>(year: string, key: string, data: T): void {
  if (typeof window === 'undefined') return;
  const storageKey = `year_${year}_${key}`;
  localStorage.setItem(storageKey, JSON.stringify(data));
}

export function loadCompleteYearBundle(year: string, currentTeacher?: TeacherProfile): AcademicYearDataBundle {
  const teacher = currentTeacher ? { ...currentTeacher, academicYear: year } : loadYearScopedData(year, 'teacher', initialTeacherProfile);
  const students = loadYearScopedData(year, 'students', initialStudents);
  const attendance = loadYearScopedData(year, 'attendance', initialAttendance);
  const grades = loadYearScopedData(year, 'grades', initialGrades);
  const logbook = loadYearScopedData(year, 'logbook', initialLogbook);
  const inventory = loadYearScopedData(year, 'inventory', initialInventory);
  const plc = loadYearScopedData(year, 'plc', initialPLC);
  const quizzes = loadYearScopedData(year, 'quizzes', initialQuizzes);
  const libraryBooks = loadYearScopedData(year, 'library_books', initialLibraryBooks);

  return {
    year,
    teacher: { ...teacher, academicYear: year },
    students,
    attendance,
    grades,
    logbook,
    inventory,
    plc,
    quizzes,
    libraryBooks,
  };
}

export function saveCompleteYearBundle(bundle: AcademicYearDataBundle): void {
  const year = bundle.year;
  if (!year) return;
  saveYearScopedData(year, 'teacher', bundle.teacher);
  saveYearScopedData(year, 'students', bundle.students);
  saveYearScopedData(year, 'attendance', bundle.attendance);
  saveYearScopedData(year, 'grades', bundle.grades);
  saveYearScopedData(year, 'logbook', bundle.logbook);
  saveYearScopedData(year, 'inventory', bundle.inventory);
  saveYearScopedData(year, 'plc', bundle.plc);
  saveYearScopedData(year, 'quizzes', bundle.quizzes);
  if (bundle.libraryBooks) {
    saveYearScopedData(year, 'library_books', bundle.libraryBooks);
  }
}

export function exportAllAcademicYearsBackup(): string {
  const years = getAcademicYearsList();
  const allBundles: Record<string, AcademicYearDataBundle> = {};
  for (const yr of years) {
    allBundles[yr] = loadCompleteYearBundle(yr);
  }
  const payload = {
    version: '2.0',
    exportDate: new Date().toISOString(),
    activeYear: getActiveAcademicYear(),
    years,
    data: allBundles,
  };
  return JSON.stringify(payload, null, 2);
}

export function importAcademicYearsBackup(jsonString: string): { success: boolean; message: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.data && typeof parsed.data === 'object') {
      const years = Object.keys(parsed.data);
      for (const yr of years) {
        saveCompleteYearBundle(parsed.data[yr]);
      }
      if (parsed.activeYear) {
        setActiveAcademicYear(parsed.activeYear);
      }
      return { success: true, message: `បានស្ដារឆ្នាំសិក្សា ${years.length} ដោយជោគជ័យ` };
    } else if (parsed.year) {
      saveCompleteYearBundle(parsed as AcademicYearDataBundle);
      setActiveAcademicYear(parsed.year);
      return { success: true, message: `បានស្ដារឆ្នាំ ${parsed.year} ដោយជោគជ័យ` };
    }
    return { success: false, message: 'ទម្រង់ឯកសារ Backup មិនត្រឹមត្រូវទេ' };
  } catch (err: any) {
    return { success: false, message: err.message || 'កំហុសក្នុងការអានឯកសារ' };
  }
}

export async function shareOrDownloadBackupFile(teacherName?: string, onShowToast?: (msg: string) => void): Promise<void> {
  const json = exportAllAcademicYearsBackup();
  const filename = `backup_teacher_${(teacherName || 'admin').replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.json`;
  const blob = new Blob([json], { type: 'application/json' });

  if (typeof navigator !== 'undefined' && (navigator as any).canShare && (navigator as any).canShare({ files: [new File([blob], filename, { type: 'application/json' })] })) {
    try {
      const file = new File([blob], filename, { type: 'application/json' });
      await navigator.share({
        title: 'ទិន្នន័យបម្រុងគ្រូបឋមសិក្សា',
        text: 'ឯកសារបម្រុងទិន្នន័យ (Backup)',
        files: [file],
      });
      onShowToast?.('បានចែករំលែកឯកសារ Backup ជោគជ័យ!');
      return;
    } catch {
      // Fallback to direct download
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  onShowToast?.('បានទាញយកឯកសារ Backup រួចរាល់!');
}

export async function copyBackupToClipboard(onShowToast?: (msg: string) => void): Promise<void> {
  const json = exportAllAcademicYearsBackup();
  try {
    await navigator.clipboard.writeText(json);
    onShowToast?.('បានចម្លងកូដ Backup ទៅ Clipboard រួចរាល់! 📋');
  } catch {
    onShowToast?.('មិនអាចចម្លងទៅ Clipboard បានទេ');
  }
}
