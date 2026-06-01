import React, { useState, useMemo } from "react";
import { Merchant } from "../types";
import { MapPin, Search, Star, MessageSquare, Compass, Eye, Filter, Sparkles, Map, Grid } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MerchantsViewProps {
  merchants: Merchant[];
  onSelectMerchant: (merchantId: string) => void;
  initialSearchQuery?: string;
  initialEnableMap?: boolean;
}

export default function MerchantsView({
  merchants,
  onSelectMerchant,
  initialSearchQuery = "",
  initialEnableMap = false
}: MerchantsViewProps) {
  // Search state
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  // Category slider filter option
  const [activeCategory, setActiveCategory] = useState("全部");
  // Toggle split map mode
  const [mapModeEnabled, setMapModeEnabled] = useState(initialEnableMap);

  // Filters state
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [distanceLimit, setDistanceLimit] = useState("全城"); // "500m" | "1km" | "3km" | "全城"
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedAmbience, setSelectedAmbience] = useState<string[]>([]);

  // Hover state for interactive SVG map point highlighting
  const [hoveredMerchantId, setHoveredMerchantId] = useState<string | null>(null);

  // Category tags row options
  const categories = ["全部", "热门推荐", "非遗传承", "山野寻味", "小众探秘", "亲子时光", "午后茶点", "露天空间", "宠物友好"];

  // Sidebar filter collections
  const cuisines = ["手工烘焙", "有机素食", "传统小吃", "匠心私厨", "茶事琴房", "非遗工坊", "街角糖铺", "私房膳食"];
  const dietaryPrefs = ["纯素食", "无麸质"];
  const ambiences = ["静谧小憩", "露天聚会", "传统面点", "清晨阳光"];

  const toggleCuisine = (c: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(c) ? prev.filter((item) => item !== c) : [...prev, c]
    );
  };

  const toggleDietary = (d: string) => {
    setSelectedDietary((prev) =>
      prev.includes(d) ? prev.filter((item) => item !== d) : [...prev, d]
    );
  };

  const toggleAmbience = (a: string) => {
    setSelectedAmbience((prev) =>
      prev.includes(a) ? prev.filter((item) => item !== a) : [...prev, a]
    );
  };

  // Reset all sidebar options
  const handleClearFilters = () => {
    setOnlyPromo(false);
    setDistanceLimit("全城");
    setSelectedCuisines([]);
    setSelectedDietary([]);
    setSelectedAmbience([]);
    setActiveCategory("全部");
    setSearchQuery("");
  };

  // Live filter computation
  const filteredMerchants = useMemo(() => {
    return merchants.filter((m) => {
      // 1. Text Search Box (Name, Address, Subtitle, description)
      if (searchQuery.trim()) {
        const text = searchQuery.toLowerCase();
        const matchesText =
          m.name.toLowerCase().includes(text) ||
          m.subtitle.toLowerCase().includes(text) ||
          m.address.toLowerCase().includes(text) ||
          m.description.toLowerCase().includes(text) ||
          m.tags.some((t) => t.toLowerCase().includes(text));
        if (!matchesText) return false;
      }

      // 2. Horizontal Categories Row
      if (activeCategory !== "全部") {
        if (activeCategory === "热门推荐" && m.rating < 4.8) return false;
        if (activeCategory === "非遗传承" && !m.tags.includes("#非遗玫瑰") && !m.category.includes("非遗")) return false;
        if (activeCategory === "山野寻味" && !m.tags.some(t => t.includes("山") || t.includes("林") || t.includes("野"))) return false;
        if (activeCategory === "小众探秘" && m.reviewCount > 200) return false;
        if (activeCategory === "亲子时光" && !m.features.includes("传统面点")) return false; // simulated matching
        if (activeCategory === "午后茶点" && !m.features.includes("午后茶点") && !m.features.includes("静谧小憩")) return false;
        if (activeCategory === "露天空间" && !m.features.includes("露天空间")) return false;
        if (activeCategory === "宠物友好" && !m.features.includes("宠物友好")) return false;
      }

      // 3. Promotion status
      if (onlyPromo && !m.features.includes("限时优惠")) return false;

      // 4. Distance limitation (simulated sorting)
      if (distanceLimit !== "全城") {
        const distNum = parseFloat(m.distance); // "500m" -> 0.5, "1.2km" -> 1.2
        const isKm = m.distance.includes("km");
        const valInKm = isKm ? distNum : distNum / 1000;

        if (distanceLimit === "500m" && valInKm > 0.5) return false;
        if (distanceLimit === "1km" && valInKm > 1.0) return false;
        if (distanceLimit === "3km" && valInKm > 3.0) return false;
      }

      // 5. Cuisine Filters Checklist
      if (selectedCuisines.length > 0 && !selectedCuisines.includes(m.category)) {
        return false;
      }

      // 6. Food dietary Checklist
      if (selectedDietary.length > 0) {
        const matchesDiet = selectedDietary.every((d) => m.features.includes(d));
        if (!matchesDiet) return false;
      }

      // 7. Ambient Environment Checklist
      if (selectedAmbience.length > 0) {
        const matchesAmbi = selectedAmbience.every((a) => m.features.includes(a));
        if (!matchesAmbi) return false;
      }

      return true;
    });
  }, [merchants, searchQuery, activeCategory, onlyPromo, distanceLimit, selectedCuisines, selectedDietary, selectedAmbience]);

  return (
    <div className="space-y-6 pb-16">
      {/* 1. HORIZONTAL TOP BAR CATEGORIES */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200/60 pb-4">
        {/* Horizontal scroll selection header */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer transition-colors whitespace-nowrap border ${
                activeCategory === cat
                  ? "bg-amber-900 border-amber-950 text-amber-50 shadow-sm"
                  : "bg-white border-stone-250 text-stone-600 hover:bg-stone-50"
              }`}
              id={`cat-${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Action controls (Search box + Map View Toggle) */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search box inside exploration page */}
          <div className="flex items-center bg-white px-3 py-1.5 rounded-xl border border-stone-200/80 shadow-xs flex-1 md:w-64">
            <Search className="w-4 h-4 text-stone-400 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="搜索精致手作商户..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs text-stone-800 bg-transparent border-none outline-none focus:outline-none placeholder-stone-400"
            />
          </div>

          {/* Toggle Map Mode button */}
          <button
            onClick={() => setMapModeEnabled(!mapModeEnabled)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
              mapModeEnabled
                ? "bg-amber-700 text-amber-50 border-amber-800 shadow-sm"
                : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
            }`}
            id="toggle-map-button"
          >
            {mapModeEnabled ? <Grid className="w-3.5 h-3.5" /> : <Map className="w-3.5 h-3.5" />}
            <span>{mapModeEnabled ? "网格视图" : "地图模式"}</span>
          </button>
        </div>
      </div>

      {/* 2. BODY GRID CONTAINER WITH SIDEBAR FILTERS AND RENDERED MATCHES */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 bg-white border border-stone-200/70 rounded-2xl p-5 space-y-6 flex-shrink-0">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="text-sm font-serif font-bold text-stone-900 flex items-center gap-1.5 uppercase tracking-wide">
              <Filter className="w-4 h-4 text-amber-800" />
              筛选条件
            </h3>
            <button
              onClick={handleClearFilters}
              className="text-[10px] font-mono text-amber-700 hover:text-amber-950 font-semibold cursor-pointer underline"
            >
              清空
            </button>
          </div>

          {/* Promo */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-100/60">
            <label htmlFor="promo-flag" className="text-xs text-stone-700 font-medium cursor-pointer">
              限时优惠专享
            </label>
            <input
              type="checkbox"
              id="promo-flag"
              checked={onlyPromo}
              onChange={(e) => setOnlyPromo(e.target.checked)}
              className="w-4 h-4 rounded text-amber-700 border-stone-300 focus:ring-amber-500 accent-amber-700 cursor-pointer"
            />
          </div>

          {/* Distance */}
          <div className="space-y-2 pb-4 border-b border-stone-100/60">
            <h4 className="text-xs text-stone-500 font-bold font-serif uppercase">附近距离</h4>
            <div className="grid grid-cols-4 gap-1 bg-stone-50 p-1 rounded-lg border border-stone-200/60">
              {["500m", "1km", "3km", "全城"].map((distOption) => (
                <button
                  key={distOption}
                  onClick={() => setDistanceLimit(distOption)}
                  className={`py-1 text-[10px] rounded-md font-medium font-mono cursor-pointer transition-colors ${
                    distanceLimit === distOption
                      ? "bg-white text-stone-900 shadow-xs font-bold"
                      : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  {distOption}
                </button>
              ))}
            </div>
          </div>

          {/* Cuisine Categories */}
          <div className="space-y-2 pb-4 border-b border-stone-100/60">
            <h4 className="text-xs text-stone-500 font-bold font-serif uppercase">菜系分类</h4>
            <div className="space-y-1.5">
              {cuisines.map((c) => (
                <label key={c} className="flex items-center gap-2 text-xs text-stone-600 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCuisines.includes(c)}
                    onChange={() => toggleCuisine(c)}
                    className="w-3.5 h-3.5 rounded text-amber-700 border-stone-300 accent-amber-700 cursor-pointer"
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Dietary Prefs */}
          <div className="space-y-2 pb-4 border-b border-stone-100/60">
            <h4 className="text-xs text-stone-500 font-bold font-serif uppercase">饮食偏好</h4>
            <div className="space-y-1.5">
              {dietaryPrefs.map((d) => (
                <label key={d} className="flex items-center gap-2 text-xs text-stone-600 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDietary.includes(d)}
                    onChange={() => toggleDietary(d)}
                    className="w-3.5 h-3.5 rounded text-amber-700 border-stone-300 accent-amber-700 cursor-pointer"
                  />
                  <span>{d}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Ambient environment */}
          <div className="space-y-2">
            <h4 className="text-xs text-stone-500 font-bold font-serif uppercase">氛围环境</h4>
            <div className="space-y-1.5">
              {ambiences.map((a) => (
                <label key={a} className="flex items-center gap-2 text-xs text-stone-600 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAmbience.includes(a)}
                    onChange={() => toggleAmbience(a)}
                    className="w-3.5 h-3.5 rounded text-amber-700 border-stone-300 accent-amber-700 cursor-pointer"
                  />
                  <span>{a}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Results Container + Split Map Layout */}
        <div className="flex-1 flex flex-col md:flex-row gap-6 w-full">
          {/* Main List Section */}
          <div className={`flex-1 space-y-4 ${mapModeEnabled ? "md:w-3/5" : "w-full"}`}>
            <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
              <span>检索出 {filteredMerchants.length} 家匠人店面</span>
              {filteredMerchants.length > 0 && <span className="text-amber-800 font-medium font-sans">点击可进入详情</span>}
            </div>

            {/* Zero state */}
            {filteredMerchants.length === 0 && (
              <div className="bg-white rounded-3xl p-12 border border-stone-200/50 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto">
                  <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: "25s" }} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-stone-900">未检索到符合条件的匠人店铺</h4>
                  <p className="text-xs text-stone-400">
                    可以试着清空筛选项, 或者调大搜索半径重新看一看吧。
                  </p>
                </div>
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2 bg-amber-700 text-amber-50 rounded-xl text-xs font-semibold hover:bg-amber-850 cursor-pointer transition-colors"
                >
                  重置筛选条件
                </button>
              </div>
            )}

            {/* Merchant Cards */}
            <div className={`grid gap-5 ${mapModeEnabled ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
              {filteredMerchants.map((shop) => {
                const isHovered = hoveredMerchantId === shop.id;
                return (
                  <motion.div
                    key={shop.id}
                    onMouseEnter={() => setHoveredMerchantId(shop.id)}
                    onMouseLeave={() => setHoveredMerchantId(null)}
                    onClick={() => onSelectMerchant(shop.id)}
                    layout
                    className={`bg-white rounded-2xl overflow-hidden border transition-all cursor-pointer shadow-sm group flex flex-col justify-between ${
                      isHovered ? "border-amber-900/40 shadow-md ring-1 ring-amber-900/10" : "border-stone-200/80 hover:border-amber-900/20"
                    }`}
                  >
                    <div>
                      {/* Image header banner */}
                      <div className="relative h-44 bg-stone-100 overflow-hidden">
                        <img
                          src={shop.images[0]}
                          alt={shop.name}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <span className="text-[10px] bg-black/60 text-amber-50 px-2 py-0.5 rounded backdrop-blur-xs font-mono">
                            {shop.category}
                          </span>
                          {!shop.isOpen && (
                            <span className="text-[10px] bg-stone-500/90 text-stone-50 px-2 py-0.5 rounded backdrop-blur-xs font-mono">
                              休息中
                            </span>
                          )}
                        </div>
                        {/* Rating point */}
                        <div className="absolute bottom-3 right-3 bg-stone-900/90 text-amber-400 font-bold font-mono text-xs px-2 py-1 rounded-lg shadow flex items-center gap-1.5">
                          <span>★</span>
                          <span className="text-stone-50">{shop.rating}</span>
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-serif font-black text-stone-950 group-hover:text-amber-850 transition-colors">
                            {shop.name}
                          </h3>
                          <span className="text-[10px] font-mono text-stone-400">
                            {shop.distance} · 人均 ¥{shop.pricePerCapita}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 font-light font-sans line-clamp-2">
                          {shop.subtitle}
                        </p>

                        {/* Feature mini tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {shop.tags.slice(0, 3).map((tg) => (
                            <span
                              key={tg}
                              className="text-[9px] px-2 py-0.5 bg-stone-100 hover:bg-amber-50 text-stone-500 hover:text-amber-950 rounded-md font-mono"
                            >
                              {tg}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0 border-t border-stone-100/60 mt-2 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-stone-400 flex items-center gap-1 leading-none">
                        <MessageSquare className="w-3 h-3 text-stone-300" />
                        {shop.reviewCount} 余评价
                      </span>
                      <span className="text-[10px] font-semibold text-amber-700 flex items-center gap-0.5 font-mono">
                        进入店铺详情
                        <Eye className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Interactive Split Map simulation */}
          {mapModeEnabled && (
            <div className="w-full md:w-2/5 h-[420px] md:h-[500px] bg-stone-950 rounded-2xl border border-amber-900/20 shadow-md flex-shrink-0 relative overflow-hidden flex flex-col justify-between p-4 text-white">
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none" />

              {/* Styled Mock SVG Map Streets and Pin Elements */}
              <div className="absolute inset-0 z-0">
                <svg className="w-full h-full" viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Styled roads resembling Shanghai French Concession grids */}
                  <path d="M50 0 L50 400" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
                  <path d="M150 0 L150 400" stroke="#f59e0b" strokeWidth="1.5" opacity="0.15" />
                  <path d="M250 0 L250 400" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />

                  <path d="M0 80 L300 80" stroke="#f59e0b" strokeWidth="1.5" opacity="0.15" />
                  <path d="M0 240 L300 240" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 5" opacity="0.25" />
                  <path d="M0 320 L300 320" stroke="#f59e0b" strokeWidth="1.5" opacity="0.2" />

                  {/* Curving green parklands */}
                  <path d="M0 160 C120 180 180 120 300 140" stroke="#059669" strokeWidth="4" opacity="0.1" />

                  {/* Coordinate grid overlays */}
                  <line x1="0" y1="40" x2="300" y2="40" stroke="#ffffff" strokeWidth="0.5" opacity="0.05" />
                  <line x1="0" y1="180" x2="300" y2="180" stroke="#ffffff" strokeWidth="0.5" opacity="0.05" />
                  <line x1="100" y1="0" x2="100" y2="400" stroke="#ffffff" strokeWidth="0.5" opacity="0.05" />
                  <line x1="200" y1="0" x2="200" y2="400" stroke="#ffffff" strokeWidth="0.5" opacity="0.05" />

                  {/* Street Labels */}
                  <text x="35" y="15" fill="#f59e0b" opacity="0.4" fontSize="6" fontFamily="monospace">Julu Rd. (巨鹿路)</text>
                  <text x="210" y="390" fill="#f59e0b" opacity="0.4" fontSize="6" fontFamily="monospace">Wuyuan Rd. (五原路)</text>
                  <text x="220" y="150" fill="#059669" opacity="0.3" fontSize="6" fontFamily="monospace">Fuxing Park (复兴公园)</text>
                </svg>

                {/* Draw interactively matches pin elements */}
                <AnimatePresence>
                  {filteredMerchants.map((shop) => {
                    const isHovered = hoveredMerchantId === shop.id;
                    // Translate coordinate x, y (0 - 100) to map percentage
                    return (
                      <div
                        key={shop.id}
                        className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group/pin z-10"
                        style={{ left: `${shop.coordinate.x}%`, top: `${shop.coordinate.y}%` }}
                        onMouseEnter={() => setHoveredMerchantId(shop.id)}
                        onMouseLeave={() => setHoveredMerchantId(null)}
                        onClick={() => onSelectMerchant(shop.id)}
                      >
                        {/* Pulser radar effects */}
                        <div className={`absolute -inset-4 rounded-full transition-all duration-300 ${
                          isHovered ? "bg-amber-500/25 scale-125 border border-amber-400/40" : "bg-amber-500/5 group-hover/pin:bg-amber-500/10 scale-100"
                        }`} />

                        {/* Central pin marker */}
                        <div className={`relative px-2.5 py-1 rounded-lg border flex items-center gap-1 shadow-sm transition-all duration-300 ${
                          isHovered ? "bg-amber-400 text-stone-950 border-amber-500 scale-110 font-bold" : "bg-stone-900/90 text-amber-200 border-amber-900/40"
                        }`}>
                          <MapPin className="w-3 h-3 flex-shrink-0 text-amber-500" />
                          <span className="text-[9px] font-serif tracking-widest whitespace-nowrap">
                            {shop.name.slice(0, 4)}
                          </span>
                        </div>

                        {/* Floating tooltip preview and meta on hover */}
                        {isHovered && (
                          <div className="absolute top-7 left-1/2 -translate-x-1/2 bg-stone-900 border border-amber-900/40 p-2.5 w-44 rounded-xl shadow-2xl z-20 pointer-events-none space-y-1">
                            <h5 className="text-[10px] font-serif font-black text-amber-400">{shop.name}</h5>
                            <p className="text-[8px] text-stone-300 font-light font-sans line-clamp-2">{shop.subtitle}</p>
                            <div className="flex items-center justify-between text-[8px] text-stone-400 font-mono pt-1 border-t border-stone-800">
                              <span>★ {shop.rating}</span>
                              <span>{shop.distance}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Map Info Bar Header Overlay */}
              <div className="relative z-10 bg-stone-950/80 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-stone-800/80 flex items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest text-amber-300">RADAR DYNAMIC PINS地图点位同步</span>
                </div>
                <span className="text-[8px] font-mono text-stone-400 bg-stone-900 px-1.5 py-0.5 rounded border border-stone-800">
                  GPS ACTIVE
                </span>
              </div>

              {/* Map instructions at footer overlay */}
              <div className="relative z-10 bg-stone-950/80 backdrop-blur-md p-3 rounded-xl border border-stone-800/80 leading-relaxed text-[10px] text-stone-300">
                <span className="text-amber-400 font-bold font-serif">匠心地理图：</span>
                鼠标在左侧卡片悬浮或点踩，地图点位可动态追踪并闪烁波纹，展示店面微预检。
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
