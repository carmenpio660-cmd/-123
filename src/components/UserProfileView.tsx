import React, { useState } from "react";
import { Merchant, Review, ExplorationNote, Badge } from "../types";
import {
  Heart,
  MessageSquare,
  BookOpen,
  Settings,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  HeartCrack,
  Trash2,
  Lock,
  Globe,
  Plus,
  Compass,
  CheckCircle2,
  Info,
  Sliders,
  Mail,
  Smartphone
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface UserProfileViewProps {
  userStats: { footprintsCount: number; visitsCount: number; followersCount: number };
  favoritedMerchants: Merchant[];
  userReviews: Review[];
  explorationNotes: ExplorationNote[];
  onSelectMerchant: (merchantId: string) => void;
  onUnfavoriteMerchant: (merchantId: string) => void;
  onDeleteNote: (noteId: string) => void;
  onNavigateToPostNote: () => void;
}

export default function UserProfileView({
  userStats,
  favoritedMerchants,
  userReviews,
  explorationNotes,
  onSelectMerchant,
  onUnfavoriteMerchant,
  onDeleteNote,
  onNavigateToPostNote
}: UserProfileViewProps) {
  // Current active sub-module tab
  const [activeModule, setActiveModule] = useState<"favorites" | "reviews" | "notes">("favorites");

  // Settings & Help Modal overlays
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Profile preferences (simulated settings states)
  const [isPrivate, setIsPrivate] = useState(false);
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("zh-CN");

  // Form submission feedback helper
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Simple handlers to save local simulated setting preferences
  const handleSaveSettings = () => {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowSettings(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. TOP HERO PROFILE: Avocado Green (#7A9A61) and Cream White (#FAF8F2) Theme Overlay */}
      <section className="bg-gradient-to-br from-[#7A9A61] to-[#5C7A44] text-white rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
        {/* Decorative background vectors representing leaves/nature */}
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-x-12 -translate-y-12 pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-32 h-32 bg-[#FAF8F2]/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          {/* Avatar and Bio details */}
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-22 h-22 rounded-full overflow-hidden border-4 border-[#FAF8F2]/40 shadow-lg flex-shrink-0 bg-white">
              <img
                src="/src/assets/images/regenerated_image_1780057817394.jpg"
                alt="美食寻味"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row items-center gap-2.5 justify-center md:justify-start">
                <h1 className="text-2xl font-serif font-black tracking-wide text-[#FAF8F2]">美食寻味</h1>
                <span className="text-[10px] font-mono bg-[#FAF8F2] text-[#5C7A44] font-bold px-2.5 py-0.5 rounded-full border border-white/20 shadow-xs flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  领航探店官 L4
                </span>
              </div>
              <p className="text-xs text-[#FAF8F2]/90 font-light font-sans max-w-md antialiased leading-relaxed">
                “寻找散落在日常里的手作微光。倾心于刚出炉的红豆司康、薄透的三鲜馄饨与清晨热烈的骨汤白烟。”
              </p>
            </div>
          </div>

          {/* User statistics indicators */}
          <div className="flex gap-8 border-t md:border-t-0 md:border-l border-[#FAF8F2]/20 pt-5 md:pt-0 md:pl-8 text-center justify-around w-full md:w-auto">
            <div className="space-y-0.5">
              <span className="text-2xl font-mono font-black text-[#FAF8F2] block leading-none">{userStats.footprintsCount}</span>
              <span className="text-[9px] text-[#FAF8F2]/80 uppercase tracking-widest font-mono">足迹 Footprints</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xl font-mono font-black text-[#FAF8F2] block leading-none">{userStats.visitsCount}</span>
              <span className="text-[9px] text-[#FAF8F2]/80 uppercase tracking-widest font-mono">拜访 Visits</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xl font-mono font-black text-[#FAF8F2] block leading-none">{userStats.followersCount}</span>
              <span className="text-[9px] text-[#FAF8F2]/80 uppercase tracking-widest font-mono">粉丝 Followers</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE CORE ENTRANCE MODULES: Rounded Avocado cards inside beautiful Cream white framing */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Entrance module 1: 我的收藏 */}
        <div
          onClick={() => setActiveModule("favorites")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-xs ${
            activeModule === "favorites"
              ? "bg-[#eef3e9] border-[#7A9A61]/35 ring-1 ring-[#7A9A61]/15"
              : "bg-white border-stone-200/70 hover:bg-[#eef3e9]/30 hover:border-[#7A9A61]/15"
          }`}
          id="profile-mod-favorites"
        >
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
              activeModule === "favorites" ? "bg-[#7A9A61] text-[#FAF8F2]" : "bg-[#eef3e9]/60 text-[#5C7A44]"
            }`}>
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div className="text-left">
              <h3 className="text-xs font-serif font-black text-stone-900 leading-snug">我的收藏</h3>
              <p className="text-[10px] text-stone-400 font-mono mt-0.5">{favoritedMerchants.length} 家藏馆</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#5C7A44]/60" />
        </div>

        {/* Entrance module 2: 我的评价 */}
        <div
          onClick={() => setActiveModule("reviews")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-xs ${
            activeModule === "reviews"
              ? "bg-[#eef3e9] border-[#7A9A61]/35 ring-1 ring-[#7A9A61]/15"
              : "bg-white border-stone-200/70 hover:bg-[#eef3e9]/30 hover:border-[#7A9A61]/15"
          }`}
          id="profile-mod-reviews"
        >
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
              activeModule === "reviews" ? "bg-[#7A9A61] text-[#FAF8F2]" : "bg-[#eef3e9]/60 text-[#5C7A44]"
            }`}>
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-xs font-serif font-black text-stone-900 leading-snug">我的评价</h3>
              <p className="text-[10px] text-stone-400 font-mono mt-0.5">{userReviews.length} 条食评</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#5C7A44]/60" />
        </div>

        {/* Entrance module 3: 我的探店笔记 */}
        <div
          onClick={() => setActiveModule("notes")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-xs ${
            activeModule === "notes"
              ? "bg-[#eef3e9] border-[#7A9A61]/35 ring-1 ring-[#7A9A61]/15"
              : "bg-white border-stone-200/70 hover:bg-[#eef3e9]/30 hover:border-[#7A9A61]/15"
          }`}
          id="profile-mod-notes"
        >
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
              activeModule === "notes" ? "bg-[#7A9A61] text-[#FAF8F2]" : "bg-[#eef3e9]/60 text-[#5C7A44]"
            }`}>
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-xs font-serif font-black text-stone-900 leading-snug">我的探店笔记</h3>
              <p className="text-[10px] text-stone-400 font-mono mt-0.5">{explorationNotes.length} 篇手记</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#5C7A44]/60" />
        </div>
      </section>

      {/* 3. DYNAMIC TRANSITION LIST CONTENT FOR PRESENTS */}
      <div className="bg-[#FAF8F2] border border-[#7A9A61]/15 rounded-3xl p-5 md:p-6 space-y-5 shadow-xs">
        <AnimatePresence mode="wait">
          {/* 我的收藏 MODULE CONTENT */}
          {activeModule === "favorites" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              key="content-favorites"
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#7A9A61]/10">
                <span className="text-xs font-serif font-black text-stone-950">
                  我的收藏列表 ({favoritedMerchants.length}家)
                </span>
                <span className="text-[10px] text-[#5C7A44] font-mono">FAVORITE LIST</span>
              </div>

              {favoritedMerchants.length === 0 ? (
                <div className="py-12 text-center text-stone-400 space-y-2">
                  <Heart className="w-8 h-8 mx-auto opacity-40 text-stone-400" />
                  <p className="text-xs">暂时没有收藏的手工坊，去街区地图逛逛吧</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                  {favoritedMerchants.map((shop) => (
                    <div
                      key={shop.id}
                      className="bg-white rounded-xl overflow-hidden border border-stone-200/80 hover:border-[#7A9A61]/20 p-3 shadow-3xs flex flex-col justify-between group"
                    >
                      <div className="cursor-pointer" onClick={() => onSelectMerchant(shop.id)}>
                        <div className="h-28 rounded-lg bg-stone-100 overflow-hidden relative">
                          <img
                            src={shop.images[0]}
                            alt={shop.name}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute top-2 left-2 text-[9px] bg-black/60 text-amber-50 px-1.5 py-0.5 rounded font-mono">
                            {shop.category}
                          </span>
                        </div>
                        <h4 className="text-xs font-serif font-black text-stone-900 mt-2 group-hover:text-[#5C7A44]">
                          {shop.name}
                        </h4>
                        <p className="text-[10px] text-stone-400 mt-1 line-clamp-1">{shop.address}</p>
                      </div>

                      <div className="flex items-center justify-between border-t border-stone-100 pt-2.5 mt-2.5">
                        <span className="text-[9px] font-mono text-stone-500">★ {shop.rating} ({shop.reviewCount}评)</span>
                        <button
                          onClick={() => onUnfavoriteMerchant(shop.id)}
                          className="text-[9px] text-rose-600 hover:text-rose-800 font-bold flex items-center gap-0.5 cursor-pointer"
                        >
                          <HeartCrack className="w-3 h-3" />
                          移出收藏
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* 我的评价 MODULE CONTENT */}
          {activeModule === "reviews" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              key="content-reviews"
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#7A9A61]/10">
                <span className="text-xs font-serif font-black text-stone-950">
                  我的历史评价 ({userReviews.length}条)
                </span>
                <span className="text-[10px] text-[#5C7A44] font-mono">REVIEW CHRONICLES</span>
              </div>

              {userReviews.length === 0 ? (
                <div className="py-12 text-center text-stone-400 space-y-2">
                  <MessageSquare className="w-8 h-8 mx-auto opacity-40 text-stone-400" />
                  <p className="text-xs">暂时还没有发布过食评哦</p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {userReviews.map((rev) => (
                    <div key={rev.id} className="bg-white rounded-xl p-4 border border-stone-200/80 shadow-3xs space-y-2.5">
                      <div className="flex items-center justify-between pb-2 border-b border-stone-150/50">
                        <div>
                          <h4 className="text-xs font-serif font-black text-stone-900">
                            已评：{rev.merchantName}
                          </h4>
                          <span className="text-[9px] text-stone-400 font-mono">{rev.date}</span>
                        </div>
                        <div className="bg-[#eef3e9] border border-[#7A9A61]/20 text-[#5C7A44] font-mono font-black text-[10px] px-2 py-0.5 rounded-lg flex items-center gap-0.5">
                          ★ <span>{rev.rating.overall}分</span>
                        </div>
                      </div>

                      <p className="text-xs text-stone-700 leading-relaxed whitespace-pre-wrap">
                        {rev.content}
                      </p>

                      {rev.images && rev.images.length > 0 && (
                        <div className="flex gap-2 py-0.5 overflow-x-auto no-scrollbar">
                          {rev.images.map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt="review clip"
                              className="w-18 h-18 rounded-lg object-cover border border-stone-100 flex-shrink-0"
                              referrerPolicy="no-referrer"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* 我的探店笔记 MODULE CONTENT */}
          {activeModule === "notes" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              key="content-notes"
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#7A9A61]/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-serif font-black text-stone-950">
                    我的探店随笔手记 ({explorationNotes.length}篇)
                  </span>
                  <button
                    onClick={onNavigateToPostNote}
                    className="px-2 py-0.5 bg-[#7A9A61] hover:bg-[#5C7A44] text-[#FAF8F2] text-[9px] font-bold rounded-md flex items-center gap-0.5 transition-colors"
                  >
                    <Plus className="w-2.5 h-2.5" />
                    写笔记
                  </button>
                </div>
                <span className="text-[10px] text-[#5C7A44] font-mono">EXPLORER NOTES</span>
              </div>

              {explorationNotes.length === 0 ? (
                <div className="py-12 text-center text-stone-400 space-y-4">
                  <BookOpen className="w-8 h-8 mx-auto opacity-40 text-stone-400" />
                  <p className="text-xs">还没有撰写过探店笔记，点击上方按钮撰写人生首篇吧！</p>
                  <button
                    onClick={onNavigateToPostNote}
                    className="px-4 py-2 bg-[#7A9A61] hover:bg-[#5C7A44] text-[#FAF8F2] text-xs font-semibold rounded-xl inline-flex items-center gap-1 transition-colors mx-auto shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    撰写精品探店笔记
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {explorationNotes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-white rounded-xl border border-stone-200 p-4 shadow-3xs flex flex-col justify-between"
                    >
                      <div>
                        {note.images && note.images.length > 0 && (
                          <div className="h-32 rounded-lg bg-stone-100 overflow-hidden mb-3">
                            <img
                              src={note.images[0]}
                              alt={note.title}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}
                        <span className="text-[9px] text-[#5C7A44] font-bold font-mono tracking-wide bg-[#eef3e9] px-2 py-0.5 rounded">
                          #{note.category}
                        </span>
                        <h3 className="text-xs font-serif font-black text-stone-900 mt-2 line-clamp-1 leading-snug">
                          {note.title}
                        </h3>
                        <p className="text-[11px] text-stone-500 line-clamp-3 leading-relaxed mt-1">
                          {note.content}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          <span className="text-[8px] px-1.5 py-0.5 bg-stone-50 text-stone-400 rounded">口味: {note.tags.taste}</span>
                          <span className="text-[8px] px-1.5 py-0.5 bg-stone-50 text-stone-400 rounded">环境: {note.tags.ambience}</span>
                          <span className="text-[8px] px-1.5 py-0.5 bg-stone-50 text-stone-400 rounded">服务: {note.tags.service}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-stone-100 pt-2.5 mt-3 text-[9px] font-mono text-stone-400">
                        <span className="truncate max-w-[130px]">📍 {note.location.split(" ")[0]}</span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span>❤️ {note.likes}</span>
                          <button
                            onClick={() => onDeleteNote(note.id)}
                            className="text-stone-300 hover:text-rose-600 transition-colors cursor-pointer"
                            id={`delete-note-${note.id}`}
                            title="删除笔记"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. SETTINGS & HELP CENTER SHORTCUT BAR */}
      <section className="bg-white border border-stone-200/80 rounded-2xl p-4 shadow-3xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#5C7A44]" />
          <span className="text-xs font-serif font-bold text-stone-900">
            个人助理控制台 (User Management Tools)
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
          {/* Settings entry */}
          <button
            onClick={() => setShowSettings(true)}
            className="flex-1 sm:flex-initial px-4 py-2 bg-[#eef3e9] hover:bg-[#7A9A61]/25 text-[#5C7A44] hover:text-[#3B5323] text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            id="profile-settings-btn"
          >
            <Settings className="w-4 h-4" />
            <span>首选项设置 (Settings)</span>
          </button>

          {/* Help Center entry */}
          <button
            onClick={() => setShowHelp(true)}
            className="flex-1 sm:flex-initial px-4 py-2 bg-stone-50 hover:bg-stone-100 text-stone-600 hover:text-stone-900 border border-stone-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            id="profile-help-btn"
          >
            <HelpCircle className="w-4 h-4" />
            <span>帮助与客服 (Help Center)</span>
          </button>
        </div>
      </section>

      {/* 5. MODAL OVERLAY: SETTINGS首选项 (Avocado & Cream themed settings panel) */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="absolute inset-0" onClick={() => setShowSettings(false)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-[#FAF8F2] border border-[#7A9A61]/35 rounded-3xl p-6 shadow-2xl w-full max-w-md z-10 text-stone-900 space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#7A9A61]/10">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-[#5C7A44]" />
                  <h3 className="text-sm font-serif font-black text-stone-950">
                    首选项与系统设置 (User Preferences)
                  </h3>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-stone-400 hover:text-stone-700 font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Preferences forms list */}
              <div className="space-y-4">
                {/* Simulated Private Mode */}
                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-stone-150">
                  <div className="space-y-0.5">
                    <span className="text-xs font-serif font-black text-stone-900 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-[#5C7A44]" />
                      隐私保护模式
                    </span>
                    <p className="text-[10px] text-stone-400">开启后将隐藏您的探店笔记与食评，仅自己可见</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="w-4 h-4 text-[#7A9A61] rounded border-[#7A9A61] focus:ring-[#7A9A61]"
                  />
                </div>

                {/* Simulated Notifications */}
                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-stone-150">
                  <div className="space-y-0.5">
                    <span className="text-xs font-serif font-black text-stone-900">
                      推送通知服务
                    </span>
                    <p className="text-[10px] text-stone-400">开启后将实时接收关注匠人的每日限量发售提醒</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifEnabled}
                    onChange={(e) => setNotifEnabled(e.target.checked)}
                    className="w-4 h-4 text-[#7A9A61] rounded border-[#7A9A61] focus:ring-[#7A9A61]"
                  />
                </div>

                {/* Simulated Language selector */}
                <div className="p-3 bg-white rounded-xl border border-stone-150 space-y-2">
                  <span className="text-xs font-serif font-black text-stone-900 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-[#5C7A44]" />
                    系统首选语言
                  </span>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-stone-200 outline-none focus:ring-1 focus:ring-[#7A9A61] bg-stone-50"
                  >
                    <option value="zh-CN">简体中文 (Simplified Chinese)</option>
                    <option value="en-US">English (US Edition)</option>
                    <option value="ja-JP">日本語 (Japanese Core)</option>
                  </select>
                </div>
              </div>

              {/* Save outcomes response bar */}
              {saveSuccess && (
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-850 border border-emerald-150 p-2.5 rounded-xl text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>配置已落盘，系统配置同步成功！</span>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSaveSettings}
                  className="flex-1 py-2 bg-[#7A9A61] hover:bg-[#5C7A44] text-[#FAF8F2] text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  应用修改并发包
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="py-2 px-4 bg-white hover:bg-stone-50 text-stone-600 border border-stone-200 text-xs font-bold rounded-xl"
                >
                  取消
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. MODAL OVERLAY: HELP CENTER客服 (Cream & Green theme help center panels) */}
      <AnimatePresence>
        {showHelp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="absolute inset-0" onClick={() => setShowHelp(false)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-[#FAF8F2] border border-[#7A9A61]/35 rounded-3xl p-6 shadow-2xl w-full max-w-md z-10 text-stone-900 space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#7A9A61]/10">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#5C7A44]" />
                  <h3 className="text-sm font-serif font-black text-stone-950">
                    探店助手帮助中心 (Artisanal Support)
                  </h3>
                </div>
                <button
                  onClick={() => setShowHelp(false)}
                  className="text-stone-400 hover:text-stone-700 font-bold"
                >
                  ✕
                </button>
              </div>

              {/* FAQs accordion and instant assistance links */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-serif font-black text-stone-900 block">常见疑难问题 FAQs:</span>
                  <div className="space-y-2 text-[11px] text-stone-600 leading-relaxed max-h-48 overflow-y-auto pr-1">
                    <div className="p-2.5 bg-white border border-stone-150 rounded-lg space-y-1">
                      <p className="font-bold text-stone-800">Q1: 怎么获得“探店官级别提升”？</p>
                      <p className="text-stone-500">A: 多在系统中收藏心仪手艺商铺，撰写客观详尽的“美味评价”及分享“探店笔记”，经验值会随发布频率和互动量阶梯成长哦。</p>
                    </div>
                    <div className="p-2.5 bg-white border border-stone-150 rounded-lg space-y-1">
                      <p className="font-bold text-stone-800">Q2: 这里的商家地址都是真实的吗？</p>
                      <p className="text-stone-500">A: 绝对精准！所有手制小店均精选自上海巨鹿路、徐汇等核心特色街区，支持实地探索寻味。</p>
                    </div>
                    <div className="p-2.5 bg-white border border-stone-150 rounded-lg space-y-1">
                      <p className="font-bold text-stone-800">Q3: “市集猎人”徽章怎么解锁？</p>
                      <p className="text-stone-500">A: 进入探店故事板块阅读匠人们背后的坚持，解锁微光，就能自豪地亮出“市集猎人”头衔！</p>
                    </div>
                  </div>
                </div>

                {/* Instant support details */}
                <div className="space-y-2 border-t border-[#7A9A61]/10 pt-3">
                  <span className="text-xs font-serif font-black text-stone-900 block">联络人工客户服务 (Contact Handcrafted Support):</span>
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-stone-600">
                    <div className="p-2.5 bg-white border border-stone-150 rounded-lg flex flex-col items-center gap-1">
                      <Mail className="w-4 h-4 text-[#5C7A44]" />
                      <span className="font-bold">服务邮件服务</span>
                      <span className="text-stone-400 hover:underline">support@artisanal.org</span>
                    </div>
                    <div className="p-2.5 bg-white border border-stone-150 rounded-lg flex flex-col items-center gap-1">
                      <Smartphone className="w-4 h-4 text-[#5C7A44]" />
                      <span className="font-bold">全国热线电话</span>
                      <span className="text-stone-400">400-820-2026</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowHelp(false)}
                  className="w-full py-2 bg-[#7A9A61] text-[#FAF8F2] text-xs font-bold rounded-xl transition-colors"
                >
                  我已知晓并关闭
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
