import React, { useState, useMemo, useEffect } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { mockDashboardData } from '../../data/mockDashboardData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { CourseDetailPage } from './CourseDetailPage';
import { ArrowRight, Users, Brain, Puzzle, BookOpen, Calculator } from 'lucide-react';

export interface CourseItem {
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
  enrollmentCount: string;
}

export const coursesListData: CourseItem[] = [
  {
    slug: 'aptitude-mastery',
    section: 'placement-prep',
    title: 'Aptitude Mastery',
    description: 'Master logical and numerical problem solving for top company placements with our expert-led modules.',
    detailed_description: 'This comprehensive course is designed to sharpen your numerical, logical, and verbal aptitude.',
    icon: 'Brain',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    bg_image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
    tags: ['Best Seller', '12 Modules', 'Beginner'],
    subject: 'Aptitude',
    enrollmentCount: '10k+ Enrolled',
  },
  {
    slug: 'logical-reasoning',
    section: 'placement-prep',
    title: 'Logical Reasoning',
    description: 'Enhance your critical thinking and logical analysis skills for competitive exams through interactive challenges.',
    detailed_description: 'Logical reasoning is the backbone of problem-solving.',
    icon: 'Puzzle',
    gradient: 'linear-gradient(135deg, #2af598 0%, #009efd 100%)',
    bg_image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2104&auto=format&fit=crop',
    tags: ['New', '8 Modules', 'Intermediate'],
    subject: 'Reasoning',
    enrollmentCount: '8k+ Enrolled',
  },
  {
    slug: 'english-proficiency',
    section: 'placement-prep',
    title: 'English Proficiency',
    description: 'Improve your vocabulary, grammar, and comprehension for verbal ability tests with daily practice sets.',
    detailed_description: 'Communication is key to success in any field.',
    icon: 'BookOpen',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    bg_image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop',
    tags: ['Essential', '15 Modules', 'All Levels'],
    subject: 'Verbal',
    enrollmentCount: '12k+ Enrolled',
  },
  {
    slug: 'quantitative-aptitude',
    section: 'placement-prep',
    title: 'Quantitative Aptitude',
    description: 'Advanced mathematics and quantitative techniques for data-driven success in every competitive field.',
    detailed_description: 'In today\'s data-driven world, quantitative skills are more important than ever.',
    icon: 'Calculator',
    gradient: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
    bg_image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop',
    tags: ['Advanced', '20 Modules', 'Hard'],
    subject: 'Technical',
    enrollmentCount: '15k+ Enrolled',
  },
];

export const CoursesPage: React.FC = () => {
  const [selectedCourseSlug, setSelectedCourseSlugState] = useState<string | null>(() => {
    const path = window.location.pathname;
    const match = path.match(/\/courses\/([^\/]+)/);
    return match ? match[1] : null;
  });

  const setSelectedCourseSlug = (slug: string | null) => {
    setSelectedCourseSlugState(slug);
    if (slug) {
      window.history.pushState({}, '', `/courses/${slug}/`);
    } else {
      window.history.pushState({}, '', `/courses/`);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const match = path.match(/\/courses\/([^\/]+)/);
      setSelectedCourseSlugState(match ? match[1] : null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useScrollReveal(selectedCourseSlug);

  const [activeSection, setActiveSection] = useState<'all' | 'placement-prep'>('all');
  const [activeSubject, setActiveSubject] = useState<string>('all');

  const filteredCourses = useMemo(() => {
    return coursesListData.filter((c) => {
      if (activeSubject !== 'all' && c.subject !== activeSubject) return false;
      return true;
    });
  }, [activeSubject]);

  if (selectedCourseSlug) {
    return (
      <CourseDetailPage
        courseSlug={selectedCourseSlug}
        onBack={() => setSelectedCourseSlug(null)}
      />
    );
  }

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain':
        return <Brain className="w-7 h-7 text-white" />;
      case 'Puzzle':
        return <Puzzle className="w-7 h-7 text-white" />;
      case 'BookOpen':
        return <BookOpen className="w-7 h-7 text-white" />;
      case 'Calculator':
        return <Calculator className="w-7 h-7 text-white" />;
      default:
        return <Brain className="w-7 h-7 text-white" />;
    }
  };

  return (
    <DashboardLayout profile={mockDashboardData.profile}>
      <div className="space-y-12 pb-16">
        {/* 1. Hero Section (Django 1:1 Match) */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4 animate-page-fade-in">
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight bg-gradient-to-r from-white to-[#2af598] bg-clip-text text-transparent font-display">
            EXPLORE OUR PROGRAMS
          </h1>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light">
            Comprehensive, industry-aligned courses designed to master problem solving, logic, and communication for campus placements.
          </p>
        </div>

        {/* 2. Section Filters (Django 1:1 Match) */}
        <div className="flex justify-center flex-wrap gap-3.5 reveal">
          <button
            onClick={() => setActiveSection('all')}
            className={`px-6 py-2.5 rounded-full font-mono text-xs font-semibold border transition-all cursor-pointer ${
              activeSection === 'all'
                ? 'bg-[#2af598]/10 border-[#2af598] text-[#2af598] shadow-[0_0_15px_rgba(42,245,152,0.2)]'
                : 'bg-white/[0.03] border-white/10 text-white/60 hover:text-white hover:border-white/20'
            }`}
          >
            All Sections
          </button>
          <button
            onClick={() => setActiveSection('placement-prep')}
            className={`px-6 py-2.5 rounded-full font-mono text-xs font-semibold border transition-all cursor-pointer ${
              activeSection === 'placement-prep'
                ? 'bg-[#2af598]/10 border-[#2af598] text-[#2af598] shadow-[0_0_15px_rgba(42,245,152,0.2)]'
                : 'bg-white/[0.03] border-white/10 text-white/60 hover:text-white hover:border-white/20'
            }`}
          >
            Placement Preparation
          </button>
        </div>

        {/* 3. Subject Filters Pills (Django 1:1 Match) */}
        <div className="flex justify-center flex-wrap gap-3 reveal reveal-delay-1">
          {['all', 'Aptitude', 'Reasoning', 'Verbal', 'Technical'].map((subj) => (
            <button
              key={subj}
              onClick={() => setActiveSubject(subj)}
              className={`px-6 py-2.5 rounded-full font-mono text-xs font-semibold border transition-all cursor-pointer ${
                activeSubject === subj
                  ? 'bg-[#2af598]/10 border-[#2af598] text-[#2af598] shadow-[0_0_15px_rgba(42,245,152,0.2)]'
                  : 'bg-white/[0.03] border-white/10 text-white/60 hover:text-white hover:border-white/20'
              }`}
            >
              {subj === 'all' ? 'All Courses' : subj}
            </button>
          ))}
        </div>

        {/* 4. Courses Grid Container (3 Courses per Row) */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 reveal reveal-delay-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.slug}
                onClick={() => setSelectedCourseSlug(course.slug)}
                className="group relative rounded-3xl bg-[#0a0a0f] border border-white/10 flex flex-col justify-between overflow-hidden transition-colors duration-300 hover:border-[#2af598] hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(42,245,152,0.2)] cursor-pointer"
              >
                {/* Top Image Wrapper with Gradient Overlay & Dynamic Icon Badge */}
                <div className="relative w-full h-[204px] overflow-hidden bg-[#0a0a0f] shrink-0">
                  <img
                    src={course.bg_image}
                    alt={course.title}
                    className="w-full h-full object-cover filter brightness-75 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-108 group-hover:brightness-90 block"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent z-10 pointer-events-none" />

                  {/* Gradient Floating Icon Badge */}
                  <div
                    className="absolute -bottom-5 right-6 w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-[#050505] shadow-[0_10px_20px_rgba(0,0,0,0.4)] z-20 transition-transform duration-500 group-hover:scale-105"
                    style={{ background: course.gradient }}
                  >
                    {renderIcon(course.icon)}
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-7 pt-4 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-xl font-extrabold text-white group-hover:text-[#2af598] transition-colors leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed font-light line-clamp-3">
                      {course.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {/* Tags List */}
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag, tIdx) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            tIdx === 0
                              ? 'bg-[#2af598]/10 text-[#2af598] border-[#2af598]/20'
                              : 'bg-white/[0.05] text-white/70 border-white/10'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Card Footer */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                      <span className="text-white/40 font-mono flex items-center gap-1.5 text-[11px]">
                        <Users className="w-3.5 h-3.5" />
                        {course.enrollmentCount}
                      </span>
                      <span className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-1.5 group-hover:text-[#2af598] transition-colors">
                        Explore <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16 text-gray-400 font-mono text-xs border border-white/10 rounded-2xl bg-[#0a0a0f]">
              No courses found matching the selected subject.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
