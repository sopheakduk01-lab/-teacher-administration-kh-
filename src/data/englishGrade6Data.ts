export interface EnglishVocabularyItem {
  word: string;
  phonetic?: string;
  partOfSpeech: string;
  meaningKh: string;
  exampleSentence: string;
  exampleTranslationKh: string;
  audioPrompt?: string;
}

export interface EnglishLessonUnit {
  id: number;
  unitNumber: number;
  chapterId: number;
  titleEn: string;
  titleKh: string;
  subtitleKh: string;
  grammarFocusEn: string;
  grammarFocusKh: string;
  dialogueEn: { speaker: string; text: string; translationKh: string }[];
  vocabulary: EnglishVocabularyItem[];
  practiceQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanationKh: string;
  }[];
  writing?: {
    instructionKh?: string;
    tasks: { prompt: string; answer: string }[];
  };
  remember?: {
    vocabList: string[];
    grammarSummary: string;
  };
}

export interface EnglishChapter {
  id: number;
  titleEn: string;
  titleKh: string;
  unitsCount: number;
  colorTheme: string;
}

export const ENGLISH_GRADE_6_CHAPTERS: EnglishChapter[] = [
  { id: 1, titleEn: 'Chapter 1: Back to School & Friends', titleKh: 'ជំពូកទី១ ៖ ត្រឡប់មកសាលា និងមិត្តភក្តិ', unitsCount: 3, colorTheme: 'indigo' },
  { id: 2, titleEn: 'Chapter 2: Daily Routines & Hobbies', titleKh: 'ជំពូកទី២ ៖ ទម្លាប់ប្រចាំថ្ងៃ និងចំណង់ចំណូលចិត្ត', unitsCount: 3, colorTheme: 'emerald' },
  { id: 3, titleEn: 'Chapter 3: Food, Health & Nutrition', titleKh: 'ជំពូកទី៣ ៖ អាហារ សុខភាព និងអាហារូបត្ថម្ភ', unitsCount: 3, colorTheme: 'amber' },
  { id: 4, titleEn: 'Chapter 4: Nature, Weather & Seasons', titleKh: 'ជំពូកទី៤ ៖ ធម្មជាតិ អាកាសធាតុ និងរដូវកាល', unitsCount: 3, colorTheme: 'sky' },
];

export const ENGLISH_GRADE_6_UNITS: EnglishLessonUnit[] = [
  {
    id: 1,
    unitNumber: 1,
    chapterId: 1,
    titleEn: 'Unit 1: Meeting New Classmates',
    titleKh: 'មេរៀនទី១ ៖ ជួបមិត្តរួមថ្នាក់ថ្មី',
    subtitleKh: 'ការស្វាគមន៍ និងការណែនាំខ្លួនឯងជាភាសាអង់គ្លេស',
    grammarFocusEn: 'Present Simple tense (Verb to be: am, is, are)',
    grammarFocusKh: 'កិរិយាសព្ទ To Be ក្នុងបច្ចុប្បន្នកាលធម្មតា',
    dialogueEn: [
      { speaker: 'Sokha', text: 'Hello! My name is Sokha. What is your name?', translationKh: 'សួស្តី! ខ្ញុំឈ្មោះសុខា។ តើអ្នកឈ្មោះអ្វី?' },
      { speaker: 'Thida', text: 'Hi Sokha! I am Thida. Nice to meet you.', translationKh: 'សួស្តីសុខា! ខ្ញុំឈ្មោះធីតា។ រីករាយដែលបានស្គាល់អ្នក។' },
      { speaker: 'Sokha', text: 'Nice to meet you too! Which grade are you in?', translationKh: 'រីករាយដែលបានស្គាល់អ្នកដូចគ្នា! តើអ្នករៀនថ្នាក់ទីប៉ុន្មាន?' },
      { speaker: 'Thida', text: 'I am in Grade 6A. We are classmates!', translationKh: 'ខ្ញុំរៀនថ្នាក់ទី ៦A។ ពួកយើងជាមិត្តរួមថ្នាក់នឹងគ្នា!' },
    ],
    vocabulary: [
      { word: 'Classmate', phonetic: '/ˈklɑːsmeɪt/', partOfSpeech: 'noun', meaningKh: 'មិត្តរួមថ្នាក់', exampleSentence: 'Thida is my friendly classmate.', exampleTranslationKh: 'ធីតាគឺជាមិត្តរួមថ្នាក់រួសរាយរបស់ខ្ញុំ។' },
      { word: 'Welcome', phonetic: '/ˈwelkəm/', partOfSpeech: 'verb/noun', meaningKh: 'ស្វាគមន៍', exampleSentence: 'Welcome to our school!', exampleTranslationKh: 'សូមស្វាគមន៍មកកាន់សាលារបស់ពួកយើង!' },
      { word: 'Introduce', phonetic: '/ˌɪntrəˈdjuːs/', partOfSpeech: 'verb', meaningKh: 'ណែនាំ (ខ្លួន/អ្នកដទៃ)', exampleSentence: 'Please introduce yourself to the class.', exampleTranslationKh: 'សូមណែនាំខ្លួនរបស់អ្នកដល់ថ្នាក់រៀន។' },
    ],
    practiceQuestions: [
      {
        question: 'Complete: "Hello, I _____ a Grade 6 student."',
        options: ['am', 'is', 'are', 'be'],
        correctIndex: 0,
        explanationKh: 'ប្រធាន "I" ត្រូវប្រើជាមួយកិរិយាសព្ទ "am"។',
      },
      {
        question: 'Which word means "មិត្តរួមថ្នាក់"?',
        options: ['Teacher', 'Classmate', 'Principal', 'Doctor'],
        correctIndex: 1,
        explanationKh: '"Classmate" មានន័យថាមិត្តរួមថ្នាក់។',
      },
    ],
  },
  {
    id: 2,
    unitNumber: 2,
    chapterId: 1,
    titleEn: 'Unit 2: Classroom Rules and Supplies',
    titleKh: 'មេរៀនទី២ ៖ បទបញ្ជាថ្នាក់ និងសម្ភារសិក្សា',
    subtitleKh: 'ការប្រើប្រាស់ពាក្យបញ្ជា និងឈ្មោះសម្ភារក្នុងថ្នាក់',
    grammarFocusEn: 'Imperatives & Modals (Must / Should / Please)',
    grammarFocusKh: 'ល្បះបញ្ជា និងកិរិយាសព្ទជំនួយ Must/Should',
    dialogueEn: [
      { speaker: 'Teacher', text: 'Good morning students! Please open your books to page 10.', translationKh: 'អរុណសួស្តីកូនៗ! សូមបើកសៀវភៅទំព័រទី១០។' },
      { speaker: 'Students', text: 'Good morning teacher! Yes, we are ready.', translationKh: 'អរុណសួស្តីលោកគ្រូ! បាទ/ចាស ពួកយើងរួចរាល់ហើយ។' },
    ],
    vocabulary: [
      { word: 'Textbook', phonetic: '/ˈtekstbʊk/', partOfSpeech: 'noun', meaningKh: 'សៀវភៅពុម្ព', exampleSentence: 'Open your English textbook.', exampleTranslationKh: 'បើកសៀវភៅពុម្ពភាសាអង់គ្លេសរបស់អ្នក។' },
      { word: 'Ruler', phonetic: '/ˈruːlə(r)/', partOfSpeech: 'noun', meaningKh: 'បន្ទាត់', exampleSentence: 'I use a ruler to draw straight lines.', exampleTranslationKh: 'ខ្ញុំប្រើបន្ទាត់ដើម្បីគូសបន្ទាត់ត្រង់។' },
    ],
    practiceQuestions: [
      {
        question: 'What do you use to write in your notebook?',
        options: ['Pen', 'Eraser', 'Ruler', 'Backpack'],
        correctIndex: 0,
        explanationKh: '"Pen" គឺប៊ិចសម្រាប់សរសេរ។',
      },
    ],
  },
];
