export type AttendanceStatus = 'present' | 'absent' | 'permission';

export type AttendanceDatabase = Record<string, Record<number, AttendanceStatus>>;

export interface StudentGrade {
  khmer?: number;
  math?: number;
  science?: number;
  social?: number;
  writing?: number;
  reading?: number;
  total?: number;
  average?: number;
  rank?: number;
  mention?: string;
  [key: string]: any;
}

export type GradeDatabase = Record<string | number, Record<number, StudentGrade> | StudentGrade | any>;

export interface Student {
  id: number;
  rollNo?: number;
  name?: string;
  latinName?: string;
  civilId?: string;
  gender?: 'ស្រី' | 'ប្រុស';
  dob?: string;
  address?: string;
  parentPhone?: string;
  plpAccount?: string;
  pin?: string;
  avatar?: string;
  [key: string]: any;
}

export interface TeacherProfile {
  name: string;
  school: string;
  grade: string;
  phone: string;
  email: string;
  degree: string;
  avatar: string;
  academicYear: string;
  adminPin: string;
  [key: string]: any;
}

export interface LogbookEntry {
  id: number;
  date?: string;
  time?: string;
  subject?: string;
  topic?: string;
  presentCount?: string;
  note?: string;
  [key: string]: any;
}

export interface InventoryItem {
  id: number;
  name?: string;
  qty?: number;
  condition?: string;
  category?: string;
  [key: string]: any;
}

export interface PLCMeeting {
  id: number;
  date?: string;
  topic?: string;
  attendees?: string;
  issues?: string;
  decision?: string;
  [key: string]: any;
}

export type QuestionType =
  | 'qcm'
  | 'true_false'
  | 'fill_in_the_blank'
  | 'matching'
  | 'short_answer'
  | 'pisa'
  | 'passage'
  | string;

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  color?: string;
  shape?: string;
  [key: string]: any;
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
  [key: string]: any;
}

export interface PisaQuestionPart {
  id: string;
  question?: string;
  prompt?: string;
  points?: number;
  answer?: string;
  explanation?: string;
  [key: string]: any;
}

export interface PassageQuestionItem {
  id: string;
  question: string;
  options?: QuizOption[];
  explanation?: string;
  points?: number;
  [key: string]: any;
}

export interface QuizQuestion {
  id: string | number;
  type?: QuestionType;
  question?: string;
  text?: string;
  timeLimit?: number;
  points?: number;
  options?: QuizOption[];
  explanation?: string;
  imageUrl?: string;
  matchingPairs?: MatchingPair[];
  pisaParts?: PisaQuestionPart[];
  passageItems?: PassageQuestionItem[];
  [key: string]: any;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  grade?: string;
  questionCount?: number;
  isPublic?: boolean;
  imageUrl?: string;
  questions?: QuizQuestion[];
  [key: string]: any;
}

export interface LibraryBook {
  id: string;
  title?: string;
  author?: string;
  category?: string;
  coverUrl?: string;
  description?: string;
  pagesCount?: number;
  fileType?: string;
  fileData?: string;
  uploadedDate?: string;
  [key: string]: any;
}

export interface BookBorrowingRecord {
  id: string;
  studentId?: number;
  studentName?: string;
  bookId?: string;
  bookTitle?: string;
  borrowDate?: string;
  dueDate?: string;
  returnDate?: string;
  status?: 'borrowing' | 'returned' | 'late' | string;
  notes?: string;
  [key: string]: any;
}

export interface StudentMonitoringEntry {
  id: string;
  studentId: number;
  studentName: string;
  gender?: string;
  date: string;
  category?: 'reading_writing' | 'math' | 'attendance' | 'behavior' | 'health_wellbeing' | 'learning_pace' | string;
  severity?: 'low' | 'medium' | 'high' | string;
  issue?: string;
  intervention?: string;
  observedIssue?: string;
  teacherIntervention?: string;
  progress?: string;
  progressNote?: string;
  parentFeedback?: string;
  status?: 'in_progress' | 'resolved' | 'escalated' | string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface SubjectScoreItem {
  id: string;
  name: string;
  score: number;
  maxScore?: number;
  [key: string]: any;
}

export interface StudentMonthlyResultRecord {
  studentId?: number;
  studentName?: string;
  totalScore?: number;
  averageScore?: number;
  rank?: number;
  [key: string]: any;
}
