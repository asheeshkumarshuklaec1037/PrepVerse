export interface DashboardStats {
  questionsSolved: number;
  accuracy: string;
  currentStreak: number;
  globalRank: number;
  examTrack: string;
  examDaysLeft: number;
}

export interface CandidateProfile {
  firstName: string;
  lastName: string;
  email: string;
  level: number;
  isProCandidate: boolean;
  currentXp: number;
  requiredXp: number;
  avatarUrl: string;
}

export interface ContinueLearningPath {
  courseName: string;
  moduleName: string;
  topicName: string;
  setName: string;
  completedQuestions: number;
  totalQuestions: number;
  progressPercentage: number;
}

export interface FocusTask {
  id: string;
  title: string;
  estimatedTimeMinutes: number;
  completed: boolean;
  category: string;
}

export interface WeakTopic {
  rank: string;
  title: string;
  subTopic: string;
  attempted: number;
  accuracy: string;
  courseId: number;
}

export interface UpcomingEvent {
  id: string;
  day: string;
  month: string;
  title: string;
  info: string;
  isLive?: boolean;
}

export interface TopicMasteryItem {
  id: number;
  title: string;
  count: number;
  progress: number;
  color: string;
}

export interface SubjectPracticeCardData {
  id: string;
  subjectName: string;
  code: string;
  completionPercentage: number;
  totalModules: number;
  completedModules: number;
  accentColor: string;
  iconName: string;
}

export interface ConsistencyDayData {
  date: string; // YYYY-MM-DD
  count: number; // 0 to 4+
  level: 0 | 1 | 2 | 3 | 4;
}

export interface DashboardData {
  profile: CandidateProfile;
  stats: DashboardStats;
  continueLearning: ContinueLearningPath;
  focusTasks: FocusTask[];
  weakTopics: WeakTopic[];
  upcomingEvents: UpcomingEvent[];
  topicMastery: TopicMasteryItem[];
  subjects: SubjectPracticeCardData[];
  consistencyHeatmap: ConsistencyDayData[];
}
