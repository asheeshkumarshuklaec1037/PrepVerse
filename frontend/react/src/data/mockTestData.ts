export interface MockTestCardData {
  id: string;
  mode: 'Module Blitz' | 'Topic Master' | 'Subject Marathon';
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  btnText: string;
  btnColor: 'orange' | 'blue' | 'purple';
  image: string;
}

export interface SubjectData {
  name: string;
  topics: {
    name: string;
    modules: string[];
  }[];
}

export interface MockPaper {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  dClass: string;
  cClass: string;
  xp: string;
  questions: string;
  duration: string;
  isAttempted?: boolean;
}

export const mockTestModes: MockTestCardData[] = [
  {
    id: 'blitz',
    mode: 'Module Blitz',
    title: 'Single Module Drill (Module Blitz)',
    subtitle: 'Module Blitz',
    description: 'Focus deeply on a single, isolated module within a topic. Perfect for practicing specific weak areas and quick concepts.',
    icon: '🧩',
    btnText: 'Start Module Drill',
    btnColor: 'orange',
    image: '/static/images/drill_exam_card.jpg',
  },
  {
    id: 'master',
    mode: 'Topic Master',
    title: 'Complete Topic Test (Topic Master)',
    subtitle: 'Topic Master',
    description: 'Covers all modules under a selected topic category. Ideal for testing your cumulative knowledge of a whole topic.',
    icon: '📋',
    btnText: 'Start Topic Test',
    btnColor: 'blue',
    image: '/static/images/full_test_card.jpg',
  },
  {
    id: 'marathon',
    mode: 'Subject Marathon',
    title: 'Full Subject Marathon (Subject Test)',
    subtitle: 'Subject Marathon',
    description: 'A comprehensive, full-length mock test covering all topics and modules inside a major subject. Simulates actual exam rounds.',
    icon: '🏆',
    btnText: 'Start Subject Marathon',
    btnColor: 'purple',
    image: '/static/images/marathon_card.jpg',
  },
];

export const mockSubjects: SubjectData[] = [
  {
    name: 'Aptitude Mastery',
    topics: [
      { name: 'Quantitative Aptitude', modules: ['Number Systems', 'Percentages', 'Profit & Loss', 'Time & Work'] },
      { name: 'Logical Reasoning', modules: ['Blood Relations', 'Syllogisms', 'Seating Arrangement', 'Data Sufficiency'] },
      { name: 'Data Interpretation', modules: ['Pie Charts', 'Bar Graphs', 'Line Graphs', 'Caselets'] }
    ]
  },
  {
    name: 'Logical Reasoning',
    topics: [
      { name: 'Verbal Reasoning', modules: ['Analogy', 'Classification', 'Series Completion', 'Coding-Decoding'] },
      { name: 'Analytical Reasoning', modules: ['Statements & Assumptions', 'Arguments', 'Conclusions', 'Course of Action'] },
      { name: 'Non-Verbal Reasoning', modules: ['Mirror Images', 'Paper Folding', 'Cube & Dice', 'Pattern Completion'] }
    ]
  },
  {
    name: 'English Proficiency',
    topics: [
      { name: 'Grammar Essentials', modules: ['Parts of Speech', 'Tenses', 'Active & Passive Voice', 'Direct & Indirect Speech'] },
      { name: 'Vocabulary Building', modules: ['Synonyms & Antonyms', 'Idioms & Phrases', 'One-word Substitutions', 'Spelling Rules'] },
      { name: 'Reading Comprehension', modules: ['Main Idea Identification', 'Inference Making', 'Vocabulary in Context', 'Tone & Style'] }
    ]
  },
  {
    name: 'Quantitative Aptitude',
    topics: [
      { name: 'Arithmetic', modules: ['Ratio & Proportion', 'Average', 'Partnership', 'Mixtures & Alligations'] },
      { name: 'Algebra', modules: ['Linear Equations', 'Quadratic Equations', 'Inequalities', 'Logarithms'] },
      { name: 'Modern Math', modules: ['Permutations & Combinations', 'Probability', 'Set Theory', 'Geometry'] }
    ]
  }
];

export const mockPapersCatalog: MockPaper[] = [
  { id: 'p1', name: 'Mock Test 01', difficulty: 'Easy', dClass: 'diff-easy', cClass: 'easy-card', xp: '+100 XP', questions: '10 MCQs', duration: '15 Mins', isAttempted: true },
  { id: 'p2', name: 'Mock Test 02', difficulty: 'Medium', dClass: 'diff-medium', cClass: 'medium-card', xp: '+250 XP', questions: '25 MCQs', duration: '30 Mins', isAttempted: false },
  { id: 'p3', name: 'Mock Test 03', difficulty: 'Hard', dClass: 'diff-hard', cClass: 'hard-card', xp: '+500 XP', questions: '50 MCQs', duration: '60 Mins', isAttempted: false },
];
