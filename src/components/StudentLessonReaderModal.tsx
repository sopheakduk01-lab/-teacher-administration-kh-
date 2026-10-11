import React from 'react';
import { X, BookOpen, CheckCircle2, Play } from 'lucide-react';
import { SubjectLessonSummary } from '../data/studentPortalData';

interface StudentLessonReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject?: SubjectLessonSummary | null;
  onTakeQuiz?: (quizTitle: string) => void;
}

export const StudentLessonReaderModal: React.FC<StudentLessonReaderModalProps> = ({
  isOpen,
  onClose,
  subject,
  onTakeQuiz,
}) => {
  if (!isOpen || !subject) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="p-5 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">
              📖
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-200 uppercase">{subject.subject}</span>
              <h3 className="text-base font-black font-moul">{subject.title}</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <h4 className="font-bold text-xs text-slate-500 uppercase">ចំណុចគន្លឹះសំខាន់ៗ ៖</h4>
          <div className="space-y-2">
            {subject.keyPoints?.map((pt, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                  {pt}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2 bg-slate-50 dark:bg-slate-900">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200"
          >
            បិទ
          </button>
          {onTakeQuiz && (
            <button
              onClick={() => onTakeQuiz(subject.title)}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>ធ្វើតេស្តសាកល្បង</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
