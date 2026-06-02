import React, { useState, useEffect } from "react";
import { Merchant, Product, Review, Story, Badge, ExplorationNote } from "./types";
import {
  featuredProducts,
  mockMerchants,
  mockStories,
  initialReviews,
  mockBadges
} from "./data";

// Sub-views
import ExploreView from "./components/ExploreView";
import MerchantsView from "./components/MerchantsView";
import MerchantDetailView from "./components/MerchantDetailView";
import WriteReviewView from "./components/WriteReviewView";
import UserProfileView from "./components/UserProfileView";
import CategoryFilterView from "./components/CategoryFilterView";
import CreateNoteView from "./components/CreateNoteView";
import CommunityReviewsView from "./components/CommunityReviewsView";
import RestaurantReservationView from "./components/RestaurantReservationView";
import LandingScreen from "./components/LandingScreen";

// Modals
import ProductDetailModal from "./components/ProductDetailModal";
import StoryDetailModal from "./components/StoryDetailModal";

// Icons
import { Compass, Store, BookOpen, User, MapPin, Bell, Utensils, Filter, MessageSquare, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Navigation tabs state
  const [activeTab, setActiveTab] = useState<"explore" | "merchants" | "stories" | "profile" | "merchant-detail" | "write-review" | "filter" | "create-note" | "reviews-plaza" | "booking">("explore");
  
  // Immersive landing state
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  // Secondary sub-view routing parameters
  const [selectedMerchantId, setSelectedMerchantId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  // Search and Map mode states passed to Merchants tab
  const [merchantsSearchQuery, setMerchantsSearchQuery] = useState("");
  const [merchantsMapMode, setMerchantsMapMode] = useState(false);

  // Core reactive Persistent States
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [favoritedIds, setFavoritedIds] = useState<string[]>([]);
  const [readStoryIds, setReadStoryIds] = useState<string[]>([]);
  const [explorationNotes, setExplorationNotes] = useState<ExplorationNote[]>([]);

  // Default seeded exploration notes
  const defaultNotes: ExplorationNote[] = [
    {
      id: "note_default_1",
      title: "静安老温热弄堂里的清林麦焦香",
      content: "巨鹿路深处的谷物私语一直是我周末必去的慢烤坊。清晨九点半，阳光在老梧桐梢梢探出，正落在那只满载红豆司康的生铁盘。大口咬下去，真正的石磨鲁邦老面混合红豆清泥，暖沙在齿间流落。真是有温度的手艺面包！",
      images: [
        "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&q=80&w=500"
      ],
      tags: {
        taste: "麦香充盈",
        ambience: "弄堂温存",
        service: "匠人手作"
      },
      location: "上海市 静安区 巨鹿路 758号",
      date: "2026-05-24 10:30",
      author: "美食寻味",
      avatar: "https://i.postimg.cc/ry96jBL4/artisanal-sourdough-1780274060881.jpg",
      category: "手工烘焙",
      likes: 128
    },
    {
      id: "note_default_2",
      title: "朱家角古镇，流水雕窗里的独幽茶室",
      content: "大隐隐于朱家角古市集的独幽茶室，老式苏建雕花木窗下，主理人正在生铁炭火上文火慢煮一壶大红袍。泉水和松炭相撞，茶香在白雾中袅袅缠绕。坐在此处听琴品茗，尘世喧嚣在此刻渐渐沉落。主人和蔼，茶点精致，极对浮生雅兴。",
      images: [
        "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400"
      ],
      tags: {
        taste: "岩骨茶香",
        ambience: "环境清雅",
        service: "和蔼诚挚"
      },
      location: "上海市 青浦区 朱家角古镇 漕河街 88号",
      date: "2026-05-25 15:45",
      author: "美食寻味",
      avatar: "https://i.postimg.cc/ry96jBL4/artisanal-sourdough-1780274060881.jpg",
      category: "匠心私厨",
      likes: 96
    }
  ];

  // Initialize data from localStorage or fallback defaults
  useEffect(() => {
    const savedMerchants = localStorage.getItem("artisanal_merchants");
    const savedReviews = localStorage.getItem("artisanal_reviews");
    const savedFavs = localStorage.getItem("artisanal_favs");
    const savedStoryReads = localStorage.getItem("artisanal_story_reads");
    const savedNotes = localStorage.getItem("artisanal_notes");

    if (savedMerchants) {
      try {
        const parsed = JSON.parse(savedMerchants);
        const updated = parsed.map((m: any) => {
          const matchSrc = mockMerchants.find((x) => x.id === m.id);
          const category = matchSrc ? matchSrc.category : m.category;
          if (m.id === "m7") {
            return {
              ...m,
              category,
              images: [
                "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=500",
                m.images[1] || "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400",
                m.images[2] || "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400"
              ]
            };
          }
          if (m.id === "m8") {
            return {
              ...m,
              category,
              images: [
                "https://i.postimg.cc/SRccL6P5/floss-yolk-qingtuan-1780320786151.jpg",
                m.images[1] || "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=400",
                m.images[2] || "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400"
              ],
              products: (m.products || []).map((p: any) => p.id === "p8_1" ? { ...p, image: "https://i.postimg.cc/SRccL6P5/floss-yolk-qingtuan-1780320786151.jpg" } : p)
            };
          }
          if (m.id === "m11") {
            return {
              ...m,
              category,
              images: [
                "https://i.postimg.cc/L5Mtwgk6/look1.jpg",
                m.images[1] || "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400",
                m.images[2] || "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=400"
              ],
              products: (m.products || []).map((p: any) => p.id === "p11_1" ? { ...p, image: "https://i.postimg.cc/L5Mtwgk6/look1.jpg" } : p)
            };
          }
          return {
            ...m,
            category
          };
        });
        setMerchants(updated);
      } catch (e) {
        setMerchants(mockMerchants);
      }
    } else {
      setMerchants(mockMerchants);
    }

    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      setReviews(initialReviews);
    }

    if (savedFavs) {
      setFavoritedIds(JSON.parse(savedFavs));
    } else {
      setFavoritedIds(["m1"]); // Default favorited shop as starter
    }

    if (savedStoryReads) {
      setReadStoryIds(JSON.parse(savedStoryReads));
    } else {
      setReadStoryIds([]);
    }

    if (savedNotes) {
      setExplorationNotes(JSON.parse(savedNotes));
    } else {
      setExplorationNotes(defaultNotes);
    }
  }, []);

  // Save states to storage whenever they update
  const saveMerchants = (nextMerchants: Merchant[]) => {
    setMerchants(nextMerchants);
    localStorage.setItem("artisanal_merchants", JSON.stringify(nextMerchants));
  };

  const saveReviews = (nextReviews: Review[]) => {
    setReviews(nextReviews);
    localStorage.setItem("artisanal_reviews", JSON.stringify(nextReviews));
  };

  const saveFavs = (nextFavs: string[]) => {
    setFavoritedIds(nextFavs);
    localStorage.setItem("artisanal_favs", JSON.stringify(nextFavs));
  };

  const saveStoryReads = (nextReads: string[]) => {
    setReadStoryIds(nextReads);
    localStorage.setItem("artisanal_story_reads", JSON.stringify(nextReads));
  };

  const saveNotes = (nextNotes: ExplorationNote[]) => {
    setExplorationNotes(nextNotes);
    localStorage.setItem("artisanal_notes", JSON.stringify(nextNotes));
  };

  // 1. Toggle Favorite shop
  const handleToggleFavorite = (merchantId: string) => {
    let nextFavs;
    if (favoritedIds.includes(merchantId)) {
      nextFavs = favoritedIds.filter((id) => id !== merchantId);
    } else {
      nextFavs = [...favoritedIds, merchantId];
    }
    saveFavs(nextFavs);
  };

  const handleUnfavoriteFromProfile = (merchantId: string) => {
    const nextFavs = favoritedIds.filter((id) => id !== merchantId);
    saveFavs(nextFavs);
  };

  // 1.5 Notes modification handlers
  const handleAddNote = (newNotePartial: Omit<ExplorationNote, "id" | "date" | "likes">) => {
    const nextNote: ExplorationNote = {
      ...newNotePartial,
      id: `note_${Date.now()}`,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      likes: 0
    };
    saveNotes([nextNote, ...explorationNotes]);
    setActiveTab("profile");
  };

  const handleDeleteNote = (noteId: string) => {
    const nextNotes = explorationNotes.filter((n) => n.id !== noteId);
    saveNotes(nextNotes);
  };

  // 2. Submit review and update merchant average ratings
  const handleAddReview = (newReviewPartial: Omit<Review, "id" | "date" | "likes">) => {
    const freshReview: Review = {
      ...newReviewPartial,
      id: `r_${Date.now()}`,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      likes: 0
    };

    const nextReviews = [freshReview, ...reviews];
    saveReviews(nextReviews);

    // Dynamic ratings compilation for the reviewed merchant
    const merchantReviews = nextReviews.filter((r) => r.merchantId === freshReview.merchantId);
    const totalReviewsCount = merchantReviews.length;

    const aggregateTaste = parseFloat(
      (merchantReviews.reduce((sum, r) => sum + r.rating.taste, 0) / totalReviewsCount).toFixed(1)
    );
    const aggregateAmbience = parseFloat(
      (merchantReviews.reduce((sum, r) => sum + r.rating.ambience, 0) / totalReviewsCount).toFixed(1)
    );
    const aggregateIngredients = parseFloat(
      (merchantReviews.reduce((sum, r) => sum + r.rating.ingredients, 0) / totalReviewsCount).toFixed(1)
    );
    const overallScore = parseFloat(
      ((aggregateTaste + aggregateAmbience + aggregateIngredients) / 3.0).toFixed(1)
    );

    // Update merchant's stats in state
    const nextMerchants = merchants.map((m) => {
      if (m.id === freshReview.merchantId) {
        return {
          ...m,
          rating: overallScore,
          reviewCount: totalReviewsCount,
          ratingsBreakdown: {
            taste: aggregateTaste,
            ambience: aggregateAmbience,
            ingredients: aggregateIngredients
          }
        };
      }
      return m;
    });

    saveMerchants(nextMerchants);

    // Return to the merchant detail view
    setSelectedMerchantId(freshReview.merchantId);
    setActiveTab("merchant-detail");
  };

  // 3. Track story reading clicks to unlock "市集猎人" badge
  const handleSelectStory = (story: Story) => {
    setSelectedStory(story);
    if (!readStoryIds.includes(story.id)) {
      const nextReads = [...readStoryIds, story.id];
      saveStoryReads(nextReads);
    }
  };

  // Derived computed parameters
  const favoritedMerchants = merchants.filter((m) => favoritedIds.includes(m.id));
  const userWrittenReviews = reviews.filter((r) => r.user.name === "美食寻味");

  // Dynamic Badges Compilation
  const CompiledBadges: Badge[] = mockBadges.map((badge) => {
    let isUnlocked = badge.isUnlocked;

    if (badge.id === "b1") {
      // 探店先锋: at least 1 written review in local state
      isUnlocked = userWrittenReviews.length >= 1;
    } else if (badge.id === "b2") {
      // 麦香诗人: favorited or reviewed "手工烘焙" (Julu cup)
      const hasBakeryFav = favoritedMerchants.some((m) => m.category === "手工烘焙");
      isUnlocked = hasBakeryFav;
    } else if (badge.id === "b3") {
      // 面条鉴赏家: favorited or reviewed "传统小吃" (Su-cooking noodles)
      const hasNoodleFav = favoritedMerchants.some((m) => m.category === "传统小吃");
      isUnlocked = hasNoodleFav;
    } else if (badge.id === "b4") {
      // 市集猎人: read stories or articles
      isUnlocked = readStoryIds.length >= 1;
    }

    return {
      ...badge,
      isUnlocked
    };
  });

  // Calculate stats counting
  const userStats = {
    footprintsCount: 15 + favoritedIds.length * 3, // Base count plus favorited adjustments
    visitsCount: 4 + userWrittenReviews.length * 2,
    followersCount: 520
  };

  const currentSelectedMerchant = merchants.find((m) => m.id === selectedMerchantId);

  // Easy routing wrapper to reset subcategories
  const handleNavigateToTab = (
    tab: "explore" | "merchants" | "stories" | "profile" | "filter" | "create-note" | "reviews-plaza" | "booking",
    queryVal?: string,
    enableMap?: boolean
  ) => {
    if (queryVal !== undefined) {
      setMerchantsSearchQuery(queryVal);
    } else {
      setMerchantsSearchQuery("");
    }

    if (enableMap !== undefined) {
      setMerchantsMapMode(enableMap);
    } else {
      setMerchantsMapMode(false);
    }

    setActiveTab(tab);
    setSelectedMerchantId(null);
  };

  if (!hasEntered) {
    return <LandingScreen onEnter={() => setHasEntered(true)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen text-stone-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-950 relative"
    >
      {/* 0. WEBSITE BACKGROUND VIDEO LAYER */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#fcfbf9]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src="https://images.pexels.com/video-files/6645799/6645799-uhd_2160_3840_25fps.mp4" type="video/mp4" />
          <source src="https://images.pexels.com/video-files/6645799/6645799-hd_1920_1080_25fps.mp4" type="video/mp4" />
          <source src="https://www.pexels.com/download/video/6645799/" type="video/mp4" />
        </video>
      </div>

      {/* 1. APP NAVIGATION SYSTEM HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/50 shadow-3xs px-4 md:px-8 py-3.5 flex items-center justify-between">
        {/* Logo and brand branding */}
        <div
          onClick={() => {
            setHasEntered(false);
            setActiveTab("explore");
          }}
          className="flex items-center gap-2 cursor-pointer group"
          id="brand-logo"
          title="返回到网站首页"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-800 hover:bg-amber-900 flex items-center justify-center text-amber-50 shadow-md shadow-amber-950/20 transition-all duration-300 transform group-hover:rotate-12">
            <Utensils className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-sm font-serif font-black tracking-widest text-stone-950 leading-none">
              手工匠心美食
            </h1>
            <span className="text-[8px] font-mono text-stone-400 block tracking-wider uppercase font-light">
              Artisanal Culinary Explorer
            </span>
          </div>
        </div>

        {/* Center Tabs navigational anchors */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => handleNavigateToTab("explore")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === "explore"
                ? "bg-amber-100/60 text-amber-950"
                : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
            }`}
            id="nav-explore-btn"
          >
            <Compass className="w-4 h-4" />
            <span>探索发现</span>
          </button>

          <button
            onClick={() => handleNavigateToTab("filter")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === "filter"
                ? "bg-[#eef3e9] text-[#3B5323]"
                : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
            }`}
            id="nav-filter-btn"
          >
            <Filter className="w-4 h-4" />
            <span>美食分类</span>
          </button>

          <button
            onClick={() => handleNavigateToTab("merchants")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === "merchants" || activeTab === "merchant-detail" || activeTab === "write-review"
                ? "bg-amber-100/60 text-amber-950"
                : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
            }`}
            id="nav-merchants-btn"
          >
            <Store className="w-4 h-4" />
            <span>匠人商家</span>
          </button>

          <button
            onClick={() => handleNavigateToTab("stories")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === "stories"
                ? "bg-amber-100/60 text-amber-950"
                : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
            }`}
            id="nav-stories-btn"
          >
            <BookOpen className="w-4 h-4" />
            <span>探店故事</span>
          </button>

          <button
            onClick={() => handleNavigateToTab("reviews-plaza")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === "reviews-plaza"
                ? "bg-amber-100/60 text-amber-950"
                : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
            }`}
            id="nav-reviews-plaza-btn"
          >
            <MessageSquare className="w-4 h-4" />
            <span>食评社区</span>
          </button>

          <button
            onClick={() => handleNavigateToTab("booking")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === "booking"
                ? "bg-amber-100/60 text-amber-950"
                : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
            }`}
            id="nav-booking-btn"
          >
            <Calendar className="w-4 h-4" />
            <span>选座预订</span>
          </button>
        </nav>

        {/* Right side Profile controls widget */}
        <div className="flex items-center gap-4">
          {/* Location mock indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-stone-400 font-mono text-[10px] bg-stone-50 border border-stone-200/50 px-2.5 py-1 rounded-lg">
            <MapPin className="w-3.5 h-3.5 text-amber-800" />
            <span>上海 · 静安街区</span>
          </div>

          <div className="relative">
            <Bell className="w-4 h-4 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer mt-1" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full" />
          </div>

          {/* Connected User trigger Profile */}
          <div
            onClick={() => handleNavigateToTab("profile")}
            className={`flex items-center gap-2 cursor-pointer p-1 rounded-xl transition-all border ${
              activeTab === "profile"
                ? "bg-amber-50 border-amber-900/15"
                : "bg-white border-stone-200/50 hover:border-amber-900/10"
            }`}
            id="nav-profile-btn"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden border border-amber-950/10 flex-shrink-0">
              <img
                src="https://i.postimg.cc/ry96jBL4/artisanal-sourdough-1780274060881.jpg"
                alt="美食寻味"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="hidden sm:inline text-xs font-serif font-black text-stone-900">
              美食寻味
            </span>
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-stone-200/60 shadow-lg px-4 py-2 flex items-center justify-between">
        <button
          onClick={() => handleNavigateToTab("explore")}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium leading-none ${
            activeTab === "explore" ? "text-amber-800 font-bold" : "text-stone-400"
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>探索</span>
        </button>

        <button
          onClick={() => handleNavigateToTab("filter")}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium leading-none ${
            activeTab === "filter" ? "text-[#5C7A44] font-bold" : "text-stone-400"
          }`}
        >
          <Filter className="w-5 h-5" />
          <span>分类</span>
        </button>

        <button
          onClick={() => handleNavigateToTab("merchants")}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium leading-none ${
            activeTab === "merchants" || activeTab === "merchant-detail" ? "text-amber-800 font-bold" : "text-stone-400"
          }`}
        >
          <Store className="w-5 h-5" />
          <span>商家</span>
        </button>

        <button
          onClick={() => handleNavigateToTab("stories")}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium leading-none ${
            activeTab === "stories" ? "text-amber-800 font-bold" : "text-stone-400"
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>故事</span>
        </button>

        <button
          onClick={() => handleNavigateToTab("reviews-plaza")}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium leading-none ${
            activeTab === "reviews-plaza" ? "text-amber-800 font-bold" : "text-stone-400"
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span>食评</span>
        </button>

        <button
          onClick={() => handleNavigateToTab("booking")}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium leading-none ${
            activeTab === "booking" ? "text-amber-800 font-bold" : "text-stone-400"
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>预订</span>
        </button>

        <button
          onClick={() => handleNavigateToTab("profile")}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium leading-none ${
            activeTab === "profile" ? "text-amber-800 font-bold" : "text-stone-400"
          }`}
        >
          <User className="w-5 h-5" />
          <span>我</span>
        </button>
      </nav>

      {/* 2. CORE MAIN VIEW WRAPPER */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 mb-16 md:mb-0">
        <AnimatePresence mode="wait">
          {activeTab === "explore" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              key="view-explore"
            >
              <ExploreView
                merchants={merchants}
                featuredProducts={featuredProducts}
                stories={mockStories}
                onSelectMerchant={(merchantId) => {
                  setSelectedMerchantId(merchantId);
                  setActiveTab("merchant-detail");
                }}
                onSelectProduct={setSelectedProduct}
                onSelectStory={handleSelectStory}
                onNavigateToTab={handleNavigateToTab}
              />
            </motion.div>
          )}

          {activeTab === "merchants" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              key="view-merchants"
            >
              <MerchantsView
                merchants={merchants}
                onSelectMerchant={(merchantId) => {
                  setSelectedMerchantId(merchantId);
                  setActiveTab("merchant-detail");
                }}
                initialSearchQuery={merchantsSearchQuery}
                initialEnableMap={merchantsMapMode}
              />
            </motion.div>
          )}

          {activeTab === "merchant-detail" && currentSelectedMerchant && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              key="view-merchant-detail"
            >
              <MerchantDetailView
                merchant={currentSelectedMerchant}
                reviews={reviews}
                isFavorited={favoritedIds.includes(currentSelectedMerchant.id)}
                onToggleFavorite={handleToggleFavorite}
                onSelectProduct={setSelectedProduct}
                onWriteReview={(merchantId) => {
                  setSelectedMerchantId(merchantId);
                  setActiveTab("write-review");
                }}
                onBack={() => handleNavigateToTab("merchants")}
              />
            </motion.div>
          )}

          {activeTab === "write-review" && currentSelectedMerchant && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              key="view-write-review"
            >
              <WriteReviewView
                merchant={currentSelectedMerchant}
                onSelectSubmit={handleAddReview}
                onBack={() => setActiveTab("merchant-detail")}
              />
            </motion.div>
          )}

          {activeTab === "stories" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              key="view-stories"
              className="space-y-8"
            >
              {/* Simple Stories list panel fallback */}
              <div className="space-y-2 border-b border-stone-200 pb-4">
                <span className="text-[10px] text-amber-700 font-mono tracking-widest uppercase block">Exploration Chronicles</span>
                <h2 className="text-2xl font-serif font-black text-stone-950">全部探店专访的故事</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {mockStories.map((story) => (
                  <div
                    key={story.id}
                    onClick={() => handleSelectStory(story)}
                    className="group bg-white rounded-3xl overflow-hidden border border-stone-200 p-5 shadow-xs hover:shadow-md cursor-pointer flex flex-col gap-5 transition-all"
                  >
                    <div className="h-48 rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-2.5 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-900/10 rounded">
                            {story.tag}
                          </span>
                          <span className="text-[10px] text-stone-400 font-mono">
                            {story.readTime}
                          </span>
                        </div>
                        <h3 className="text-sm font-serif font-black text-stone-950 group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug">
                          {story.title}
                        </h3>
                        <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed">
                          {story.summary}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-[10px] font-mono text-stone-400 mt-2">
                        <span>{story.author}</span>
                        <span>{story.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              key="view-profile"
            >
              <UserProfileView
                userStats={userStats}
                favoritedMerchants={favoritedMerchants}
                userReviews={userWrittenReviews}
                explorationNotes={explorationNotes}
                onSelectMerchant={(merchantId) => {
                  setSelectedMerchantId(merchantId);
                  setActiveTab("merchant-detail");
                }}
                onUnfavoriteMerchant={handleUnfavoriteFromProfile}
                onDeleteNote={handleDeleteNote}
                onNavigateToPostNote={() => setActiveTab("create-note")}
              />
            </motion.div>
          )}

          {activeTab === "filter" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              key="view-filter"
            >
              <CategoryFilterView
                merchants={merchants}
                onSelectMerchant={(merchantId) => {
                  setSelectedMerchantId(merchantId);
                  setActiveTab("merchant-detail");
                }}
                onNavigateToTab={handleNavigateToTab}
              />
            </motion.div>
          )}

          {activeTab === "create-note" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              key="view-create-note"
            >
              <CreateNoteView
                merchants={merchants}
                onSubmitNote={handleAddNote}
                onBack={() => setActiveTab("profile")}
              />
            </motion.div>
          )}

          {activeTab === "reviews-plaza" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              key="view-reviews-plaza"
            >
              <CommunityReviewsView
                merchants={merchants}
                reviews={reviews}
                onAddReview={(newReview) => {
                  handleAddReview(newReview);
                  setActiveTab("reviews-plaza");
                }}
              />
            </motion.div>
          )}

          {activeTab === "booking" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              key="view-booking"
            >
              <RestaurantReservationView
                merchants={merchants}
                onSelectMerchant={(merchantId) => {
                  setSelectedMerchantId(merchantId);
                  setActiveTab("merchant-detail");
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. MODALS SYSTEM OVERLAYS */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <StoryDetailModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />

      {/* Footer credits in display layout */}
      <footer className="bg-stone-900 text-stone-400/95 py-12 px-6 md:px-12 mt-auto border-t border-stone-805">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xs font-serif font-black tracking-widest text-amber-400 uppercase">
              手工匠心美食 · 寻找散落在日常里的手作微光
            </h4>
            <p className="text-[10px] text-stone-500 font-light font-sans max-w-md leading-relaxed">
              这是一个专为寻味极简东方、手包馄饨面点及窑烤柴火麦香欧包而设的高能质感社区。感谢支持中华本地传统匠人独立工作室！
            </p>
          </div>
          <span className="text-[10px] font-mono text-stone-600">
            © 2026 ARTISANAL CULINARY HUB INC. CO.
          </span>
        </div>
      </footer>
    </motion.div>
  );
}
