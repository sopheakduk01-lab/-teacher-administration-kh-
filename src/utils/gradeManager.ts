import { GradeDatabase, StudentGrade, Student } from '../types';

export type GradePeriodKey =
  | 'm10'
  | 'm11'
  | 'm12'
  | 'm01'
  | 's1'
  | 's1_summary'
  | 'm02'
  | 'm03'
  | 'm04'
  | 'm05'
  | 'm06'
  | 's2'
  | 's2_summary'
  | 'annual_summary';

export type GradeSubject = 'khmer' | 'math' | 'science' | 'social' | 'writing' | 'reading';

export interface GradePeriodInfo {
  key: GradePeriodKey;
  label: string;
  semester: 1 | 2;
  shortLabel?: string;
}

export const GRADE_PERIODS: GradePeriodInfo[] = [
  { key: 'm10', label: 'ខែ តុលា', semester: 1 },
  { key: 'm11', label: 'ខែ វិច្ឆិកា', semester: 1 },
  { key: 'm12', label: 'ខែ ធ្នូ', semester: 1 },
  { key: 'm01', label: 'ខែ មករា', semester: 1 },
  { key: 's1', label: 'ប្រឡងឆមាសទី១', semester: 1 },
  { key: 's1_summary', label: 'សង្ខេបឆមាសទី១', semester: 1 },
  { key: 'm02', label: 'ខែ កុម្ភៈ', semester: 2 },
  { key: 'm03', label: 'ខែ មីនា', semester: 2 },
  { key: 'm04', label: 'ខែ មេសា', semester: 2 },
  { key: 'm05', label: 'ខែ ឧសភា', semester: 2 },
  { key: 'm06', label: 'ខែ មិថុនា', semester: 2 },
  { key: 's2', label: 'ប្រឡងឆមាសទី២', semester: 2 },
  { key: 's2_summary', label: 'សង្ខេបឆមាសទី២', semester: 2 },
  { key: 'annual_summary', label: 'សង្ខេបប្រចាំឆ្នាំ', semester: 2 },
];

export const SEMESTER_1_ENTRY_PERIODS: GradePeriodKey[] = ['m10', 'm11', 'm12', 'm01', 's1'];
export const SEMESTER_2_ENTRY_PERIODS: GradePeriodKey[] = ['m02', 'm03', 'm04', 'm05', 'm06', 's2'];
export const ALL_ENTRY_MONTHS: GradePeriodKey[] = [
  'm10', 'm11', 'm12', 'm01', 'm02', 'm03', 'm04', 'm05', 'm06'
];

export const defaultMultiPeriodGrades: GradeDatabase = {};

export interface PrimarySubSubject {
  id: string;
  name: string;
  maxScore: number;
  subject: string;
}

export function getAllPrimarySubSubjects(): PrimarySubSubject[] {
  return [
    { id: 'kh_dictation', name: 'សរសេរតាមអាន', maxScore: 10, subject: 'ភាសាខ្មែរ' },
    { id: 'kh_reading', name: 'អំណានយល់ន័យ', maxScore: 10, subject: 'ភាសាខ្មែរ' },
    { id: 'kh_grammar', name: 'វេយ្យាករណ៍', maxScore: 10, subject: 'ភាសាខ្មែរ' },
    { id: 'math_arithmetic', name: 'ប្រមាណវិធីលេខ', maxScore: 10, subject: 'គណិតវិទ្យា' },
    { id: 'math_word_problem', name: 'ចំណោទ', maxScore: 10, subject: 'គណិតវិទ្យា' },
    { id: 'sci_experiment', name: 'វិទ្យាសាស្ត្រអនុវត្ត', maxScore: 10, subject: 'វិទ្យាសាស្ត្រ' },
    { id: 'soc_geography', name: 'ភូមិវិទ្យា និងប្រវត្តិវិទ្យា', maxScore: 10, subject: 'សិក្សាសង្គម' },
  ];
}

export const PRIMARY_SUB_SUBJECTS = getAllPrimarySubSubjects();

export function getCustomSubSubjects(): PrimarySubSubject[] {
  if (typeof window === 'undefined') return [];
  try {
    const s = localStorage.getItem('custom_sub_subjects');
    return s ? JSON.parse(s) : [];
  } catch {
    return [];
  }
}

export function saveCustomSubSubjects(subs: PrimarySubSubject[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('custom_sub_subjects', JSON.stringify(subs));
}

export function getStudentGrade(
  grades: GradeDatabase,
  periodKey: string,
  studentId: number
): StudentGrade {
  const period = grades[periodKey] || {};
  return (period[studentId] || {}) as StudentGrade;
}

export function getGradeClassification(average: number): { mention: string; color: string } {
  if (average >= 45) return { mention: 'ល្អណាស់ (A)', color: 'text-emerald-700' };
  if (average >= 38) return { mention: 'ល្អ (B)', color: 'text-blue-700' };
  if (average >= 30) return { mention: 'ល្អបង្គួរ (C)', color: 'text-amber-700' };
  if (average >= 25) return { mention: 'មធ្យម (D)', color: 'text-purple-700' };
  return { mention: 'ខ្សោយ (E-F)', color: 'text-rose-700' };
}

export function calculateStudentGrade(grade: Partial<StudentGrade>): StudentGrade {
  const khmer = Number(grade.khmer || 0);
  const math = Number(grade.math || 0);
  const science = Number(grade.science || 0);
  const social = Number(grade.social || 0);
  const writing = Number(grade.writing || 0);
  const reading = Number(grade.reading || 0);

  const total = khmer + math + science + social + writing + reading;
  const subjectsCount = [khmer, math, science, social, writing, reading].filter((v) => v > 0).length || 1;
  const average = Number((total / subjectsCount).toFixed(2));

  let mention = 'មធ្យម';
  if (average >= 45) mention = 'ល្អណាស់';
  else if (average >= 38) mention = 'ល្អ';
  else if (average >= 30) mention = 'ល្អបង្គួរ';
  else if (average >= 25) mention = 'មធ្យម';
  else mention = 'ខ្សោយ';

  return {
    ...grade,
    khmer,
    math,
    science,
    social,
    writing,
    reading,
    total,
    average,
    mention,
  };
}

export function calculateSinglePeriodSummary(
  students: Student[],
  grades: GradeDatabase,
  periodKey: string
) {
  const period = grades[periodKey] || {};
  let totalScore = 0;
  let count = 0;
  students.forEach((s) => {
    const g = period[s.id];
    if (g && g.total) {
      totalScore += g.total;
      count++;
    }
  });
  return {
    average: count > 0 ? Number((totalScore / count).toFixed(2)) : 0,
    studentsCount: count,
  };
}

export function calculateSemesterSummary(
  students: Student[],
  grades: GradeDatabase,
  semester: 1 | 2
) {
  const periods = semester === 1 ? SEMESTER_1_ENTRY_PERIODS : SEMESTER_2_ENTRY_PERIODS;
  return calculateSinglePeriodSummary(students, grades, periods[0]);
}

export function calculateAnnualSummary(
  students: Student[],
  grades: GradeDatabase
) {
  return calculateSinglePeriodSummary(students, grades, 'm10');
}

export function updateStudentGradeRecord(
  prevGrades: GradeDatabase,
  periodKey: string,
  studentId: number,
  subject: string,
  value: number
): GradeDatabase {
  const currentPeriod = (prevGrades[periodKey] || {}) as Record<number, StudentGrade>;
  const currentStudentGrade = currentPeriod[studentId] || {};

  const updatedSubjectGrade = {
    ...currentStudentGrade,
    [subject]: value,
  };

  const recalculated = calculateStudentGrade(updatedSubjectGrade);

  return {
    ...prevGrades,
    [periodKey]: {
      ...currentPeriod,
      [studentId]: recalculated,
    },
  };
}

export function exportGradesToCsv(
  arg1: any,
  arg2?: any,
  arg3?: any,
  headers?: any[],
  rows?: any[][]
): void {
  let csvContent = '';
  let filename = 'grades_export.csv';

  if (Array.isArray(headers) && Array.isArray(rows)) {
    filename = `${arg1 || 'grades'}.csv`;
    const allRows = [headers, ...rows];
    csvContent = '\uFEFF' + allRows.map((e) => e.map((cell) => `"${cell ?? ''}"`).join(',')).join('\n');
  } else {
    const students = Array.isArray(arg1) ? arg1 : [];
    const grades = (arg2 || {}) as GradeDatabase;
    const periodKey = typeof arg3 === 'string' ? arg3 : 'm10';
    filename = `grades_${periodKey}_${new Date().toISOString().slice(0, 10)}.csv`;

    const period = (grades[periodKey] || {}) as Record<number, StudentGrade>;
    const defaultRows = [
      ['ល.រ', 'អត្តលេខ', 'គោត្តនាម និងនាម', 'ភេទ', 'ភាសាខ្មែរ', 'គណិតវិទ្យា', 'វិទ្យាសាស្ត្រ', 'សិក្សាសង្គម', 'សរុប', 'មធ្យមភាគ', 'និទ្ទេស', 'ចំណាត់ថ្នាក់'],
    ];

    students.forEach((s, idx) => {
      const g = period[s.id] || {};
      defaultRows.push([
        String(idx + 1),
        String(s.rollNo || s.id),
        s.name || '',
        s.gender === 'female' || s.gender === 'ស្រី' ? 'ស្រី' : 'ប្រុស',
        String(g.khmer ?? ''),
        String(g.math ?? ''),
        String(g.science ?? ''),
        String(g.social ?? ''),
        String(g.total ?? ''),
        String(g.average ?? ''),
        g.mention || '',
        String(g.rank ?? ''),
      ]);
    });
    csvContent = '\uFEFF' + defaultRows.map((e) => e.map((cell) => `"${cell}"`).join(',')).join('\n');
  }

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const exportPeriodGradesToCsv = exportGradesToCsv;
