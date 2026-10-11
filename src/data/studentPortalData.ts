export interface StudentSubjectExam {
  id: string;
  title: string;
  subject: string;
  durationMinutes: number;
  totalQuestions: number;
  badge?: string;
  badgeColor?: string;
  description?: string;
  categoryLabel?: string;
  subjectIcon?: string;
  subjectName?: string;
  totalPoints?: number;
  grade?: string;
  category?: any;
  questions?: any[];
  [key: string]: any;
}

export interface HomeworkTask {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  description: string;
  status: 'pending' | 'submitted' | 'graded';
  subjectIcon?: string;
  points?: number;
  [key: string]: any;
}

export interface FormulaItem {
  id: string;
  subject: string;
  title: string;
  formula: string;
  explanation: string;
  topic?: string;
  example?: string;
  [key: string]: any;
}

export interface SubjectLessonSummary {
  id: string;
  subject: string;
  title: string;
  keyPoints: string[];
  badgeLabel?: string;
  icon?: string;
  description?: string;
  lessonsCount?: number;
  qcmCount?: number;
  [key: string]: any;
}

export interface StudentGameItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
  type: string;
  [key: string]: any;
}

export const BUILTIN_STUDENT_EXAMS: StudentSubjectExam[] = [
  {
    id: 'exam-khmer-qcm',
    title: 'វិញ្ញាសាភាសាខ្មែរ ៤០សំណួរ',
    subject: 'ភាសាខ្មែរ',
    subjectName: 'ភាសាខ្មែរ',
    subjectIcon: '📖',
    grade: 'ថ្នាក់ទី ៦',
    durationMinutes: 45,
    totalQuestions: 40,
    totalPoints: 100,
    badge: 'ប្រឡងផ្លូវការ',
    badgeColor: 'bg-blue-600',
    categoryLabel: 'ប្រឡងប្រចាំខែ',
    description: 'វិញ្ញាសាត្រៀមប្រឡងបញ្ចប់ភូមិសិក្សា ភាសាខ្មែរ ៤០ សំណួរពហុជ្រើសរើស',
  },
  {
    id: 'exam-health-qcm',
    title: 'វិញ្ញាសាអប់រំសុខភាព ៤០សំណួរ',
    subject: 'អប់រំសុខភាព',
    subjectName: 'អប់រំសុខភាព',
    subjectIcon: '🏥',
    grade: 'ថ្នាក់ទី ៦',
    durationMinutes: 40,
    totalQuestions: 40,
    totalPoints: 100,
    badge: 'ប្រឡងផ្លូវការ',
    badgeColor: 'bg-emerald-600',
    categoryLabel: 'ប្រឡងប្រចាំខែ',
    description: 'វិញ្ញាសាអប់រំសុខភាព ថ្នាក់ទី៦ ចំនួន ៤០ សំណួរ',
  },
  {
    id: 'exam-math-lesson1',
    title: 'វិញ្ញាសាគណិតវិទ្យា មេរៀនទី១',
    subject: 'គណិតវិទ្យា',
    subjectName: 'គណិតវិទ្យា',
    subjectIcon: '📐',
    grade: 'ថ្នាក់ទី ៦',
    durationMinutes: 30,
    totalQuestions: 20,
    totalPoints: 50,
    badge: 'ប្រឡងប្រចាំខែ',
    badgeColor: 'bg-purple-600',
    categoryLabel: 'អនុវត្តមេរៀន',
    description: 'វិញ្ញាសាអនុវត្តគណិតវិទ្យា មេរៀនទី១ ចំនួនដល់ ១ ០០០ ០០០',
  },
];

export const BUILTIN_HOMEWORK_TASKS: HomeworkTask[] = [
  {
    id: 'hw-1',
    title: 'សរសេរតែងសេចក្ដីពណ៌នាអំពីសាលារៀនខ្ញុំ',
    subject: 'ភាសាខ្មែរ',
    subjectIcon: '📖',
    points: 10,
    dueDate: '2025-10-15',
    description: 'សរសេរតែងសេចក្ដីយ៉ាងតិច ១៥ បន្ទាត់ ដោយរៀបរាប់ពីទិដ្ឋភាពសាលារៀន',
    status: 'pending',
  },
  {
    id: 'hw-2',
    title: 'ដោះស្រាយលំហាត់ប្រភាគទំព័រ ២៥',
    subject: 'គណិតវិទ្យា',
    subjectIcon: '📐',
    points: 10,
    dueDate: '2025-10-14',
    description: 'ធ្វើលំហាត់លេខ ១ ដល់លេខ ៥ ក្នុងសៀវភៅពុម្ពគណិតវិទ្យា',
    status: 'pending',
  },
];

export const GRADE_6_FORMULAS: FormulaItem[] = [
  {
    id: 'f-1',
    subject: 'គណិតវិទ្យា',
    topic: 'ធរណីមាត្រ',
    title: 'ផ្ទៃក្រឡាចតុកោណកែង',
    formula: 'S = a × b',
    explanation: 'ផ្ទៃក្រឡា = បណ្ដោយ គុណ ទទឹង',
    example: 'បណ្ដោយ 5m, ទទឹង 3m => S = 5 × 3 = 15m²',
  },
  {
    id: 'f-2',
    subject: 'គណិតវិទ្យា',
    topic: 'ធរណីមាត្រ',
    title: 'បរិមាត្រចតុកោណកែង',
    formula: 'P = (a + b) × 2',
    explanation: 'បរិមាត្រ = (បណ្ដោយ + ទទឹង) គុណ ២',
    example: 'P = (5 + 3) × 2 = 16m',
  },
  {
    id: 'f-3',
    subject: 'គណិតវិទ្យា',
    topic: 'ធរណីមាត្រ',
    title: 'ផ្ទៃក្រឡាត្រីកោណ',
    formula: 'S = (b × h) ÷ 2',
    explanation: 'ផ្ទៃក្រឡា = (បាត គុណ កម្ពស់) ចែក ២',
    example: 'បាត 6m, កម្ពស់ 4m => S = (6 × 4) ÷ 2 = 12m²',
  },
];

export const GRADE_6_SUBJECT_SUMMARIES: SubjectLessonSummary[] = [
  {
    id: 'sum-1',
    subject: 'ភាសាខ្មែរ',
    title: 'វេយ្យាករណ៍៖ កិរិយាសព្ទ និងគុណនាម',
    icon: '📖',
    badgeLabel: 'ភាសាខ្មែរ',
    description: 'ស្វែងយល់ពីកិរិយាសព្ទ និងគុណនាមក្នុងប្រយោគភាសាខ្មែរ',
    lessonsCount: 15,
    qcmCount: 40,
    keyPoints: [
      'កិរិយាសព្ទ បង្ហាញពីសកម្មភាព ឬអំពើរបស់នាម',
      'គុណនាម បង្ហាញពីលក្ខណៈ ឬគុណភាពរបស់នាម',
    ],
  },
  {
    id: 'sum-2',
    subject: 'វិទ្យាសាស្ត្រ',
    title: 'ប្រព័ន្ធដកដង្ហើមរបស់មនុស្ស',
    icon: '🔬',
    badgeLabel: 'វិទ្យាសាស្ត្រ',
    description: 'រៀនអំពីសរីរាង្គផ្លូវដង្ហើម និងការថែទាំសួត',
    lessonsCount: 12,
    qcmCount: 30,
    keyPoints: [
      'សរីរាង្គដកដង្ហើមរួមមាន៖ ច្រមុះ បំពង់ខ្យល់ និងសួត',
      'ស្រូបយកឧស្ម័នអុកស៊ីសែន និងបញ្ចេញឧស្ម័នកាបូនិច',
    ],
  },
];

export const BUILTIN_STUDENT_GAMES: StudentGameItem[] = [
  {
    id: 'game-fishing',
    title: 'ហ្គេមស្ទូចត្រីឆ្លើយសំណួរ',
    description: 'ហ្គេមស្ទូចត្រីសប្បាយៗ ជាមួយលំហាត់គណិតវិទ្យា និងភាសាខ្មែរ',
    icon: '🎣',
    badge: 'ហ្គេមអប់រំ',
    type: 'fishing',
  },
  {
    id: 'game-english',
    title: 'ហ្គេមពាក្យអង់គ្លេស Flashcards',
    description: 'ហ្វឹកហាត់ពាក្យគន្លឹះភាសាអង់គ្លេស ថ្នាក់ទី៦',
    icon: '🔤',
    badge: 'ភាសាអង់គ្លេស',
    type: 'english',
  },
];
