import React, { useState } from "react";
import { Merchant, Story, Product } from "../types";
import { Search, Heart, MapPin, Compass, ArrowRight, BookOpen, Star, Sparkles, Map } from "lucide-react";
import { motion } from "motion/react";

interface ExploreViewProps {
  merchants: Merchant[];
  featuredProducts: Product[];
  stories: Story[];
  onSelectMerchant: (merchantId: string) => void;
  onSelectProduct: (product: Product) => void;
  onSelectStory: (story: Story) => void;
  onNavigateToTab: (tab: "explore" | "merchants" | "stories" | "profile", searchVal?: string, enableMap?: boolean) => void;
}

export default function ExploreView({
  merchants,
  featuredProducts,
  stories,
  onSelectMerchant,
  onSelectProduct,
  onSelectStory,
  onNavigateToTab
}: ExploreViewProps) {
  const [searchVal, setSearchVal] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      onNavigateToTab("merchants", searchVal.trim());
    }
  };

  // Top 3 Rated Shops for Leaderboard
  const leaderboardShops = [...merchants]
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, 3);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. HERO BANNER WITH SEARCH */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-amber-900/10 h-[380px] bg-stone-900 flex flex-col justify-center px-6 md:px-12 text-white">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            src="https://www.pexels.com/zh-cn/download/video/36339390/"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-[0.65] scale-105 filter blur-[0.5px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-900/50 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="relative max-w-2xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/30 text-xs font-mono"
          >
            <Sparkles className="w-3.5 h-3.5" />
            手工匠心美食 · 寻味城市深处
          </motion.div>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight leading-tight">
              寻找您身边的 <br />
              <span className="text-amber-400">纯手工匠心美味</span>
            </h1>
            <p className="text-stone-300 text-sm md:text-base font-light">
              摒弃工业流水的浮躁，探秘大隐于市的窑烧麦香、古法老酱与手推面坊，重温温暖口腹的烟火本源。
            </p>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-white/95 rounded-2xl p-1.5 shadow-lg max-w-lg border border-amber-900/15">
            <div className="flex items-center px-3 flex-1">
              <Search className="w-5 h-5 text-stone-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="搜索手作欧包、馄饨、无添加辣酱..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full bg-transparent border-none outline-none py-2 text-stone-800 text-sm placeholder-stone-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-amber-700 hover:bg-amber-800 text-amber-50 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors cursor-pointer"
            >
              探寻找店
            </button>
          </form>
        </div>
      </div>

      {/* 2. 今日推荐特色 (Featured Custom Culinary Grid) */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-stone-200/60 pb-3">
          <div>
            <span className="text-xs font-mono text-amber-700 font-semibold uppercase tracking-wider block">Signature Crafts</span>
            <h2 className="text-2xl font-serif font-extrabold text-stone-950 flex items-center gap-2">
              今日推荐特色
            </h2>
          </div>
          <button
            onClick={() => onNavigateToTab("merchants")}
            className="group flex items-center gap-1 text-sm text-amber-700 hover:text-amber-900 font-medium transition-colors"
          >
            浏览全集
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Horizontal layout/Grid of 4 gorgeous products - 3D Flip Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              key={p.id}
              className="perspective-1000 w-full h-[370px] group"
            >
              <div className="w-full h-full relative transition-transform duration-[650ms] preserve-3d group-hover:[transform:rotateY(180deg)]">
                
                {/* 1. FRONT FACE */}
                <div 
                  onClick={() => onSelectProduct(p)}
                  className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-2xl overflow-hidden border border-stone-200/70 hover:border-amber-900/20 shadow-sm flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="relative h-44 overflow-hidden bg-stone-100">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 left-3 text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-black/60 text-amber-100 backdrop-blur-xs">
                        {p.category}
                      </span>
                      <div className="absolute top-3 right-3 bg-amber-500 text-stone-950 font-bold font-mono text-[10px] px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                        ★ <span>{p.rating}</span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="text-sm font-serif font-black text-stone-900 leading-snug">
                        {p.name}
                      </h3>
                      <p className="text-xs text-stone-500 font-mono flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-700" />
                        {p.artisan.split(" ")[0]}
                      </p>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-stone-100/60 mt-3 flex items-center justify-between">
                    <span className="text-sm font-bold font-mono text-amber-950">¥{p.price}<span className="text-[10px] text-stone-400 font-light"> /份</span></span>
                    <span className="text-xs text-amber-700 font-medium flex items-center gap-0.5">
                      手作详情
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* 2. BACK FACE */}
                <div 
                  onClick={() => onSelectProduct(p)}
                  className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-stone-900 border border-amber-900/30 text-stone-100 rounded-2xl p-5 flex flex-col justify-between shadow-xl cursor-pointer"
                >
                  <div className="space-y-4">
                    {/* Back Header */}
                    <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                      <span className="text-[10px] font-mono text-amber-400/90 tracking-widest font-semibold flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        匠艺漫志 STORY
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {p.artisan.split(" ")[0]}
                      </span>
                    </div>

                    {/* Back Content */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-serif font-extrabold text-amber-100">
                        {p.name}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-stone-400 font-mono">
                        <span>主理匠人:</span>
                        <span className="text-amber-200">{p.artisan}</span>
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed font-light">
                        {p.description}
                      </p>
                      <div className="pt-2.5">
                        <span className="text-[10px] inline-block px-2.5 py-0.5 rounded bg-amber-950/50 text-amber-300 border border-amber-500/20 font-sans">
                          纯手工 · 探秘本地烟火
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Back Footer & CTA */}
                  <div className="border-t border-stone-800 pt-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-500 block">物造价</span>
                      <span className="text-sm font-bold font-mono text-amber-400">¥{p.price}</span>
                    </div>
                    <button 
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-stone-950 text-xs font-bold rounded-lg transition-all flex items-center gap-1 shadow-md shadow-amber-950/20 cursor-pointer"
                    >
                      查阅详情
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. LEADERBOARD & INTERACTIVE MAP MOCK SPLIT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Leaderboard left */}
        <section className="lg:col-span-5 space-y-6">
          <div className="border-b border-stone-200/60 pb-3">
            <span className="text-xs font-mono text-amber-700 font-semibold uppercase tracking-wider block">Top Ranked Shops</span>
            <h2 className="text-2xl font-serif font-extrabold text-stone-950">
              高分好店排行榜
            </h2>
          </div>

          <div className="bg-white/90 rounded-2xl p-5 border border-stone-200/70 shadow-sm space-y-4">
            {leaderboardShops.map((shop, idx) => (
              <div
                key={shop.id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-transparent hover:border-amber-900/10 hover:bg-amber-50/20 transition-all group"
              >
                <div className="flex items-center gap-3">
                  {/* Rank Badge */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                    idx === 0 ? "bg-amber-500 text-stone-950 shadow-xs" :
                    idx === 1 ? "bg-stone-300 text-stone-800" :
                    "bg-orange-200 text-orange-900"
                  }`}>
                    {idx + 1}
                  </div>
                  {/* Shop Avatar Circle */}
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-stone-100 flex-shrink-0">
                    <img
                      src={shop.images[0]}
                      alt={shop.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                      {shop.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-medium">
                        {shop.category}
                      </span>
                      <div className="flex items-center gap-0.5 text-xs text-amber-500 font-mono">
                        <span>★</span>
                        <span className="text-stone-700">{shop.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectMerchant(shop.id)}
                  className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-medium rounded-lg border border-amber-900/10 transition-colors cursor-pointer flex items-center gap-1"
                >
                  进入店铺
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive map banner right */}
        <section className="lg:col-span-7 space-y-6">
          <div className="border-b border-stone-200/60 pb-3">
            <span className="text-xs font-mono text-amber-700 font-semibold uppercase tracking-wider block">Interactive Navigation</span>
            <h2 className="text-2xl font-serif font-extrabold text-stone-950 flex items-center justify-between">
              <span>手写美食版图</span>
              <span className="text-xs font-mono text-stone-400 font-light hidden sm:inline">Map Navigation</span>
            </h2>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-stone-200/80 shadow-md h-[270px] bg-stone-900 flex flex-col justify-between p-6 text-white group">
            {/* Styled Map Background simulation */}
            <div className="absolute inset-0 z-0 opacity-40">
              <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Simulated contour lines and paths */}
                <path d="M-10 120 C100 150 120 40 220 80 S340 160 410 110" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3"/>
                <path d="M-10 60 C80 90 200 10 250 120 S380 40 410 60" stroke="#f59e0b" strokeWidth="1.5" opacity="0.3"/>
                <path d="M120 -10 C140 80 80 150 200 210" stroke="#f59e0b" strokeWidth="0.8"/>
                {/* Pins and circles */}
                <circle cx="120" cy="90" r="4" fill="#a16207"/>
                <circle cx="120" cy="90" r="14" stroke="#a16207" strokeWidth="1" strokeDasharray="2 2" className="animate-spin" style={{ animationDuration: "12s" }}/>
                <circle cx="210" cy="50" r="5" fill="#f59e0b"/>
                <circle cx="320" cy="130" r="4" fill="#f59e0b"/>
                {/* Stylized road blocks */}
                <rect x="150" y="30" width="40" height="40" rx="3" fill="#ffffff" opacity="0.05" transform="rotate(15 150 30)"/>
                <rect x="280" y="100" width="50" height="30" rx="3" fill="#ffffff" opacity="0.05" transform="rotate(-10 280 100)"/>
              </svg>
            </div>

            {/* Content info */}
            <div className="relative z-10 space-y-2">
              <span className="text-xs text-amber-400 font-mono flex items-center gap-1">
                <Map className="w-3.5 h-3.5" />
                INTERACTIVE RADAR MAP
              </span>
              <h3 className="text-xl font-serif font-black">开启地理探索模式</h3>
              <p className="text-xs text-stone-300 max-w-sm font-sans leading-relaxed">
                苏记手擀面坊距离您仅1.2公里，林深果子铺散落在梧桐树院。直观对照地图点踩，快速发掘距离您最近的手制瑰宝，串联起一日匠心漫游线。
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex gap-2">
                <span className="text-[10px] px-2.5 py-1 bg-amber-500/20 text-amber-200 border border-amber-500/30 rounded-md font-mono">
                  500m微域
                </span>
                <span className="text-[10px] px-2.5 py-1 bg-amber-500/20 text-amber-200 border border-amber-500/30 rounded-md font-mono">
                  坐标打卡
                </span>
              </div>
              <button
                onClick={() => onNavigateToTab("merchants", "", true)}
                className="bg-amber-600 hover:bg-amber-700 text-amber-50 px-4.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-lg shadow-amber-950/40 flex items-center gap-1"
                id="enter-map-explore"
              >
                立即开启地图模式
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* 4. 探店故事 (Editorial Story Articles) */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-stone-200/60 pb-3">
          <div>
            <span className="text-xs font-mono text-amber-700 font-semibold uppercase tracking-wider block">Featured Chronicles</span>
            <h2 className="text-2xl font-serif font-extrabold text-stone-950 flex items-center gap-2">
              探店故事 / 匠人访谈
            </h2>
          </div>
          <button
            onClick={() => onNavigateToTab("stories")}
            className="group flex items-center gap-1 text-sm text-amber-700 hover:text-amber-900 font-medium transition-colors"
          >
            查阅全部采访
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Stories list layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => onSelectStory(story)}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200/70 p-5 shadow-xs hover:shadow-md cursor-pointer flex flex-col md:flex-row gap-5 transition-all"
            >
              {/* Image side */}
              <div className="w-full md:w-2/5 h-44 rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Text side */}
              <div className="flex flex-col justify-between py-1 flex-1">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-900/10 rounded">
                      {story.tag}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {story.readTime} 阅读
                    </span>
                  </div>
                  <h3 className="text-sm font-serif font-black text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed">
                    {story.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 text-[10px] font-mono text-stone-400 border-t border-stone-100/60 mt-2">
                  <span>{story.author}</span>
                  <span>{story.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
