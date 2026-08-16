export interface SubtopicModule {
  name: string;
  practiceSets: {
    id: string;
    title: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    questions: string;
    duration: string;
    xp: string;
  }[];
  studyMaterials: {
    id: string;
    title: string;
    format: string;
    type: string;
    meta: string;
    readTime: string;
    xp: string;
    fileUrl: string;
    fileType: 'pdf' | 'doc';
  }[];
}

export interface TopicData {
  slug: string;
  title: string;
  subtopics: string[];
}

export interface CourseData {
  slug: string;
  section: string;
  title: string;
  description: string;
  detailed_description: string;
  icon: string;
  gradient: string;
  bg_image: string;
  tags: string[];
  subject: string;
  topics: TopicData[];
}

export const ALL_COURSES: CourseData[] = [
  {
    slug: 'aptitude-mastery',
    section: 'placement-prep',
    title: 'Aptitude Mastery',
    description: 'Master logical and numerical problem solving for top company placements with our expert-led modules.',
    detailed_description: 'This comprehensive course is designed to sharpen your numerical, logical, and verbal aptitude. Whether you are preparing for campus placements, competitive exams, or professional certifications, our curated modules provide the foundational knowledge and advanced techniques needed to excel.',
    icon: 'fa-brain',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    bg_image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
    tags: ['Best Seller', '12 Modules', 'Beginner'],
    subject: 'Aptitude',
    topics: [
      { slug: 'quantitative-aptitude', title: 'Quantitative Aptitude', subtopics: ['Number Systems', 'Percentages', 'Profit & Loss', 'Time & Work'] },
      { slug: 'logical-reasoning', title: 'Logical Reasoning', subtopics: ['Blood Relations', 'Syllogisms', 'Seating Arrangement', 'Data Sufficiency'] },
      { slug: 'data-interpretation', title: 'Data Interpretation', subtopics: ['Pie Charts', 'Bar Graphs', 'Line Graphs', 'Caselets'] },
    ],
  },
  {
    slug: 'logical-reasoning',
    section: 'placement-prep',
    title: 'Logical Reasoning',
    description: 'Enhance your critical thinking and logical analysis skills for competitive exams through interactive challenges.',
    detailed_description: 'Logical reasoning is the backbone of problem-solving. This course focuses on developing your ability to analyze patterns, structures, and relationships. Through a series of interactive challenges and real-world scenarios, you will learn to approach complex problems with a structured mindset.',
    icon: 'fa-puzzle-piece',
    gradient: 'linear-gradient(135deg, #2af598 0%, #009efd 100%)',
    bg_image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2104&auto=format&fit=crop',
    tags: ['New', '8 Modules', 'Intermediate'],
    subject: 'Reasoning',
    topics: [
      { slug: 'verbal-reasoning', title: 'Verbal Reasoning', subtopics: ['Analogy', 'Classification', 'Series Completion', 'Coding-Decoding'] },
      { slug: 'analytical-reasoning', title: 'Analytical Reasoning', subtopics: ['Statements & Assumptions', 'Arguments', 'Conclusions', 'Course of Action'] },
      { slug: 'non-verbal-reasoning', title: 'Non-Verbal Reasoning', subtopics: ['Mirror Images', 'Paper Folding', 'Cube & Dice', 'Pattern Completion'] },
    ],
  },
  {
    slug: 'english-proficiency',
    section: 'placement-prep',
    title: 'English Proficiency',
    description: 'Improve your vocabulary, grammar, and comprehension for verbal ability tests with daily practice sets.',
    detailed_description: 'Communication is key to success in any field. This course is designed to enhance your verbal ability, focusing on grammar, vocabulary building, and reading comprehension. With daily practice sets and expert feedback, you will gain the confidence to communicate effectively in professional and academic environments.',
    icon: 'fa-book-open',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    bg_image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop',
    tags: ['Essential', '15 Modules', 'All Levels'],
    subject: 'Verbal',
    topics: [
      { slug: 'grammar-essentials', title: 'Grammar Essentials', subtopics: ['Parts of Speech', 'Tenses', 'Active & Passive Voice', 'Direct & Indirect Speech'] },
      { slug: 'vocabulary-building', title: 'Vocabulary Building', subtopics: ['Synonyms & Antonyms', 'Idioms & Phrases', 'One-word Substitutions', 'Spelling Rules'] },
      { slug: 'reading-comprehension', title: 'Reading Comprehension', subtopics: ['Main Idea Identification', 'Inference Making', 'Vocabulary in Context', 'Tone & Style'] },
    ],
  },
  {
    slug: 'quantitative-aptitude',
    section: 'placement-prep',
    title: 'Quantitative Aptitude',
    description: 'Advanced mathematics and quantitative techniques for data-driven success in every competitive field.',
    detailed_description: 'In today\'s data-driven world, quantitative skills are more important than ever. This course covers advanced mathematical concepts and quantitative techniques used in finance, technology, and analytics. You will learn to manipulate data, identify trends, and make informed decisions based on quantitative evidence.',
    icon: 'fa-calculator',
    gradient: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
    bg_image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop',
    tags: ['Advanced', '20 Modules', 'Hard'],
    subject: 'Technical',
    topics: [
      { slug: 'arithmetic', title: 'Arithmetic', subtopics: ['Ratio & Proportion', 'Average', 'Partnership', 'Mixtures & Alligations'] },
      { slug: 'algebra', title: 'Algebra', subtopics: ['Linear Equations', 'Quadratic Equations', 'Inequalities', 'Logarithms'] },
      { slug: 'modern-math', title: 'Modern Math', subtopics: ['Permutations & Combinations', 'Probability', 'Set Theory', 'Geometry'] },
    ],
  },
];
