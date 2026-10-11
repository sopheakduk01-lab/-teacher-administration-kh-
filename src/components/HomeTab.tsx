import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Play,
  PlusCircle,
  Users,
  Shield,
  BookOpen,
  Calendar,
  Award,
  Bell,
  ChevronRight,
  Tablet,
  CheckCircle2,
  Clock,
  Radio,
  HelpCircle,
  RotateCw,
  Camera,
  Check,
  ChevronLeft,
  GraduationCap,
  FileText,
  Target,
  Zap,
} from 'lucide-react';
import { TeacherProfile, Quiz } from '../types';
import { BANNER_THEMES, BannerThemeId, getSavedBannerTheme, saveBannerTheme } from '../utils/bannerThemes';
import { TeacherAvatar } from './TeacherAvatar';

interface HomeTabProps {
  teacher: TeacherProfile;
  currentYear: string;
  onOpenYearManager: () => void;
  quizzes: Quiz[];
  activeSession: { pin: string; active: boolean; quizTitle?: string; studentCount?: number };
  onStartLiveSession: (title?: string) => void;
  onEndLiveSession: () => void;
  onPlayQuiz: (quiz: Quiz) => void;
  onOpenProfile: () => void;
  onNavigateTab: (tab: string) => void;
  onShowToast: (msg: string) => void;
  onOpenTeacherNotices: () => void;
}

// 5 Main Quick Themes matching the UI design in IMG_4392
const THEME_OPTIONS: { id: BannerThemeId; icon: string; nameKh: string }[] = [
  { id: 'royal_purple', icon: '🌌', nameKh: 'លំហ & កាឡាក់ស៊ី' },
  { id: 'official-emerald', icon: '🌿', nameKh: 'ធម្មជាតិ & ត្បូងមរកត' },
  { id: 'sunrise-gold', icon: '⚡', nameKh: 'ថាមពល & ឥន្ទ្រីមាស' },
  { id: 'sunset', icon: '🌅', nameKh: 'អស្ដង្គត & រស្មីមាស' },
  { id: 'ocean-cyan', icon: '🌊', nameKh: 'មហាសមុទ្រ & ទឹកជ្រៅ' },
];

export const HomeTab: React.FC<HomeTabProps> = ({
  teacher,
  currentYear,
  onOpenYearManager,
  quizzes,
  activeSession,
  onStartLiveSession,
  onEndLiveSession,
  onPlayQuiz,
  onOpenProfile,
  onNavigateTab,
  onShowToast,
  onOpenTeacherNotices,
}) => {
  // Theme state
  const [selectedThemeId, setSelectedThemeId] = useState<BannerThemeId>(() => {
    const saved = getSavedBannerTheme();
    // Default to 'official-emerald' if not set, exactly like in the user's screenshot
    return saved || 'official-emerald';
  });

  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

  // Daily missions completion tracking in localStorage
  const [missionsStatus, setMissionsStatus] = useState<Record<string, boolean>>(() => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const saved = localStorage.getItem(`daily_missions_${today}`);
      return saved ? JSON.parse(saved) : { attendance: false, logbook: false, emis: false };
    } catch {
      return { attendance: false, logbook: false, emis: false };
    }
  });

  // Cycle to next theme
  const handleCycleTheme = () => {
    const currentIndex = THEME_OPTIONS.findIndex((t) => t.id === selectedThemeId);
    const nextIndex = (currentIndex + 1) % THEME_OPTIONS.length;
    const nextTheme = THEME_OPTIONS[nextIndex].id;
    setSelectedThemeId(nextTheme);
    saveBannerTheme(nextTheme);
    onShowToast(`បានប្តូរម៉ូដពណ៌ផ្ទាំង ៖ ${THEME_OPTIONS[nextIndex].nameKh}`);
  };

  const handleSelectTheme = (themeId: BannerThemeId) => {
    setSelectedThemeId(themeId);
    saveBannerTheme(themeId);
    const found = THEME_OPTIONS.find((t) => t.id === themeId);
    if (found) {
      onShowToast(`បានប្តូរម៉ូដពណ៌ផ្ទាំង ៖ ${found.nameKh}`);
    }
  };

  // Toggle mission completion for fun / gamification
  const handleToggleMission = (missionKey: string, targetTab: string) => {
    const today = new Date().toISOString().split('T')[0];
    const updated = { ...missionsStatus, [missionKey]: !missionsStatus[missionKey] };
    setMissionsStatus(updated);
    try {
      localStorage.setItem(`daily_missions_${today}`, JSON.stringify(updated));
    } catch {}

    if (!missionsStatus[missionKey]) {
      onShowToast('🎉 អបអរសាទរ! អ្នកបានសម្រេចបេសកកម្ម +300 XP!');
    }
    onNavigateTab(targetTab);
  };

  // Theme styling configurations
  const getThemeConfig = (id: string) => {
    switch (id) {
      case 'official-emerald':
        return {
          nameKh: 'ធម្មជាតិ & ត្បូងមរកត',
          icon: '🌿',
          containerBg: 'from-[#042d22] via-[#053a2c] to-[#021f17]',
          border: 'border-emerald-500/40 shadow-emerald-950/50',
          accentBadge: 'bg-emerald-900/80 border-emerald-400/40 text-emerald-200',
          noticePill: 'bg-[#03241b]/90 border-emerald-500/40 text-emerald-100',
          quickCard1: 'from-emerald-800 to-teal-850 border-emerald-400/30 text-white',
          quickCard2: 'from-purple-900 to-indigo-950 border-purple-400/30 text-white',
          quickCard3: 'from-teal-900 to-emerald-950 border-teal-400/30 text-white',
          missionBox: 'bg-[#021d15]/90 border-emerald-500/40',
          missionRow: 'bg-[#032a1f]/80 hover:bg-[#053729] border-emerald-500/30 text-white',
          ringColor: 'ring-emerald-400',
        };
      case 'royal_purple':
        return {
          nameKh: 'លំហ & កាឡាក់ស៊ី',
          icon: '🌌',
          containerBg: 'from-[#12082b] via-[#1a0c3d] to-[#0d051f]',
          border: 'border-purple-500/40 shadow-purple-950/50',
          accentBadge: 'bg-purple-900/80 border-purple-400/40 text-purple-200',
          noticePill: 'bg-[#150a30]/90 border-purple-500/40 text-purple-100',
          quickCard1: 'from-indigo-850 to-purple-900 border-indigo-400/30 text-white',
          quickCard2: 'from-fuchsia-900 to-pink-950 border-fuchsia-400/30 text-white',
          quickCard3: 'from-violet-900 to-purple-950 border-violet-400/30 text-white',
          missionBox: 'bg-[#0e0622]/90 border-purple-500/40',
          missionRow: 'bg-[#180d38]/80 hover:bg-[#23134f] border-purple-500/30 text-white',
          ringColor: 'ring-purple-400',
        };
      case 'sunrise-gold':
        return {
          nameKh: 'ថាមពល & ឥន្ទ្រីមាស',
          icon: '⚡',
          containerBg: 'from-[#2e1903] via-[#3a2004] to-[#1f1001]',
          border: 'border-amber-500/40 shadow-amber-950/50',
          accentBadge: 'bg-amber-900/80 border-amber-400/40 text-amber-200',
          noticePill: 'bg-[#241302]/90 border-amber-500/40 text-amber-100',
          quickCard1: 'from-amber-800 to-yellow-850 border-amber-400/30 text-white',
          quickCard2: 'from-orange-900 to-amber-950 border-orange-400/30 text-white',
          quickCard3: 'from-yellow-900 to-amber-950 border-yellow-400/30 text-white',
          missionBox: 'bg-[#1a0e02]/90 border-amber-500/40',
          missionRow: 'bg-[#291703]/80 hover:bg-[#382005] border-amber-500/30 text-white',
          ringColor: 'ring-amber-400',
        };
      case 'sunset':
        return {
          nameKh: 'អស្ដង្គត & រស្មីមាស',
          icon: '🌅',
          containerBg: 'from-[#330f1c] via-[#401223] to-[#200811]',
          border: 'border-rose-500/40 shadow-rose-950/50',
          accentBadge: 'bg-rose-900/80 border-rose-400/40 text-rose-200',
          noticePill: 'bg-[#260a14]/90 border-rose-500/40 text-rose-100',
          quickCard1: 'from-rose-800 to-pink-850 border-rose-400/30 text-white',
          quickCard2: 'from-orange-900 to-rose-950 border-orange-400/30 text-white',
          quickCard3: 'from-purple-900 to-rose-950 border-purple-400/30 text-white',
          missionBox: 'bg-[#1c060e]/90 border-rose-500/40',
          missionRow: 'bg-[#2e0e1a]/80 hover:bg-[#3d1323] border-rose-500/30 text-white',
          ringColor: 'ring-rose-400',
        };
      case 'ocean-cyan':
      default:
        return {
          nameKh: 'មហាសមុទ្រ & ទឹកជ្រៅ',
          icon: '🌊',
          containerBg: 'from-[#032338] via-[#042e4a] to-[#011826]',
          border: 'border-cyan-500/40 shadow-cyan-950/50',
          accentBadge: 'bg-cyan-900/80 border-cyan-400/40 text-cyan-200',
          noticePill: 'bg-[#021d2e]/90 border-cyan-500/40 text-cyan-100',
          quickCard1: 'from-cyan-800 to-sky-850 border-cyan-400/30 text-white',
          quickCard2: 'from-blue-900 to-indigo-950 border-blue-400/30 text-white',
          quickCard3: 'from-teal-900 to-cyan-950 border-teal-400/30 text-white',
          missionBox: 'bg-[#011624]/90 border-cyan-500/40',
          missionRow: 'bg-[#03273e]/80 hover:bg-[#053554] border-cyan-500/30 text-white',
          ringColor: 'ring-cyan-400',
        };
    }
  };

  const currentTheme = getThemeConfig(selectedThemeId);
  const teacherDisplayName = teacher?.name && teacher.name.trim() !== '' ? teacher.name : 'លោកគ្រូ ឌុក សុភ័ក្រ';

  return (
    <div className="space-y-6">
      {/* ========================================================
          ICONIC HERO BANNER (REPRODUCED AS IN USER SCREENSHOT IMG_4392)
         ======================================================== */}
      <div
        className={`bg-gradient-to-br ${currentTheme.containerBg} rounded-[32px] p-4 sm:p-7 text-white shadow-2xl border ${currentTheme.border} relative overflow-hidden transition-all duration-300`}
      >
        {/* Subtle dot matrix texture for high-tech aesthetic */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:20px_20px]"
          aria-hidden="true"
        />

        {/* Ambient colored lighting glows */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-teal-400/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* ----------------------------------------------------
              TOP CONTROLS ROW: [?] [Theme Name] | [Theme Selectors] [Auto 30m] [Refresh] ✨
             ---------------------------------------------------- */}
          <div className="flex items-center justify-between gap-2 flex-wrap pb-1">
            {/* Left: Help button and Active Theme title */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowHelpModal(true)}
                title="ជំនួយ និងព័ត៌មានលម្អិត"
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-amber-300 transition active:scale-95 cursor-pointer shadow-xs"
              >
                <HelpCircle className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-emerald-100 shadow-xs">
                <span className="text-sm">{currentTheme.icon}</span>
                <span className="font-bold tracking-tight">{currentTheme.nameKh}</span>
                <span className="text-emerald-300 ml-0.5">🌱</span>
              </div>
            </div>

            {/* Right: 5 Theme quick selectors + Auto 30m button + Refresh */}
            <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md p-1 rounded-2xl border border-white/15 shadow-inner">
              {/* 5 Theme Icon Buttons */}
              <div className="flex items-center gap-1 px-1">
                {THEME_OPTIONS.map((theme) => {
                  const isActive = selectedThemeId === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => handleSelectTheme(theme.id)}
                      title={theme.nameKh}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-sm transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-white text-slate-900 shadow-md scale-105 ring-2 ring-emerald-400 font-bold'
                          : 'hover:bg-white/15 text-white/80 hover:text-white'
                      }`}
                    >
                      {theme.icon}
                    </button>
                  );
                })}
              </div>

              {/* Auto 30m Pill Button */}
              <button
                type="button"
                onClick={() => {
                  const nextAuto = !isAutoRotate;
                  setIsAutoRotate(nextAuto);
                  onShowToast(nextAuto ? 'បានបើកប្តូរម៉ូដពណ៌ស្វ័យប្រវត្ត រៀងរាល់ 30 នាទី!' : 'បានបិទប្តូរម៉ូដពណ៌ស្វ័យប្រវត្ត!');
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-black transition active:scale-95 cursor-pointer shadow-xs ${
                  isAutoRotate
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : 'bg-amber-400/90 hover:bg-amber-400 text-slate-950 font-bold'
                }`}
              >
                <Clock className="w-3 h-3 text-slate-950" />
                <span>Auto 30m</span>
              </button>

              {/* Cycle / Refresh button */}
              <button
                type="button"
                onClick={handleCycleTheme}
                title="ប្តូរទៅម៉ូដបន្ទាប់ (Rotate Theme)"
                className="w-7 h-7 rounded-xl hover:bg-white/20 text-white/90 flex items-center justify-center transition active:scale-90 cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>

              {/* Decorative sparkle */}
              <Sparkles className="w-3.5 h-3.5 text-amber-300 ml-1 hidden sm:inline-block animate-pulse" />
            </div>
          </div>

          {/* ----------------------------------------------------
              ANNOUNCEMENT NOTICE TICKER PILL
             ---------------------------------------------------- */}
          <div
            onClick={onOpenTeacherNotices}
            className={`w-full px-3.5 py-2 rounded-full border flex items-center gap-2.5 text-xs sm:text-sm cursor-pointer hover:bg-black/40 transition shadow-inner backdrop-blur-md group ${currentTheme.noticePill}`}
            title="ចុចដើម្បីពិនិត្យសេចក្តីជូនដំណឹង និងប្រតិទិនឈប់សម្រាកផ្លូវការ"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping shrink-0" />
            <div className="flex items-center gap-1.5 font-bold text-amber-300 shrink-0">
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span>ជូនដំណឹង ៖</span>
            </div>
            <span className="text-white/40">|</span>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-white/90 text-xs font-medium group-hover:text-amber-200 transition">
                សល់ 5 ថ្ងៃទៀត (សប្ដាហ៍នេះ) ដល់ «ទិវាគ្រូបង្រៀន» &bull; ពិនិត្យកាលវិភាគឈប់សម្រាកមន្ត្រីរាជការ
              </p>
            </div>
          </div>

          {/* ----------------------------------------------------
              MAIN GREETING & TEACHER AVATAR BOX
             ---------------------------------------------------- */}
          <div className="pt-1">
            <h1 className="text-2xl sm:text-4xl font-black font-moul leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-normal">
              សួស្ដី {teacherDisplayName}
            </h1>
          </div>

          {/* Teacher Avatar Card with Camera Badge & Introductory Welcome */}
          <div className="flex items-start gap-4 pt-1">
            {/* Square Avatar with Golden Border & Camera Badge */}
            <div
              onClick={onOpenProfile}
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black/40 border-2 border-amber-400 p-1 flex items-center justify-center shrink-0 shadow-xl cursor-pointer hover:scale-105 transition group"
              title="ចុចដើម្បីប្តូររូបថត ឬកែប្រវត្តិរូបគ្រូ"
            >
              <div className="w-full h-full rounded-xl overflow-hidden flex items-center justify-center text-3xl sm:text-4xl">
                <TeacherAvatar avatar={teacher?.avatar} name={teacherDisplayName} fallbackIcon="👨‍🏫" />
              </div>
              {/* Camera icon circular badge */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md border-2 border-emerald-950 group-hover:rotate-12 transition">
                <Camera className="w-3 h-3 stroke-[2.5]" />
              </div>
            </div>

            {/* Description Text */}
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl font-medium pt-1">
              សូមស្វាគមន៍មកកាន់ប្រព័ន្ធគ្រប់គ្រងរដ្ឋបាលគ្រូបឋមសិក្សា! ស្រង់វត្តមានសិស្ស កត់ត្រាកិច្ចតែងការ បញ្ចូលពិន្ទុ និងរៀបចំស្ថិតិ EMIS ដើម្បីប្រមូល XP និងសម្រួលការងារបង្រៀន!
            </p>
          </div>

          {/* ----------------------------------------------------
              3 QUICK ACTION PILL CARDS: [រដ្ឋបាលទាំង៤] [បណ្ណាល័យ] [សិស្ស]
             ---------------------------------------------------- */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
            {/* 1. រដ្ឋបាលទាំង៤ */}
            <button
              type="button"
              onClick={() => onNavigateTab('admin')}
              className={`p-3 rounded-2xl bg-gradient-to-r ${currentTheme.quickCard1} border hover:scale-[1.02] transition active:scale-95 text-left flex items-center gap-3 shadow-lg cursor-pointer group`}
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-emerald-300 group-hover:scale-110 transition shadow-inner shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-black text-xs sm:text-sm text-white truncate">រដ្ឋបាលទាំង៤</h4>
                <p className="text-[11px] text-white/80 truncate">គ្រប់គ្រងការងាររដ្ឋបាល</p>
              </div>
            </button>

            {/* 2. បណ្ណាល័យ */}
            <button
              type="button"
              onClick={() => onNavigateTab('library')}
              className={`p-3 rounded-2xl bg-gradient-to-r ${currentTheme.quickCard2} border hover:scale-[1.02] transition active:scale-95 text-left flex items-center gap-3 shadow-lg cursor-pointer group`}
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-purple-300 group-hover:scale-110 transition shadow-inner shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-black text-xs sm:text-sm text-white truncate">បណ្ណាល័យ</h4>
                <p className="text-[11px] text-white/80 truncate">សៀវភៅ និងធនធាន</p>
              </div>
            </button>

            {/* 3. សិស្ស */}
            <button
              type="button"
              onClick={() => onNavigateTab('student_portal')}
              className={`p-3 rounded-2xl bg-gradient-to-r ${currentTheme.quickCard3} border hover:scale-[1.02] transition active:scale-95 text-left flex items-center gap-3 shadow-lg cursor-pointer group`}
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-teal-300 group-hover:scale-110 transition shadow-inner shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-black text-xs sm:text-sm text-white truncate">សិស្ស</h4>
                <p className="text-[11px] text-white/80 truncate">គ្រប់គ្រងសិស្ស...</p>
              </div>
            </button>
          </div>

          {/* ----------------------------------------------------
              DAILY MISSIONS CARD ("បេសកកម្មថ្ងៃនេះ ៖" +900 XP)
             ---------------------------------------------------- */}
          <div className={`mt-4 rounded-[26px] p-4 sm:p-5 border ${currentTheme.missionBox} shadow-xl space-y-3`}>
            {/* Mission Header */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full border-2 border-white/60 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                </div>
                <h3 className="font-black text-sm sm:text-base text-white tracking-wide">
                  បេសកកម្មថ្ងៃនេះ ៖
                </h3>
              </div>

              {/* +900 XP Badge */}
              <div className="px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1 shadow-md shadow-amber-500/20">
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                <span>+900 XP</span>
              </div>
            </div>

            {/* 3 Mission Items */}
            <div className="space-y-2 pt-1">
              {/* Mission 1: Online Attendance */}
              <button
                type="button"
                onClick={() => handleToggleMission('attendance', 'admin')}
                className={`w-full p-3 rounded-2xl border transition active:scale-[0.99] flex items-center justify-between gap-3 text-left cursor-pointer group ${currentTheme.missionRow}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border shrink-0 transition ${
                      missionsStatus.attendance
                        ? 'bg-amber-400 border-amber-300 text-slate-950'
                        : 'border-white/40 text-amber-300 group-hover:border-amber-400'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white/95 truncate">
                    ស្រង់វត្តមាន Online យ៉ាងតិច ១ លើក ...
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-white/80">
                    {missionsStatus.attendance ? '1/1' : '0/1'}
                  </span>
                  <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition" />
                </div>
              </button>

              {/* Mission 2: Lesson Plan Logbook */}
              <button
                type="button"
                onClick={() => handleToggleMission('logbook', 'admin')}
                className={`w-full p-3 rounded-2xl border transition active:scale-[0.99] flex items-center justify-between gap-3 text-left cursor-pointer group ${currentTheme.missionRow}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border shrink-0 transition ${
                      missionsStatus.logbook
                        ? 'bg-amber-400 border-amber-300 text-slate-950'
                        : 'border-white/40 text-amber-300 group-hover:border-amber-400'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white/95 truncate">
                    ពិនិត្យកូនសៀវភៅកិច្ចតែងការបង្រៀនប្រ...
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-white/80">
                    {missionsStatus.logbook ? '1/1' : '0/1'}
                  </span>
                  <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition" />
                </div>
              </button>

              {/* Mission 3: Primary EMIS Statistics */}
              <button
                type="button"
                onClick={() => handleToggleMission('emis', 'admin')}
                className={`w-full p-3 rounded-2xl border transition active:scale-[0.99] flex items-center justify-between gap-3 text-left cursor-pointer group ${currentTheme.missionRow}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border shrink-0 transition ${
                      missionsStatus.emis
                        ? 'bg-amber-400 border-amber-300 text-slate-950'
                        : 'border-white/40 text-amber-300 group-hover:border-amber-400'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white/95 truncate">
                    ស្រង់ និងផ្ទៀងផ្ទាត់ស្ថិតិអប់រំរបឋម (EMIS...
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-white/80">
                    {missionsStatus.emis ? '1/1' : '0/1'}
                  </span>
                  <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          LIVE QUIZ SESSION BANNER (IF ACTIVE)
         ======================================================== */}
      {activeSession.active && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-4 text-white flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
            <div>
              <p className="font-bold text-xs sm:text-sm">
                បន្ទប់ប្រឡងផ្ទាល់កំពុងដំណើរការ (Game PIN: {activeSession.pin})
              </p>
              <p className="text-[11px] text-emerald-100">{activeSession.quizTitle || 'សំណួរប្រឡង'}</p>
            </div>
          </div>
          <button
            onClick={onEndLiveSession}
            className="px-3.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition cursor-pointer"
          >
            បញ្ចប់បន្ទប់
          </button>
        </div>
      )}

      {/* ========================================================
          QUICK ACCESS FUNCTION SHORTCUTS
         ======================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <button
          onClick={() => onNavigateTab('admin')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md transition text-left space-y-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl group-hover:scale-110 transition">
            📋
          </div>
          <div>
            <h3 className="font-black text-xs sm:text-sm text-slate-900 dark:text-white">វត្តមាន & ពិន្ទុ</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">គ្រប់គ្រងសិស្សប្រចាំថ្ងៃ</p>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('create')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md transition text-left space-y-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl group-hover:scale-110 transition">
            ✍️
          </div>
          <div>
            <h3 className="font-black text-xs sm:text-sm text-slate-900 dark:text-white">បង្កើតសំណួរ QCM</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">វិញ្ញាសា និងលំហាត់</p>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('library')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md transition text-left space-y-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl group-hover:scale-110 transition">
            📚
          </div>
          <div>
            <h3 className="font-black text-xs sm:text-sm text-slate-900 dark:text-white">បណ្ណាល័យឌីជីថល</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">សៀវភៅពុម្ព & ឯកសារ</p>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('student_portal')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md transition text-left space-y-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl group-hover:scale-110 transition">
            🎓
          </div>
          <div>
            <h3 className="font-black text-xs sm:text-sm text-slate-900 dark:text-white">ផតថលសិស្ស</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">មើលពិន្ទុ និងរៀនសូត្រ</p>
          </div>
        </button>
      </div>

      {/* ========================================================
          FEATURED QUIZZES & TESTS
         ======================================================== */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-black text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>វិញ្ញាសា & សំណួរអនុវត្តក្នុងថ្នាក់</span>
          </h2>
          <button
            onClick={() => onNavigateTab('discover')}
            className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 cursor-pointer"
          >
            <span>មើលទាំងអស់</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quizzes.slice(0, 6).map((quiz) => (
            <div
              key={quiz.id}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100/80 transition flex items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                  {quiz.subject}
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1">
                  {quiz.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {quiz.questions?.length || quiz.questionCount || 0} សំណួរ
                </p>
              </div>
              <button
                onClick={() => onPlayQuiz(quiz)}
                className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition active:scale-95 cursor-pointer shrink-0"
                title="លេងសំណួរ"
              >
                <Play className="w-4 h-4 fill-white" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          HELP / GUIDE MODAL
         ======================================================== */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <HelpCircle className="w-5 h-5" />
                <h3 className="font-black text-base">ការណែនាំរចនាបថ & បេសកកម្ម</h3>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                <strong>🌿 រចនាបថបដា ៖</strong> លោកគ្រូ-អ្នកគ្រូអាចចុចលើរូបតំណាងពណ៌ខាងលើ (🌌 🌿 ⚡ 🌅 🌊) ដើម្បីផ្លាស់ប្តូររូបរាងផ្ទាំងបដាតាមចំណូលចិត្ត ឬជ្រើសរើស <em>Auto 30m</em> សម្រាប់ប្តូរពណ៌ស្វ័យប្រវត្តិ។
              </p>
              <p>
                <strong>✨ បេសកកម្ម & ពិន្ទុ XP ៖</strong> បំពេញបេសកកម្មប្រចាំថ្ងៃដូចជា ស្រង់វត្តមាន ពិនិត្យកិច្ចតែងការ និងស្រង់ស្ថិតិ ដើម្បីប្រមូលពិន្ទុ XP លើកទឹកចិត្តក្នុងការបង្រៀន។
              </p>
              <p>
                <strong>📷 កែប្រែរូបថត ៖</strong> ចុចលើប្រអប់រូបថតគ្រូដែលមានរូបម៉ាស៊ីនថត ដើម្បីកែសម្រួលព័ត៌មាន ឬប្តូររូបតំណាងគ្រូ។
              </p>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition cursor-pointer"
            >
              យល់ព្រម
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
