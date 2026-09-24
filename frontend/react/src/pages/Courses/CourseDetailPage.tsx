import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { mockDashboardData } from '../../data/mockDashboardData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { coursesListData } from './CoursesPage';
import { TopicDetailPage } from './TopicDetailPage';
import { HeroBanner } from '../../components/ui/HeroBanner';
import { ArrowRight, Book, ExternalLink } from 'lucide-react';

interface BookItem {
  courseSlug: string;
  title: string;
  author: string;
  price: string;
  link: string;
}

const booksDataset: BookItem[] = [
  {
    courseSlug: 'quantitative-aptitude',
    title: 'Quantitative Aptitude for Competitive Examinations',
    author: 'Dr. R.S. Aggarwal',
    price: '₹550',
    link: 'https://www.amazon.in/s?k=quantitative+aptitude+rs+aggarwal',
  },
  {
    courseSlug: 'quantitative-aptitude',
    title: 'Fast Track Objective Arithmetic',
    author: 'Rajesh Verma',
    price: '₹310',
    link: 'https://www.amazon.in/s?k=fast+track+objective+arithmetic+rajesh+verma',
  },
  {
    courseSlug: 'aptitude-mastery',
    title: 'Quantitative Aptitude for Competitive Examinations',
    author: 'Dr. R.S. Aggarwal',
    price: '₹550',
    link: 'https://www.amazon.in/s?k=quantitative+aptitude+rs+aggarwal',
  },
  {
    courseSlug: 'aptitude-mastery',
    title: 'Fast Track Objective Arithmetic',
    author: 'Rajesh Verma',
    price: '₹310',
    link: 'https://www.amazon.in/s?k=fast+track+objective+arithmetic+rajesh+verma',
  },
  {
    courseSlug: 'logical-reasoning',
    title: 'A Modern Approach to Verbal & Non-Verbal Reasoning',
    author: 'Dr. R.S. Aggarwal',
    price: '₹620',
    link: 'https://www.amazon.in/s?k=verbal+and+non+verbal+reasoning+rs+aggarwal',
  },
  {
    courseSlug: 'logical-reasoning',
    title: 'How to Prepare for Logical Reasoning for CAT',
    author: 'Arun Sharma',
    price: '₹590',
    link: 'https://www.amazon.in/s?k=logical+reasoning+arun+sharma',
  },
  {
    courseSlug: 'english-proficiency',
    title: 'Word Power Made Easy',
    author: 'Norman Lewis',
    price: '₹150',
    link: 'https://www.amazon.in/s?k=word+power+made+easy',
  },
  {
    courseSlug: 'english-proficiency',
    title: 'High School English Grammar and Composition',
    author: 'Wren & Martin',
    price: '₹380',
    link: 'https://www.amazon.in/s?k=wren+and+martin',
  },
];

interface CourseDetailPageProps {
  courseSlug?: string;
  onBack?: () => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  courseSlug = 'aptitude-mastery',
  onBack,
}) => {
  const [selectedTopicSlug, setSelectedTopicSlugState] = useState<string | null>(() => {
    const path = window.location.pathname;
    const match = path.match(/\/topic\/([^\/]+)/);
    return match ? match[1] : null;
  });

  const setSelectedTopicSlug = (slug: string | null) => {
    if (slug) {
      // Redirect to practice page with selected course and topic filters
      window.location.href = `/practice?course=${courseSlug}&topic=${slug}`;
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const match = path.match(/\/topic\/([^\/]+)/);
      setSelectedTopicSlugState(match ? match[1] : null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useScrollReveal(selectedTopicSlug);

  const currentCourse =
    coursesListData.find((c) => c.slug === courseSlug) || coursesListData[0];

  const courseTopics = [
    {
      slug: 'quantitative-aptitude',
      title: 'Quantitative Aptitude',
      subtopicsCount: 4,
    },
    {
      slug: 'logical-reasoning',
      title: 'Logical Reasoning',
      subtopicsCount: 4,
    },
    {
      slug: 'data-interpretation',
      title: 'Data Interpretation',
      subtopicsCount: 4,
    },
  ];

  const recommendedBooks = booksDataset.filter(
    (b) => b.courseSlug === currentCourse.slug
  );

  const continueLearningCourses = coursesListData.filter(
    (c) => c.slug !== currentCourse.slug
  );

  if (selectedTopicSlug) {
    return (
      <TopicDetailPage
        courseSlug={currentCourse.slug}
        topicSlug={selectedTopicSlug}
        onBack={() => setSelectedTopicSlug(null)}
      />
    );
  }

  return (
    <DashboardLayout profile={mockDashboardData.profile}>
      <div className="relative pb-20 overflow-x-hidden">
        {/* Reusable Parallax Cover Hero Banner */}
        <HeroBanner
          bgImage={currentCourse.bg_image}
          badgeText="FREE COURSE"
          badgeColor="green"
          title={currentCourse.title}
          description={currentCourse.description}
          backText="BACK TO COURSES"
          onBack={onBack}
          backUrl="/courses/"
        />

        {/* 2. Main Overlapping Grid Container */}
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-30 -mt-28 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 reveal">
          {/* Main Workspace Column */}
          <div className="space-y-8">
            {/* Course Overview & Topics Glass Card (Django 1:1 Transparent Look) */}
            <div className="p-8 sm:p-10 rounded-[28px] bg-white/[0.025] backdrop-blur-2xl border border-white/[0.08] space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] reveal-delay-1">
              {/* Section Header with Horizontal Fading Line */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-extrabold text-white tracking-tight shrink-0 font-display">Course Overview</h3>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                </div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light opacity-75">
                  {currentCourse.detailed_description}
                </p>
              </div>

              {/* Explore Topics Section */}
              <div className="space-y-6 pt-2 reveal-delay-2">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-extrabold text-white tracking-tight shrink-0 font-display">Explore Topics</h3>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {courseTopics.map((topic) => (
                    <div
                      key={topic.slug}
                      onClick={() => setSelectedTopicSlug(topic.slug)}
                      className="p-5 sm:p-6 rounded-[20px] bg-white/[0.02] hover:bg-[#2af598]/[0.08] border border-white/[0.06] hover:border-[#2af598]/40 transition-all duration-300 flex items-center justify-between group cursor-pointer shadow-lg prepverse-card-hover"
                    >
                      <div className="space-y-1">
                        <h4 className="text-base font-semibold text-white group-hover:text-[#2af598] transition-colors">
                          {topic.title}
                        </h4>
                        <p className="text-xs text-white/50 font-sans">
                          {topic.subtopicsCount} Modules • Access All Content
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-[#2af598] group-hover:translate-x-1 transition-all shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Prep Reference Books Card */}
            {recommendedBooks.length > 0 && (
              <div className="p-8 sm:p-10 rounded-[28px] bg-white/[0.025] backdrop-blur-2xl border border-white/[0.08] space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)] reveal-delay-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2.5 shrink-0">
                    <Book className="w-5 h-5 text-blue-400" />
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-display">Recommended Prep Reference Books</h3>
                  </div>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recommendedBooks.map((book) => (
                    <a
                      key={book.title}
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 sm:p-5 rounded-[16px] bg-white/[0.02] hover:bg-blue-500/[0.08] border border-white/[0.06] hover:border-blue-400/40 transition-all duration-300 flex items-center gap-4 group prepverse-card-hover cursor-pointer"
                    >
                      <span className="text-2xl shrink-0">📖</span>
                      <div className="flex-1 space-y-1">
                        <span className="text-xs font-semibold text-white block group-hover:text-blue-300 transition-colors">
                          {book.title} by {book.author}
                        </span>
                        <span className="text-[11px] font-mono font-bold text-amber-400 flex items-center gap-1">
                          {book.price} on Amazon <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Right Column (Exact Screenshot 1:1 Match) */}
          <div className="space-y-4 reveal-delay-2">
            {/* Stat Card 1 */}
            <div className="p-6 sm:p-7 rounded-[22px] bg-white/[0.025] backdrop-blur-2xl border border-white/[0.08] space-y-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-[10px] bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#2af598] shrink-0 font-bold text-base">
                  🔓
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">ACCESS</span>
                  <strong className="text-sm text-white font-bold">Completely Free</strong>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-[10px] bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#2af598] shrink-0 font-bold text-base">
                  ⏰
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">DURATION</span>
                  <strong className="text-sm text-white font-bold">Self-Paced</strong>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-[10px] bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#2af598] shrink-0 font-bold text-base">
                  🥞
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">LEVEL</span>
                  <strong className="text-sm text-white font-bold">Beginner to Pro</strong>
                </div>
              </div>
            </div>

            {/* Stat Card 2 Notice */}
            <div className="p-6 rounded-[22px] bg-white/[0.025] backdrop-blur-2xl border border-white/[0.08] text-center shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
              <p className="text-xs text-white/65 leading-relaxed font-light">
                No registration required. Just click a topic and start learning!
              </p>
            </div>
          </div>
        </div>

        {/* 3. Continue Learning Bottom Section */}
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-6 pt-16 reveal">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-extrabold text-white tracking-tight shrink-0 font-display">Continue Learning</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {continueLearningCourses.slice(0, 3).map((c) => (
              <a
                key={c.slug}
                href={`/courses/${c.slug}/`}
                className="group relative h-48 rounded-[24px] overflow-hidden border border-white/10 hover:border-[#2af598]/50 transition-all duration-500 flex items-end p-6 cursor-pointer shadow-lg prepverse-card-hover"
              >
                <img
                  src={c.bg_image}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-60 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                <h4 className="relative z-20 text-base font-bold text-white uppercase tracking-wide group-hover:text-[#2af598] transition-colors font-display">
                  {c.title}
                </h4>
              </a>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
