import React, { useState, useMemo } from "react";
import { Merchant } from "../types";
import { MapPin, Search, Star, MessageSquare, Eye, SlidersHorizontal, ArrowDownAZ, Compass, Tag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CategoryFilterViewProps {
  merchants: Merchant[];
  onSelectMerchant: (merchantId: string) => void;
  onNavigateToTab: (tab: "explore" | "merchants" | "stories" | "profile") => void;
}

export default function CategoryFilterView({
  merchants,
  onSelectMerchant,
  onNavigateToTab
}: CategoryFilterViewProps) {
  // 1. Search Query and Location City
  const [searchQuery, setSearchQuery] = useState("");
  const [currentCity, setCurrentCity] = useState("上海");
  const [currentDistrict, setCurrentDistrict] = useState("静安区");

  // Show small district selector dropdown mock
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const districts = ["静安区", "黄浦区", "徐汇区", "长宁区", "青浦区"];

  // 2. Main classifications requested: 美食 / 火锅 / 烧烤 / 甜点 / 轻食 / 茶饮 / 伴手礼
  const [activeCategory, setActiveCategory] = useState<"美食" | "火锅" | "烧烤" | "甜点" | "轻食" | "茶饮" | "伴手礼">("美食");

  // 3. Filters for Price, Distance, and Rating (价格/距离/评分)
  const [priceRange, setPriceRange] = useState<"全部" | "cheap" | "mid" | "expensive">("全部"); // <40 | 40-80 | >80
  const [distanceRange, setDistanceRange] = useState<"全部" | "near" | "mid" | "far">("全部"); // <1km | 1-3km | >3km
  const [minRating, setMinRating] = useState<number>(0); // 0 | 4.8 | 4.9

  // Helper arrays for filters selections
  const priceOptions = [
    { label: "价格不限", value: "全部" },
    { label: "¥40以下", value: "cheap" },
    { label: "¥40 - ¥80", value: "mid" },
    { label: "¥80以上", value: "expensive" }
  ];

  const distanceOptions = [
    { label: "距离不限", value: "全部" },
    { label: "1km以内", value: "near" },
    { label: "1 - 3km", value: "mid" },
    { label: "3km以外", value: "far" }
  ];

  const ratingOptions = [
    { label: "评分不限", value: 0 },
    { label: "4.8分以上", value: 4.8 },
    { label: "4.9分以上", value: 4.9 }
  ];

  // Hover states for merchant cards
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // 4. Inject extra high-quality mock merchants for Fire/Barbecue hotpots & desserts so that filters are 100% functional and lively!
  const mergedMerchantsList = useMemo(() => {
    // Elegant extra artisanal stores
    const extraMerchants: Merchant[] = [
      {
        id: "m_hotpot",
        name: "陶罐山珍 古法土鸡火锅",
        subtitle: "炭火慢咕嘟，煨出高山野生菌的鲜灵之气",
        rating: 4.9,
        reviewCount: 226,
        pricePerCapita: 98,
        distance: "1.5km",
        coordinate: { x: 45, y: 55 },
        category: "匠心私厨", // Maps internally
        tags: ["#炭火铜锅", "#原山野菌", "#鲜宰土鸡", "#老灶醇厚"],
        features: ["限时优惠", "静谧小憩", "火锅"], // Tag matches
        openingHours: "11:00 - 22:30",
        isOpen: true,
        statusText: "营业中",
        address: "上海市 静安区 愚园路 458号",
        description: "传承于滇西大山深处的黑陶罐火锅。每日空运大理苍山野生姬松茸、牛肝菌，配以散养足岁土鸡。在生铁炭火上文火慢煨4小时，汤色金黄，鲜掉眉毛，带您回归古朴林野锅气。",
        images: [
          "/src/assets/images/regenerated_image_1780053898839.jpg", // hotpot visual
          "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=500",
          "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=500"
        ],
        products: [],
        ratingsBreakdown: { taste: 5.0, ambience: 4.8, ingredients: 4.9 }
      }
    ];

    return [...merchants, ...extraMerchants];
  }, [merchants]);

  // Handle active logic filtering
  const filteredList = useMemo(() => {
    return mergedMerchantsList.filter((m) => {
      // 1. Text Search Filter matches Name, Subtitle, description or tags
      if (searchQuery.trim()) {
        const keyword = searchQuery.toLowerCase();
        const textMatch =
          m.name.toLowerCase().includes(keyword) ||
          m.subtitle.toLowerCase().includes(keyword) ||
          m.address.toLowerCase().includes(keyword) ||
          m.tags.some((t) => t.toLowerCase().includes(keyword));
        if (!textMatch) return false;
      }

      // 2. Active Class Filter matches: 美食 / 火锅 / 烧烤 / 甜点 / 轻食 / 茶饮 / 伴手礼
      if (activeCategory === "火锅") {
        const isHotpot = m.features.includes("火锅") || m.name.includes("火锅");
        if (!isHotpot) return false;
      } else if (activeCategory === "烧烤") {
        const isBarbecue = m.features.includes("烧烤") || m.name.includes("烤") || m.name.includes("酱");
        if (!isBarbecue) return false;
      } else if (activeCategory === "甜点") {
        const isDessert = m.category === "手工烘焙" || m.category === "街角糖铺" || m.features.includes("午后茶点") || m.name.includes("面包") || m.name.includes("蛋糕");
        if (!isDessert) return false;
      } else if (activeCategory === "轻食") {
        const isLight = m.category === "有机素食" || m.features.includes("纯素食") || m.features.includes("无麸质");
        if (!isLight) return false;
      } else if (activeCategory === "茶饮") {
        const isTea = m.category === "茶事琴房" || m.name.includes("茶");
        if (!isTea) return false;
      } else if (activeCategory === "伴手礼") {
        const isGift = m.category === "非遗工坊" || m.category === "街角糖铺" || m.tags.includes("#手作花糖") || m.tags.includes("#非遗玫瑰") || m.name.includes("酱");
        if (!isGift) return false;
      }
      // If activeCategory is "美食", it acts as "全部" or generic food explorers matching all!

      // 3. Price Filter logic
      if (priceRange !== "全部") {
        if (priceRange === "cheap" && m.pricePerCapita >= 40) return false;
        if (priceRange === "mid" && (m.pricePerCapita < 40 || m.pricePerCapita > 80)) return false;
        if (priceRange === "expensive" && m.pricePerCapita <= 80) return false;
      }

      // 4. Distance Filter logic (simulated converter)
      if (distanceRange !== "全部") {
        const val = parseFloat(m.distance); // "500m" -> 0.5, "1.2km" -> 1.2
        const isKm = m.distance.includes("km");
        const kmValue = isKm ? val : val / 1000.0;

        if (distanceRange === "near" && kmValue > 1.0) return false;
        if (distanceRange === "mid" && (kmValue < 1.0 || kmValue > 3.0)) return false;
        if (distanceRange === "far" && kmValue <= 3.0) return false;
      }

      // 5. Ratings filter limit
      if (minRating > 0 && m.rating < minRating) return false;

      return true;
    });
  }, [mergedMerchantsList, searchQuery, activeCategory, priceRange, distanceRange, minRating]);

  // Reset helper
  const handleResetFilters = () => {
    setSearchQuery("");
    setPriceRange("全部");
    setDistanceRange("全部");
    setMinRating(0);
    setActiveCategory("美食");
  };

  return (
    <div className="space-y-6 pb-16">
      {/* 1. TOP HEADER WITH CITY SELECTOR AND INPUT BAR */}
      <section className="bg-white border border-stone-200/80 rounded-2xl p-4 md:p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* City and District locator display with dropdown trigger */}
        <div className="flex items-center gap-3 w-full md:w-auto relative flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#eef3e9] hover:bg-[#7A9A61]/25 flex items-center justify-center text-[#5C7A44] border border-[#7A9A61]/15">
            <MapPin className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="text-[10px] text-stone-400 font-mono block uppercase">City Locator</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-serif font-bold text-stone-900">
                {currentCity} · <span className="text-[#5C7A44]">{currentDistrict}</span>
              </span>
              <button
                onClick={() => setShowDistrictDropdown(!showDistrictDropdown)}
                className="text-[9px] bg-stone-50 hover:bg-stone-100 text-stone-500 border border-stone-200 px-1.5 py-0.5 rounded cursor-pointer leading-none"
              >
                切换街区
              </button>
            </div>
          </div>

          {/* Districts switcher sub-dropdown overlay */}
          <AnimatePresence>
            {showDistrictDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-12 top-11 bg-white border border-stone-200 p-2 rounded-xl shadow-lg w-32 z-30"
              >
                {districts.map((dist) => (
                  <button
                    key={dist}
                    onClick={() => {
                      setCurrentDistrict(dist);
                      setShowDistrictDropdown(false);
                    }}
                    className={`w-full text-left font-serif text-[11px] px-2 py-1.5 rounded-lg transition-colors block ${
                      currentDistrict === dist
                        ? "bg-[#eef3e9] text-[#3B5323] font-bold"
                        : "text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    {dist}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search input bar */}
        <div className="flex items-center bg-[#FAF8F2] px-3.5 py-2.5 rounded-xl border border-[#7A9A61]/15 shadow-3xs flex-1 w-full md:w-auto">
          <Search className="w-4 h-4 text-stone-400 mr-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="在全城检索：姬松茸罐火锅、手感全麦欧包、辣酱、面摊..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-xs text-stone-850 placeholder-stone-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-stone-400 hover:text-stone-605 text-[10px] ml-2 font-mono"
            >
              CLEAR
            </button>
          )}
        </div>
      </section>

      {/* 2. CATEGORY SELECTOR CAROUSEL: 美食 / 火锅 / 烧烤 / 甜点 / 轻食 / 茶饮 / 伴手礼 */}
      <section className="space-y-2">
        <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest block font-medium">Core Classifications 美食分类筛选</span>
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1 scroll-smooth">
          {(["美食", "火锅", "烧烤", "甜点", "轻食", "茶饮", "伴手礼"] as const).map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-3 px-6 rounded-2xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-2 flex-shrink-0 shadow-3xs ${
                  isActive
                    ? "bg-[#7A9A61] border-[#5C7A44] text-[#FAF8F2] font-black scale-102 shadow-xs"
                    : "bg-white border-stone-200/80 text-stone-600 hover:bg-[#eef3e9]/20 hover:text-stone-900"
                }`}
                id={`cat-filter-${cat}`}
              >
                <Tag className="w-3.5 h-3.5 opacity-80" />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. MULTI FILTERING GROUP: Price Filter, Distance Filter, Ratings filter */}
      <section className="bg-white border border-stone-200/80 rounded-2xl p-4 md:p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-stone-100 pb-2 flex-shrink-0 text-[#5C7A44]">
          <SlidersHorizontal className="w-4 h-4" />
          <h3 className="text-xs font-serif font-black uppercase tracking-wide">
            极简维度筛选器 (Granular Filters Console)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Price Filters */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-stone-400 font-mono block">人均消费价格 (Price Range)</span>
            <div className="flex flex-wrap gap-1.5">
              {priceOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPriceRange(opt.value as any)}
                  className={`px-3 py-1.5 border text-[11px] rounded-lg cursor-pointer transition-colors ${
                    priceRange === opt.value
                      ? "bg-[#eef3e9] border-[#7A9A61]/40 text-[#3B5323] font-bold"
                      : "bg-stone-50 border-stone-150 text-stone-550 hover:bg-stone-100"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Distance Filters */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-stone-400 font-mono block">探索步行距离 (Distance limits)</span>
            <div className="flex flex-wrap gap-1.5">
              {distanceOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setDistanceRange(opt.value as any)}
                  className={`px-3 py-1.5 border text-[11px] rounded-lg cursor-pointer transition-colors ${
                    distanceRange === opt.value
                      ? "bg-[#eef3e9] border-[#7A9A61]/40 text-[#3B5323] font-bold"
                      : "bg-stone-50 border-stone-150 text-stone-550 hover:bg-stone-100"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Ratings Filters */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-stone-400 font-mono block">匠艺评分筛选 (Score Threshold)</span>
            <div className="flex flex-wrap gap-1.5">
              {ratingOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setMinRating(opt.value)}
                  className={`px-3 py-1.5 border text-[11px] rounded-lg cursor-pointer transition-colors ${
                    minRating === opt.value
                      ? "bg-[#eef3e9] border-[#7A9A61]/40 text-[#3B5323] font-bold"
                      : "bg-stone-50 border-stone-150 text-stone-550 hover:bg-stone-100"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filters control action anchors */}
        {(priceRange !== "全部" || distanceRange !== "全部" || minRating > 0 || searchQuery) && (
          <div className="flex items-center justify-between pt-3 border-t border-stone-100 mt-2.5 text-xs text-stone-400 font-mono">
            <span>已触发多重耦合检索...</span>
            <button
              onClick={handleResetFilters}
              className="text-[#5C7A44] hover:text-[#3B5323] font-bold underline flex items-center gap-1 cursor-pointer"
            >
              <ArrowDownAZ className="w-3.5 h-3.5" />
              清空并重置全部筛选条件
            </button>
          </div>
        )}
      </section>

      {/* 4. MERCHANT CARDS LISTING STREAM FLOW (Exactly identical to MerchantsView card style layout!) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-stone-400 font-mono uppercase tracking-wider">
            共检索到 {filteredList.length} 位街坊美食手作匠人
          </span>
          <span className="text-[10px] text-[#5C7A44] font-mono tracking-widest font-semibold uppercase">ARTISANAL MAP LISTING</span>
        </div>

        {/* Zero state matches */}
        {filteredList.length === 0 ? (
          <div className="bg-[#FAF8F2] rounded-3xl p-16 border border-[#7A9A61]/15 text-center space-y-4 shadow-3xs max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-[#eef3e9] text-[#5C7A44] rounded-full flex items-center justify-center mx-auto border border-[#7A9A61]/10">
              <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: "35s" }} />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-serif font-black text-stone-900 text-sm">暂时未有符合筛选维度的手画店铺</h4>
              <p className="text-xs text-stone-400 max-w-md mx-auto">
                可能当前街区（{currentDistrict}）没有完美契合当前“{activeCategory} + 人均”的独立手作人，建议您更换街区或一键清空重置。
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-[#7A9A61] hover:bg-[#5C7A44] text-[#FAF8F2] rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              清空筛选并重新打卡
            </button>
          </div>
        ) : (
          /* Exquisite responsive grid card layout matching core design perfectly */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredList.map((shop) => {
              const isCardHovered = hoveredId === shop.id;
              return (
                <motion.div
                  key={shop.id}
                  layout
                  onMouseEnter={() => setHoveredId(shop.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onSelectMerchant(shop.id)}
                  className={`bg-white rounded-2xl overflow-hidden border transition-all cursor-pointer shadow-sm group flex flex-col justify-between ${
                    isCardHovered ? "border-[#7A9A61]/50 shadow-md ring-1 ring-[#7A9A61]/10" : "border-stone-200/80 hover:border-[#7A9A61]/20"
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
                      {/* Rating point overlay matches top-standard precision */}
                      <div className="absolute bottom-3 right-3 bg-stone-900/90 text-amber-400 font-bold font-mono text-xs px-2 py-1 rounded-lg shadow flex items-center gap-1.5">
                        <span>★</span>
                        <span className="text-stone-50">{shop.rating}</span>
                      </div>
                    </div>

                    {/* Content details description */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-serif font-black text-stone-950 group-hover:text-[#5C7A44] transition-colors truncate max-w-[170px]">
                          {shop.name}
                        </h3>
                        <span className="text-[10px] font-mono text-stone-400 flex-shrink-0">
                          {shop.distance} · 人均 ¥{shop.pricePerCapita}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 font-light font-sans line-clamp-2 leading-relaxed">
                        {shop.subtitle}
                      </p>

                      {/* Feature tags row */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {shop.tags.slice(0, 3).map((tg) => (
                          <span
                            key={tg}
                            className="text-[9px] px-2 py-0.5 bg-stone-50 hover:bg-[#eef3e9] text-stone-500 hover:text-[#3B5323] rounded-md font-mono"
                          >
                            {tg}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions summary footer */}
                  <div className="p-4 pt-0 border-t border-stone-100/60 mt-2 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-stone-400 flex items-center gap-1 leading-none">
                      <MessageSquare className="w-3.5 h-3.5 text-stone-300" />
                      {shop.reviewCount} 余评价
                    </span>
                    <span className="text-[10px] font-semibold text-[#5C7A44] group-hover:text-[#3B5323] flex items-center gap-0.5 font-mono">
                      看店打卡细节
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. ADDED RICH GASTRONOMY SHOWCASE SECTION: "匠心美食大赏 · 灵感手作画报" */}
      <section className="space-y-6 pt-8 border-t border-stone-200/60" id="artisanal-gastronomy-showcase">
        <div className="space-y-1">
          <span className="text-[10px] text-[#5C7A44] font-mono tracking-widest font-black uppercase block">
            Seasonal Flavor Chronicle · 匠艺美食画报
          </span>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-black text-stone-950 flex items-center gap-2">
              <span>四时风物 · 极简手作精品大赏</span>
              <span className="text-xs bg-amber-100 text-amber-900 border border-amber-900/10 px-2.5 py-0.5 rounded-full font-sans font-medium">本季限时推荐</span>
            </h2>
            <span className="text-xs text-stone-400 font-mono hidden md:inline">4 Handcrafted Curations</span>
          </div>
          <p className="text-xs text-stone-500 font-light max-w-2xl leading-relaxed">
            我们为您遴选由本土独立主理人慢热而作的非工业标准化风物。每一道食物都承载了手艺人数十年的心力与带有泥土和日光温度的真挚食材。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Item 1: 窑炉柴火慢焙 */}
          <div className="bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col md:flex-row group">
            {/* Left side Image */}
            <div className="md:w-5/12 h-64 md:h-auto relative overflow-hidden bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600"
                alt="窑烤香草野生菌海盐欧包"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
                id="showcase-img-bread"
              />
              <div className="absolute top-4 left-4 bg-amber-900/95 text-[#FAF8F2] text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md font-mono shadow-md">
                窑烤工艺 / 炭木慢温
              </div>
            </div>

            {/* Right side Texts details */}
            <div className="p-6 md:w-7/12 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                  <span>宋老伯的手工窑炉坊</span>
                  <span>每日限量 50 个</span>
                </div>
                <h3 className="text-sm font-serif font-black text-stone-950 group-hover:text-[#5C7A44] transition-colors leading-snug">
                  窑烤香草野生菌海盐欧包
                </h3>
                <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                  采用野生鲁邦酵母经历18小时发酵，在400℃高温窑炉内，以椴木和荔枝木慢烤。面包表皮被高温逼出纤薄松脆的微苦焦糖壳，而芯部则饱水软弹、拉丝细腻，野菌与高山海盐在麦香中层层盘绕。
                </p>
              </div>

              {/* Bulleted checklist */}
              <ul className="space-y-1.5 border-t border-b border-stone-100 py-3 text-[11px] text-stone-650 font-sans">
                <li className="flex items-center gap-2">
                  <span className="text-amber-700 font-bold">•</span>
                  <span>18小时低温极慢酵母熟成</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-700 font-bold">•</span>
                  <span>大兴安岭野生菌与迷迭香交织</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-700 font-bold">•</span>
                  <span>400度微红荔枝木炭窑快速锁水</span>
                </li>
              </ul>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-serif font-bold text-[#5C7A44]">
                    ¥ 32
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono line-through">
                    ¥ 45
                  </span>
                </div>
                <span className="text-[10px] font-bold text-amber-900 bg-amber-50 px-2 py-1 rounded border border-amber-900/10 font-mono">
                  主理人：宋志平
                </span>
              </div>
            </div>
          </div>

          {/* Item 2: 荔枝木泥釜炙烤 (NEW ADDED NEXT TO THE BAKERY BREAD) */}
          <div className="bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col md:flex-row group">
            {/* Left side Image */}
            <div className="md:w-5/12 h-64 md:h-auto relative overflow-hidden bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80&w=600"
                alt="荔枝老木泥釜蜜炙脆皮香乳鸽"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
                id="showcase-img-pigeon"
              />
              <div className="absolute top-4 left-4 bg-[#7A451C] text-[#FAF8F2] text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md font-mono shadow-md">
                荔木炙烤 / 挂脆上色
              </div>
            </div>

            {/* Right side Texts details */}
            <div className="p-6 md:w-7/12 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                  <span>荔枝木柴炭暗烤坊</span>
                  <span>每日限量 40 份</span>
                </div>
                <h3 className="text-sm font-serif font-black text-stone-950 group-hover:text-[#5C7A44] transition-colors leading-snug">
                  荔枝老木泥釜蜜炙脆皮香乳鸽
                </h3>
                <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                  精选中山22天妙龄乳鸽，以独创陶土泥釜盛入二十味香料腌渍数时。自然悬挂吹皮后刷满黄冬蜜与红曲。置于高温陶窑中以百年老荔木暗火慢炙，外皮红亮如琥珀，手撕爆爆汁，果木甜香扑鼻。
                </p>
              </div>

              {/* Bulleted checklist */}
              <ul className="space-y-1.5 border-t border-b border-stone-100 py-3 text-[11px] text-stone-650 font-sans">
                <li className="flex items-center gap-2">
                  <span className="text-[#7A451C] font-bold">•</span>
                  <span>22天妙龄精实乳鸽</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#7A451C] font-bold">•</span>
                  <span>冬蜜与红曲秘制挂脆水晾置</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#7A451C] font-bold">•</span>
                  <span>老砖窑纯荔枝木微烟高温速烤</span>
                </li>
              </ul>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-serif font-bold text-[#5C7A44]">
                    ¥ 58
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono line-through">
                    ¥ 72
                  </span>
                </div>
                <span className="text-[10px] font-bold text-amber-900 bg-amber-50 px-2 py-1 rounded border border-amber-900/10 font-mono">
                  炙烤师：邓广发 (非遗)
                </span>
              </div>
            </div>
          </div>

          {/* Item 3: 宋针古窑炭烤 (NEW ADDED NEXT TO THE NOODLES) */}
          <div className="bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col md:flex-row group">
            {/* Left side Image */}
            <div className="md:w-5/12 h-64 md:h-auto relative overflow-hidden bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600"
                alt="松针古窑炭火熏烤大漠春羔排"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
                id="showcase-img-lamb"
              />
              <div className="absolute top-4 left-4 bg-[#8B2635] text-[#FAF8F2] text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md font-mono shadow-md">
                古法窖烤 / 松木松针盘熏
              </div>
            </div>

            {/* Right side Texts details */}
            <div className="p-6 md:w-7/12 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                  <span>塞外古窑 · 手撕羔羊</span>
                  <span>每日限量 25 点</span>
                </div>
                <h3 className="text-sm font-serif font-black text-stone-950 group-hover:text-[#5C7A44] transition-colors leading-snug">
                  松针古窑炭火熏烤大漠春羔排
                </h3>
                <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                  严选塞北高山放养半年内鲜活肉草饲羔羊排。于封闭黄土窖窑内，以荔木和松针闷燃出的清雅松香徐徐熏透五小时。焦糖红亮的羊油在咀嚼中滋滋漫溢，油脂丰润而完全祛除膻味，极有野性芬芳。
                </p>
              </div>

              {/* Bulleted checklist */}
              <ul className="space-y-1.5 border-t border-b border-stone-100 py-3 text-[11px] text-stone-650 font-sans">
                <li className="flex items-center gap-2">
                  <span className="text-[#8B2635] font-bold">•</span>
                  <span>塞北大草原半年期精选羔羊肋骨</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#8B2635] font-bold">•</span>
                  <span>塞外松针与老黄土窑双重锁汁</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#8B2635] font-bold">•</span>
                  <span>独创二十五味天然原香海盐干敷</span>
                </li>
              </ul>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-serif font-bold text-[#5C7A44]">
                    ¥ 128
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono line-through">
                    ¥ 158
                  </span>
                </div>
                <span className="text-[10px] font-bold text-amber-900 bg-amber-50 px-2 py-1 rounded border border-amber-900/10 font-mono">
                  熏烤匠：阿布力克 (非遗)
                </span>
              </div>
            </div>
          </div>

          {/* Item 4: 砂锅慢炖手打粉 */}
          <div className="bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col md:flex-row group">
            {/* Left side Image */}
            <div className="md:w-5/12 h-64 md:h-auto relative overflow-hidden bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=600"
                alt="手舂野菌土火锅粉"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
                id="showcase-img-noodles"
              />
              <div className="absolute top-4 left-4 bg-emerald-900/95 text-[#FAF8F2] text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md font-mono shadow-md">
                手作晚籼 / 炭火瓦罐
              </div>
            </div>

            {/* Right side Texts details */}
            <div className="p-6 md:w-7/12 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                  <span>山野食铺 · 龙阿婆</span>
                  <span>每日限量 30 份</span>
                </div>
                <h3 className="text-sm font-serif font-black text-stone-950 group-hover:text-[#5C7A44] transition-colors leading-snug">
                  慢煮手舂野菌老鸡土火锅粉
                </h3>
                <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                  选用山地晚籼米泡发，在古石臼中数百次手力击打，漏滤制成温润玉筋。大火生滚，配以在粗土砂罐里文火熬煮了足足24小时的老母鸡浓汤。清澈微红，淋上秘制干焙蘸酱，口感Q弹爽滑极富弹性。
                </p>
              </div>

              {/* Bulleted checklist */}
              <ul className="space-y-1.5 border-t border-b border-stone-100 py-3 text-[11px] text-stone-650 font-sans">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>纯手工石棉大臼舂打无胶米粉</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>两岁足龄散养黄土鸡吊制鲜汤</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>搭配黑松露油与柴炭烘焙辣椒干碟</span>
                </li>
              </ul>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-serif font-bold text-[#5C7A44]">
                    ¥ 38
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono line-through">
                    ¥ 48
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#5C7A44] bg-[#eef3e9]/60 px-2 py-1 rounded border border-[#7A9A61]/25 font-mono">
                  匠艺人：龙玉珍 (非遗)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
