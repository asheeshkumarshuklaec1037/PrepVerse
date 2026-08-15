import React, { useState, useEffect } from 'react';
import type { CandidateProfile } from '../types/dashboard';
import {
  Compass,
  LineChart,
  Trophy,
  Bookmark,
  Calendar,
  Bell,
  BookOpen,
  PenTool,
  Laptop,
  Newspaper,
  BookMarked,
  Info,
  LogOut,
  Search,
  Zap,
  Home,
  SlidersHorizontal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
  profile: CandidateProfile;
  unreadNotificationsCount?: number;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  profile,
  unreadNotificationsCount = 3,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Desktop Left-Edge Mouse Sensor (Triggers sidebar when mouse enters X <= 20px)
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth > 992 && e.clientX <= 20) {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0d] text-gray-100 flex flex-col font-sans selection:bg-purple-500/30 selection:text-purple-200">
      {/* Invisible Desktop Left-Most Edge Hover Trigger Strip (X <= 20px) */}
      <div
        onMouseEnter={() => {
          if (!isMobile) setIsSidebarOpen(true);
        }}
        className="fixed top-0 left-0 h-full w-5 z-[999990] hidden lg:block pointer-events-auto"
      />
      {/* 1. Global Slide-Over Navigation Drawer (Matching Django Sidebar Template 1:1) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-none z-[999998] cursor-pointer"
            />

            {/* Sidebar Drawer Container (High-Transparency Glassmorphism Look) */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onMouseLeave={() => {
                if (!isMobile) setIsSidebarOpen(false);
              }}
              className="fixed top-0 left-0 h-full w-[260px] bg-[#0a0a0f]/25 backdrop-blur-2xl saturate-200 border-r border-white/20 z-[999999] flex flex-col shadow-[15px_0_50px_rgba(0,0,0,0.8)] overflow-y-auto"
            >
              {/* Sidebar Header / Brand */}
              <div className="p-6 pb-5 flex items-center justify-start border-b border-white/[0.05]">
                <a href="/" className="flex items-center gap-3 text-white font-extrabold text-xl text-decoration-none">
                  <div className="text-[#00b894] text-2xl animate-pulse">
                    <Zap className="w-6 h-6 fill-current text-[#00b894] drop-shadow-[0_0_8px_rgba(42,245,152,0.6)]" />
                  </div>
                  <span className="font-extrabold text-xl tracking-tight text-white">PrepVerse</span>
                </a>
              </div>

              {/* Sidebar User Card with Avatar Pulse */}
              <div
                onClick={() => {
                  window.location.href = '/profile/edit/';
                }}
                className="p-5 flex items-center gap-3.5 border-b border-white/[0.05] bg-gradient-to-r from-[#0d1130]/60 via-[#3b82f6]/10 to-[#a855f7]/10 cursor-pointer hover:bg-white/[0.05] transition-all group"
              >
                <div className="relative w-11 h-11 rounded-full border-2 border-[#00b894] shadow-lg overflow-hidden flex-shrink-0 group-hover:scale-105 group-hover:border-[#c084fc] transition-all">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.firstName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00b894] to-[#c084fc] leading-snug truncate">
                    Hey, {profile.firstName}!
                  </span>
                  <span className="text-[11px] font-mono text-[#00b894] font-semibold opacity-90 leading-tight">
                    Manage Profile ↗
                  </span>
                </div>
              </div>

              {/* Sidebar Navigation */}
              <nav className="flex-1 p-3.5 space-y-6">
                {/* Apps Section */}
                <div className="space-y-2">
                  <a
                    href="/dashboard/"
                    className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-[#00b894]/15 border border-[#00b894]/30 text-[#00b894] font-semibold text-sm shadow-[0_0_15px_rgba(42,245,152,0.2)] transition-all hover:translate-y-[-2px]"
                  >
                    <Compass className="w-5 h-5 flex-shrink-0 text-[#00b894]" />
                    <span>Dashboard</span>
                  </a>
                  <a
                    href="/mock-history/"
                    className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-400 hover:text-[#38bdf8] hover:bg-white/[0.04] hover:border-[#38bdf8]/30 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] text-sm font-semibold transition-all border border-transparent hover:translate-y-[-2px]"
                  >
                    <LineChart className="w-5 h-5 flex-shrink-0 text-[#38bdf8]" />
                    <span>Test Performance</span>
                  </a>
                  <a
                    href="/leaderboard/"
                    className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-400 hover:text-[#c084fc] hover:bg-white/[0.04] hover:border-[#c084fc]/30 hover:shadow-[0_0_15px_rgba(192,132,252,0.2)] text-sm font-semibold transition-all border border-transparent hover:translate-y-[-2px]"
                  >
                    <Trophy className="w-5 h-5 flex-shrink-0 text-[#c084fc]" />
                    <span>Leaderboard</span>
                  </a>
                  <a
                    href="/bookmarks/"
                    className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-400 hover:text-[#fdcb6e] hover:bg-white/[0.04] hover:border-[#fdcb6e]/30 hover:shadow-[0_0_15px_rgba(251,205,11,0.2)] text-sm font-semibold transition-all border border-transparent hover:translate-y-[-2px]"
                  >
                    <Bookmark className="w-5 h-5 flex-shrink-0 text-[#fdcb6e]" />
                    <span>Bookmarks</span>
                  </a>
                  <a
                    href="/calendar/"
                    className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-400 hover:text-[#38bdf8] hover:bg-white/[0.04] hover:border-[#38bdf8]/30 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] text-sm font-semibold transition-all border border-transparent hover:translate-y-[-2px]"
                  >
                    <Calendar className="w-5 h-5 flex-shrink-0 text-[#38bdf8]" />
                    <span>Calendar</span>
                  </a>
                  <a
                    href="/notifications/"
                    className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-400 hover:text-[#a855f7] hover:bg-white/[0.04] hover:border-[#a855f7]/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] text-sm font-semibold transition-all border border-transparent hover:translate-y-[-2px]"
                  >
                    <Bell className="w-5 h-5 flex-shrink-0 text-[#a855f7]" />
                    <span>Notifications</span>
                  </a>
                </div>

                {/* Site Exploration Section (ONLY VISIBLE IN MOBILE VIEW: max-width 992px) */}
                {isMobile && (
                  <div className="space-y-1 pt-2 border-t border-white/[0.05]">
                    <div className="px-3 mb-2 text-[11px] font-mono text-white/40 uppercase tracking-widest font-bold">
                      Explore Site
                    </div>
                    <a
                      href="/"
                      className="flex items-center gap-4 px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.04] text-xs font-medium transition-all"
                    >
                      <Home className="w-4 h-4 flex-shrink-0 text-[#00b894]" />
                      <span>Home</span>
                    </a>
                    <a
                      href="/courses/"
                      className="flex items-center gap-4 px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.04] text-xs font-medium transition-all"
                    >
                      <BookOpen className="w-4 h-4 flex-shrink-0 text-[#38bdf8]" />
                      <span>Courses</span>
                    </a>
                    <a
                      href="/practice/"
                      className="flex items-center gap-4 px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.04] text-xs font-medium transition-all"
                    >
                      <PenTool className="w-4 h-4 flex-shrink-0 text-[#c084fc]" />
                      <span>Practice</span>
                    </a>
                    <a
                      href="/mock-tests/"
                      className="flex items-center gap-4 px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.04] text-xs font-medium transition-all"
                    >
                      <Laptop className="w-4 h-4 flex-shrink-0 text-[#38bdf8]" />
                      <span>Mock Test</span>
                    </a>
                    <a
                      href="/blog/"
                      className="flex items-center gap-4 px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.04] text-xs font-medium transition-all"
                    >
                      <Newspaper className="w-4 h-4 flex-shrink-0 text-[#fdcb6e]" />
                      <span>Blog</span>
                    </a>
                    <a
                      href="/books/"
                      className="flex items-center gap-4 px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.04] text-xs font-medium transition-all"
                    >
                      <BookMarked className="w-4 h-4 flex-shrink-0 text-[#ff7675]" />
                      <span>Prep Books</span>
                    </a>
                    <a
                      href="/about/"
                      className="flex items-center gap-4 px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.04] text-xs font-medium transition-all"
                    >
                      <Info className="w-4 h-4 flex-shrink-0 text-[#38bdf8]" />
                      <span>About</span>
                    </a>
                  </div>
                )}
              </nav>

              {/* Sidebar Footer Logout */}
              <div className="p-4 border-t border-white/[0.05]">
                <a
                  href="/logout/"
                  className="flex items-center gap-4 w-full px-4 py-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white font-semibold text-xs border border-rose-500/20 hover:border-rose-500 transition-all shadow-md"
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  <span>Log Out</span>
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 2. Top Global Navbar (Center-Oriented Menu Links with Active Glass Pills) */}
      <header className="sticky top-0 z-40 w-full bg-[#0a0b12]/85 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Left: Brand & Sidebar Trigger */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-[200px]">
          {/* Round 42x42px Menu Button matching Django navbar.html #sidebarHoverTrigger */}
          <button
            id="sidebarHoverTrigger"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            onMouseEnter={() => {
              if (!isMobile) setIsSidebarOpen(true);
            }}
            className="w-[42px] h-[42px] min-w-[42px] min-h-[42px] rounded-xl bg-white/[0.06] hover:bg-[#6c5ce7]/25 border border-white/[0.12] hover:border-[#8b7cf0]/50 text-[#38bdf8] hover:text-[#2af598] transition-all flex items-center justify-center cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(108,92,231,0.35)] hover:-translate-y-[1px]"
            aria-label="Open Navigation Menu"
          >
            <SlidersHorizontal className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          </button>

          <a href="/" className="flex items-center gap-2 text-white font-extrabold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <span>PrepVerse</span>
          </a>
        </div>

        {/* Center: Oriented Desktop Nav Links with Glassmorphism Active Focus matching Django navbar.html 1:1 */}
        <nav className="hidden lg:flex items-center justify-center gap-1.5 text-sm font-sans font-medium">
          {[
            { label: 'Home', path: '/' },
            { label: 'Courses', path: '/courses/' },
            { label: 'Practice', path: '/practice/' },
            { label: 'Mock Test', path: '/mock-tests/' },
            { label: 'Blog', path: '/blog/' },
            { label: 'Prep Books', path: '/books/' },
            { label: 'About', path: '/about/' },
          ].map((link) => {
            const currentPath = window.location.pathname;
            const isActive =
              link.path === '/'
                ? currentPath === '/' || currentPath === '/dashboard/' || currentPath === ''
                : currentPath.startsWith(link.path.replace(/\/$/, '')) || currentPath.includes(link.label.toLowerCase().replace(' ', ''));

            return (
              <a
                key={link.label}
                href={link.path}
                className={`px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer text-[0.9rem] ${
                  isActive
                    ? 'bg-white/[0.10] backdrop-blur-md border border-white/20 text-white font-semibold shadow-[0_0_15px_rgba(255,255,255,0.12)]'
                    : 'text-gray-300/80 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Search, Notifications & Profile */}
        <div className="flex items-center justify-end gap-3 sm:gap-4 min-w-[200px]">
          <button className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-gray-400 hover:text-white transition-colors">
            <Search className="w-4 h-4" />
          </button>

          <button className="relative p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-gray-400 hover:text-white transition-colors">
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center gap-3 pl-2 border-l border-white/[0.08]">
            <img
              src={profile.avatarUrl}
              alt={profile.firstName}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500/40"
            />
            <div className="hidden sm:block text-left">
              <span className="text-xs font-bold text-white block leading-tight">
                {profile.firstName} {profile.lastName}
              </span>
              <span className="text-[10px] text-purple-400 font-semibold block leading-tight">
                Level {profile.level} Pro
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Main Container Area (Allows Full-Bleed Hero Top) */}
      <div className="flex-1 w-full pb-8">
        <main className="min-w-0">{children}</main>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#0a0b12] py-6 px-4 text-center text-xs text-gray-500">
        <p>© 2026 PrepVerse Platform Inc. All rights reserved. Placement Preparation Re-imagined.</p>
      </footer>
    </div>
  );
};
