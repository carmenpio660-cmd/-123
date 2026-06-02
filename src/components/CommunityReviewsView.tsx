import React, { useState, useMemo } from "react";
import { Merchant, Review } from "../types";
import {
  MessageSquare,
  Star,
  Camera,
  UploadCloud,
  MapPin,
  Heart,
  Search,
  Filter,
  Plus,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Award,
  Calendar,
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CommunityReviewsViewProps {
  merchants: Merchant[];
  reviews: Review[];
  onAddReview: (review: Omit<Review, "id" | "date" | "likes">) => void;
  onLikeReview?: (reviewId: string) => void;
}

export default function CommunityReviewsView({
  merchants,
  reviews,
  onAddReview,
  onLikeReview
}: CommunityReviewsViewProps) {
  // State for showing the writing form
  const [isFormExpanded, setIsFormExpanded] = useState(false);

  // Form states
  const [selectedMerchantId, setSelectedMerchantId] = useState(merchants[0]?.id || "");
  const [tasteRating, setTasteRating] = useState(5);
  const [ambienceRating, setAmbienceRating] = useState(5);
  const [serviceRating, setServiceRating] = useState(5); // Maps to ingredients rating behind the scenes
  const [reviewText, setReviewText] = useState("");
  const [locationTag, setLocationTag] = useState(merchants[0]?.address || "");
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [errorText, setErrorText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Local likes tracking fallback if onLikeReview is not passed, to guarantee real reactivity
  const [localLikedIds, setLocalLikedIds] = useState<string[]>([]);
  const [localLikeCounts, setLocalLikeCounts] = useState<Record<string, number>>({});

  // Search & Filter feed states
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState<"all" | "excellent" | "good" | "photo">("all");
  const [sortBy, setSortBy] = useState<"hot" | "new">("hot");

  // Sync address input when chosen merchant changes
  const handleMerchantChange = (merchantId: string) => {
    setSelectedMerchantId(merchantId);
    const m = merchants.find((item) => item.id === merchantId);
    if (m) {
      setLocationTag(m.address);
    }
  };

  // High-quality review presets for easy selection in preview
  const foodPhotoPresets = [
    {
      id: "p_bread",
      name: "窑炉苏醒麦香",
      url: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&q=80&w=500"
    },
    {
      id: "p_sauce",
      name: "非遗红熟二荆条",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIOwm6GLYmMR6F_si7yIVqb1Ll6kW9ttgS5P3pBwnHkunfzRQxoip3MU9iehtOU6PRfdlU0NFhBwMKX9mPZbF5nwN5MJbdt26tkgMr1qGy0m2mA69WvNbcs_G-yRF3JzIimgEZ7xTp8wIKq39EH5em2LLis17ZcEmEw7oo4Ual1VsKfIDUVJzy18RIyi8vq9AbWvmUCx88KCfFVPYpq7DeB--IpISgDR2mHVZNAZFcui3pkhPCM59lz95jXRSLF2ivByhRD3oyBQ"
    },
    {
      id: "p_tea",
      name: "大红袍慢焙火香",
      url: "https://i.postimg.cc/cLbXTmHt/dahongpao-roasted-tea-1780321136760.jpg"
    },
    {
      id: "p_wonton",
      name: "荠菜手包骨汤大馄饨",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVrCLdsqvheLR2rmufTlbzQmCNL0zMfigSnVbAjPsZa9t1P7HAF3UXT7s0xYSApgLESdwjtXWGywdNKEv9UK24bueDuj6RAzwSG33Te0gBvWKj80KB-9tv9IrdBj66lHZwstUmIY6x088ewo1x6Cl72wd4hKrMtZ9V32tYkG3xuajUTJyhx3iHfumKeu8Nv6R-tNzkrj5Plxt-9JtUC6Pgv_KxLOvUfkLpgzOnStspO2n3E2aCibHvo1BP9DI8CyS1j-sJ6nnd2A"
    },
    {
      id: "p_organic",
      name: "手工鲜制野莓奶酪",
      url: "https://i.postimg.cc/cCvJ705n/cloud-cheese-dessert-1780396183058.jpg"
    }
  ];

  // Dimensional Tags selection sets
  const tagCategories = [
    {
      label: "⭐ 口味风味",
      tags: ["风味绝佳", "麦香充盈", "鲜嫩多汁", "辣而不燥", "汤清质鲜", "慢火焦香"]
    },
    {
      label: "🏡 空间氛围",
      tags: ["环境清雅", "老屋温存", "柴烟袅袅", "禅意静谧", "江南洋房", "小憩良所"]
    },
    {
      label: "👨‍🍳 匠心服务",
      tags: ["和蔼诚热", "主厨详解", "手工现做", "真材实料", "服务细致", "古法温厚"]
    }
  ];

  // Toggle tag selected status
  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Drag and drop uploading emulation
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const randomPreset = foodPhotoPresets[Math.floor(Math.random() * foodPhotoPresets.length)].url;
    if (!uploadedPhotos.includes(randomPreset)) {
      setUploadedPhotos([...uploadedPhotos, randomPreset]);
    }
  };

  const handleFileSelect = () => {
    const available = foodPhotoPresets.find((p) => !uploadedPhotos.includes(p.url));
    if (available) {
      setUploadedPhotos([...uploadedPhotos, available.url]);
    } else {
      setUploadedPhotos([...uploadedPhotos, foodPhotoPresets[0].url]);
    }
  };

  const removeUploaded = (url: string) => {
    setUploadedPhotos(uploadedPhotos.filter((item) => item !== url));
  };

  // Handle Review Submission
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText("");

    if (!selectedMerchantId) {
      setErrorText("您必须挑选一家您深度品评的手工匠人商家哦。");
      return;
    }

    if (reviewText.trim().length < 15) {
      setErrorText("写点深刻的味觉感受吧！撰写的食评文本字数建议不少于15个字哦。");
      return;
    }

    const chosenMerchant = merchants.find((m) => m.id === selectedMerchantId);
    if (!chosenMerchant) return;

    const overallScore = parseFloat(
      ((tasteRating + ambienceRating + serviceRating) / 3.0).toFixed(1)
    );

    const newReview = {
      merchantId: chosenMerchant.id,
      merchantName: chosenMerchant.name,
      user: {
        name: "美食寻味",
        avatar: "https://i.postimg.cc/ry96jBL4/artisanal-sourdough-1780274060881.jpg",
        level: "探店先锋"
      },
      rating: {
        taste: tasteRating,
        ambience: ambienceRating,
        ingredients: serviceRating, // Synchronizes into behind-the-scenes "ingredients" field schema
        overall: overallScore
      },
      content: reviewText.trim(),
      images: uploadedPhotos,
      tags: selectedTags.length > 0 ? selectedTags : ["味道惊艳", "手工现做"]
    };

    setShowSuccess(true);
    setTimeout(() => {
      onAddReview(newReview);
      setShowSuccess(false);

      // Reset form states
      setReviewText("");
      setUploadedPhotos([]);
      setSelectedTags([]);
      setIsFormExpanded(false);
    }, 1500);
  };

  // Like engine handler
  const handleLikeClick = (reviewId: string) => {
    if (onLikeReview) {
      onLikeReview(reviewId);
    } else {
      // Local fallback
      if (localLikedIds.includes(reviewId)) {
        setLocalLikedIds(localLikedIds.filter((id) => id !== reviewId));
        setLocalLikeCounts({
          ...localLikeCounts,
          [reviewId]: (localLikeCounts[reviewId] || 0) - 1
        });
      } else {
        setLocalLikedIds([...localLikedIds, reviewId]);
        setLocalLikeCounts({
          ...localLikeCounts,
          [reviewId]: (localLikeCounts[reviewId] || 0) + 1
        });
      }
    }
  };

  // Compile combined list of reviews and apply search, filter, and sort presets
  const compiledReviews = useMemo(() => {
    return reviews
      .map((r) => {
        // Enforce the liked indicator state
        const isLikedLocally = localLikedIds.includes(r.id);
        const addedCount = localLikeCounts[r.id] || 0;
        return {
          ...r,
          isLiked: isLikedLocally,
          likes: r.likes + addedCount
        };
      })
      .filter((r) => {
        // Search filter matching shop name or content
        const matchSearch =
          r.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (r.tags && r.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

        if (!matchSearch) return false;

        // Rating filters
        if (ratingFilter === "excellent") {
          return r.rating.overall >= 4.8;
        } else if (ratingFilter === "good") {
          return r.rating.overall >= 4.0 && r.rating.overall < 4.8;
        } else if (ratingFilter === "photo") {
          return r.images && r.images.length > 0;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "new") {
          return b.date.localeCompare(a.date);
        } else {
          // Hot sorting (number of likes desc)
          return b.likes - a.likes;
        }
      });
  }, [reviews, searchQuery, ratingFilter, sortBy, localLikedIds, localLikeCounts]);

  const livePreviewOverall = useMemo(() => {
    return parseFloat(((tasteRating + ambienceRating + serviceRating) / 3.0).toFixed(1));
  }, [tasteRating, ambienceRating, serviceRating]);

  return (
    <div className="space-y-8" id="community-reviews-plaza">
      {/* 1. Header Hero Display */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-amber-900 via-amber-950 to-stone-900 text-white p-8 md:p-12 shadow-xl border border-stone-800">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-65">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://www.pexels.com/zh-cn/download/video/6206263/" type="video/mp4" />
          </video>
          {/* Subtle dark tint overlay on top of the video to preserve rich text legibility and brand colors */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-amber-700/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-80 h-80 rounded-full bg-yellow-600/5 blur-3xl pointer-events-none" />

        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 rounded-full border border-amber-400/20 text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold font-mono tracking-widest uppercase">Community Plaza</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-serif font-black tracking-tight leading-none text-stone-100">
            食评分享广场<span className="text-amber-400">.</span>
          </h2>
          <p className="text-stone-300 text-xs md:text-sm leading-relaxed font-sans max-w-xl">
            记录真实的柴米油盐与人间烟火。在此分享您在街角慢烘坊、百年古镇茶楼或是邻里馄饨铺最深刻的探店感知。每一字，皆具温度。
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setIsFormExpanded(!isFormExpanded)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-stone-950 text-xs font-bold rounded-xl shadow-lg transition-all cursor-pointer"
              id="expand-review-editor-btn"
            >
              {isFormExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span>收起评价箱</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>我也要分享一次探店</span>
                </>
              )}
            </button>
            <div className="inline-flex items-center gap-2 text-xs text-amber-200/80 px-2 py-2.5 bg-white/5 rounded-xl border border-white/10">
              <MessageSquare className="w-4 h-4" />
              <span>本街区已有 {reviews.length} 篇真实食评分享</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Success Alert overlay for Form expands */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl space-y-4 border border-stone-150"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-serif font-black text-stone-900">发布食评成功！</h3>
                <p className="text-xs text-stone-500">
                  您的探店评论已实时同步至匠人美味版图。感谢您用文字擦亮隐秘的美食之光。
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsible interactive Writing form card container */}
      <AnimatePresence>
        {isFormExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white p-6 md:p-8 rounded-3xl border border-stone-200 shadow-sm">
              <form onSubmit={handleSubmitReview} className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-[10px] text-amber-700 font-mono tracking-widest uppercase block font-bold">Write Your Evaluation</span>
                  <h3 className="text-lg font-serif font-black text-stone-900">撰写我的匠心食评</h3>
                </div>

                {/* 1. Shop select dropdown with simple HTML structure styled beautifully */}
                <div className="space-y-2">
                  <label htmlFor="shop-selector" className="text-xs font-bold text-stone-700 uppercase tracking-wide flex items-center gap-1.5 font-serif">
                    <span className="w-1 h-3.5 bg-amber-705 bg-amber-700 rounded-xs"></span>
                    选择探店商家 (Browse Artisan Shop)
                  </label>
                  <select
                    id="shop-selector"
                    value={selectedMerchantId}
                    onChange={(e) => handleMerchantChange(e.target.value)}
                    className="w-full text-xs text-stone-800 py-3 px-4 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:ring-1 focus:ring-amber-800 transition-all cursor-pointer font-serif"
                  >
                    {merchants.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.category} · {m.subtitle})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Star Multi Dimensions selections */}
                <section className="space-y-4 bg-amber-50/20 p-5 rounded-2xl border border-amber-900/5">
                  <h4 className="text-xs font-serif font-black text-amber-900 uppercase tracking-wider flex items-center gap-2 border-b border-amber-950/5 pb-2">
                    <Layers className="w-4 h-4 text-amber-800" />
                    多维度星级评分 (Dimensional Evaluation)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Taste Rating */}
                    <div className="space-y-1 px-1">
                      <span className="text-[11px] text-stone-500 font-mono block font-medium">极致风味 (Taste)</span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => setTasteRating(idx + 1)}
                            className="text-lg text-amber-400 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                          >
                            {idx < tasteRating ? "★" : "☆"}
                          </button>
                        ))}
                        <span className="text-xs font-mono font-bold text-[#3B5323] ml-2">{tasteRating}.0</span>
                      </div>
                    </div>

                    {/* Ambience Rating */}
                    <div className="space-y-1 px-1">
                      <span className="text-[11px] text-stone-500 font-mono block font-medium">环境清修 (Ambience)</span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => setAmbienceRating(idx + 1)}
                            className="text-lg text-amber-400 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                          >
                            {idx < ambienceRating ? "★" : "☆"}
                          </button>
                        ))}
                        <span className="text-xs font-mono font-bold text-[#3B5323] ml-2">{ambienceRating}.0</span>
                      </div>
                    </div>

                    {/* Service/Ingredients Rating */}
                    <div className="space-y-1 px-1">
                      <span className="text-[11px] text-stone-500 font-mono block font-medium">匠心服务 (Service)</span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => setServiceRating(idx + 1)}
                            className="text-lg text-amber-400 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                          >
                            {idx < serviceRating ? "★" : "☆"}
                          </button>
                        ))}
                        <span className="text-xs font-mono font-bold text-[#3B5323] ml-2">{serviceRating}.0</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3. Preset Tags choices categorized beautifully */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-stone-700 uppercase block font-serif">推荐特色标签 (Artisanal Custom Tags Selection)</span>
                  <div className="space-y-2.5">
                    {tagCategories.map((cat, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <span className="text-[10px] text-stone-400 font-mono block">{cat.label}</span>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.tags.map((tag) => {
                            const isSelected = selectedTags.includes(tag);
                            return (
                              <button
                                type="button"
                                key={tag}
                                onClick={() => handleToggleTag(tag)}
                                className={`px-2 py-1 rounded-lg text-[10px] tracking-wide transition-all ${
                                  isSelected
                                    ? "bg-[#eef3e9] text-[#3b5323] border border-[#3b5323]/25 font-bold"
                                    : "bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                                }`}
                              >
                                {tag}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Description textarea */}
                <div className="space-y-2">
                  <label htmlFor="review-textarea" className="text-xs font-bold text-stone-700 uppercase tracking-wide block font-serif">
                    探店味觉及空间感悟 (Artisanal Scribe)
                  </label>
                  <textarea
                    id="review-textarea"
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="在这里记录您最真实的味觉特写与温暖感触，例如：“苏妈妈包的荠菜馄饨，薄皮在汤水里莹莹如雪，咬下去，荠菜清露混着手剁猪肉，鲜得像是在牙齿缝里装了江南春晓。暖猪油在木耳汤里微闪，极为宽慰……”"
                    className="w-full text-xs text-stone-800 p-4 border border-stone-200 bg-stone-50/50 rounded-xl outline-none focus:bg-white focus:ring-1 focus:ring-amber-800 transition-all placeholder-stone-400 font-sans resize-none leading-relaxed"
                  />
                </div>

                {/* 5. Photo area with custom select presets */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-stone-700 uppercase block font-serif">添加风味影像 (Artisanal Photos)</span>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    {/* Add Photo triggers Drag Drop */}
                    <div
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={handleFileSelect}
                      className="h-20 border-2 border-dashed border-stone-200 hover:border-amber-700 bg-stone-50 hover:bg-amber-50/10 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all p-2 text-center group"
                    >
                      <UploadCloud className="w-5 h-5 text-stone-400 group-hover:text-amber-700 transition" />
                      <span className="text-[8px] text-stone-500 font-sans block mt-1">本地拖曳及上传</span>
                    </div>

                    {/* Rendering uploaded photos thumbnails */}
                    {uploadedPhotos.map((url, i) => (
                      <div
                        key={i}
                        className="h-20 rounded-xl border border-stone-200 overflow-hidden relative group bg-stone-50"
                      >
                        <img
                          src={url}
                          alt="Review thumbnail"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          type="button"
                          onClick={() => removeUploaded(url)}
                          className="absolute top-1 right-1 w-4 h-4 bg-black/60 hover:bg-rose-500 text-white rounded-full text-[9px] flex items-center justify-center transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Preset quick tap list */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-stone-400 font-mono block">没有合适照片？点击下方系统精选素材图一键添加：</span>
                    <div className="flex flex-wrap gap-1.5">
                      {foodPhotoPresets.map((preset) => {
                        const isAdded = uploadedPhotos.includes(preset.url);
                        return (
                          <button
                            type="button"
                            key={preset.id}
                            onClick={() => {
                              if (isAdded) {
                                removeUploaded(preset.url);
                              } else {
                                setUploadedPhotos([...uploadedPhotos, preset.url]);
                              }
                            }}
                            className={`px-2 py-0.5 border rounded-lg text-[9px] font-medium transition-all ${
                              isAdded
                                ? "bg-amber-100 border-amber-900/20 text-amber-950 font-bold"
                                : "bg-white border-stone-200 text-stone-500 hover:bg-stone-50"
                            }`}
                          >
                            {isAdded ? `✓ 已加 ${preset.name}` : `+ ${preset.name}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 6. Location Tag fields override */}
                <div className="space-y-2">
                  <label htmlFor="location-tag" className="text-xs font-bold text-stone-700 uppercase tracking-wide flex items-center gap-1 font-serif">
                    <MapPin className="w-3.5 h-3.5 text-amber-700" />
                    食享定位点 (Location Label)
                  </label>
                  <input
                    type="text"
                    id="location-tag"
                    value={locationTag}
                    onChange={(e) => setLocationTag(e.target.value)}
                    className="w-full text-xs text-stone-800 py-3 px-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:bg-white focus:ring-1 focus:ring-amber-800"
                  />
                </div>

                {errorText && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-1.5">
                    <span>{errorText}</span>
                  </div>
                )}

                <div className="flex gap-3 border-t border-stone-100 pt-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 bg-amber-800 hover:bg-amber-900 active:scale-98 text-amber-50 text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
                    id="submit-plaza-review-btn"
                  >
                    发布我的寻味感悟
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFormExpanded(false)}
                    className="py-3 px-5 bg-white hover:bg-stone-50 text-stone-600 border border-stone-200 text-xs font-medium rounded-xl transition-colors"
                  >
                    取消
                  </button>
                </div>
              </form>

              {/* Collateral Side Card: live preview widget highlighting design craftsmanship */}
              <div className="lg:col-span-5 bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4 shadow-3xs sticky top-24 self-start">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <span className="text-[10px] text-stone-400 font-mono tracking-widest uppercase block font-bold">Live Preview Preview</span>
                  <div className="p-1 px-2 bg-amber-100 rounded-md text-[9px] text-amber-800 font-serif font-black flex items-center gap-1 animate-pulse">
                    <Sparkles className="w-3 h-3" />
                    <span>实时卡片预览</span>
                  </div>
                </div>

                {/* Simulated review element card */}
                <div className="bg-white rounded-xl p-4.5 border border-stone-150 space-y-4 shadow-sm relative overflow-hidden">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-amber-900/10">
                        <img
                          src="https://i.postimg.cc/ry96jBL4/artisanal-sourdough-1780274060881.jpg"
                          alt="Avatar"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-serif font-black text-stone-900">美食寻味</span>
                          <span className="text-[8px] bg-amber-800 text-amber-50 px-1 py-0.5 rounded-sm font-mono uppercase">探店先锋</span>
                        </div>
                        <span className="text-[8px] text-stone-400 font-mono tracking-wider italic block">JUST NOW</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-amber-900 font-serif font-bold bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-950/5">
                        ★ {livePreviewOverall.toFixed(1)} 分
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-stone-400 block mb-1">评论内容:</span>
                    <p className="text-xs text-stone-700 leading-relaxed font-sans line-clamp-3">
                      {reviewText.trim() || "(还未动笔，写下您唇齿留香的故事……)"}
                    </p>
                  </div>

                  {uploadedPhotos.length > 0 && (
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      {uploadedPhotos.slice(0, 3).map((url, i) => (
                        <div key={i} className="aspect-square rounded-lg overflow-hidden border border-stone-200">
                          <img src={url} alt="live" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Render simulated review tags */}
                  <div className="flex flex-wrap gap-1 pt-1.5">
                    {selectedTags.map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 bg-[#eef3e9] text-[#3b5323] text-[9px] rounded-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400">
                    <span className="flex items-center gap-1 font-serif text-stone-500 font-black">
                      📍 {merchants.find((m) => m.id === selectedMerchantId)?.name || "匠人商铺"}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Heart className="w-3.5 h-3.5 text-stone-300" />
                      0人赞同
                    </span>
                  </div>
                </div>

                <div className="bg-amber-100/30 p-4 rounded-xl border border-amber-900/5 space-y-2 text-[11px] leading-relaxed text-stone-600">
                  <h5 className="font-serif font-bold text-amber-950 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-800" /> 撰写有温度的食评秘籍
                  </h5>
                  <p>
                    <strong>避开流水账</strong>：别只说“好吃，态度好，还行”。尽量说出具体的发酵香、木炭火候，或者是老妈妈在灯光下揉面的粗糙手茧和微笑，这些温暖细节，才是寻找匠心本源的意义所在。
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Feed Filters & Controls wrapper */}
      <div className="bg-white border border-stone-200 p-5 rounded-3xl shadow-3xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Sort Tabs & Rating categories */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Custom rating tab buttons */}
          <button
            onClick={() => setRatingFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              ratingFilter === "all" ? "bg-amber-800 text-amber-50" : "bg-stone-50 text-stone-600 hover:bg-stone-100"
            }`}
          >
            全部评价 ({reviews.length})
          </button>
          <button
            onClick={() => setRatingFilter("excellent")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              ratingFilter === "excellent" ? "bg-[#eef3e9] text-[#3B5323] border border-[#3B5323]/20" : "bg-stone-50 text-stone-600 hover:bg-stone-100"
            }`}
          >
            ★ 极力推荐 (5.0 分)
          </button>
          <button
            onClick={() => setRatingFilter("good")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              ratingFilter === "good" ? "bg-amber-100/40 text-amber-950" : "bg-stone-50 text-stone-600 hover:bg-stone-100"
            }`}
          >
            ★ 精妙推荐 (4.0 - 4.7 分)
          </button>
          <button
            onClick={() => setRatingFilter("photo")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 ${
              ratingFilter === "photo" ? "bg-stone-900 text-white" : "bg-stone-50 text-stone-600 hover:bg-stone-100"
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            有图食评
          </button>
        </div>

        {/* Search bar & Sort order switches */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Inner Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索手作店名、标签或内容..."
              className="w-full sm:w-56 pl-10 pr-3.5 py-2 text-xs border border-stone-200 bg-stone-50/50 rounded-xl outline-none focus:ring-1 focus:ring-amber-800 focus:bg-white"
            />
          </div>

          {/* Sort By Toggle switch */}
          <div className="border border-stone-200 bg-stone-50 rounded-xl p-0.5 flex gap-0.5 self-start sm:self-auto">
            <button
              onClick={() => setSortBy("hot")}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                sortBy === "hot" ? "bg-white text-stone-900 shadow-3xs" : "text-stone-400 hover:text-stone-700"
              }`}
            >
              热门推荐
            </button>
            <button
              onClick={() => setSortBy("new")}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                sortBy === "new" ? "bg-white text-stone-900 shadow-3xs" : "text-stone-400 hover:text-stone-700"
              }`}
            >
              最新发布
            </button>
          </div>
        </div>
      </div>

      {/* 5. Food Reviews Grid listings (展现其他人的评价例子，内容丰富) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="community-reviews-feed-container">
        {compiledReviews.length > 0 ? (
          compiledReviews.map((item) => (
            <motion.article
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              key={item.id}
              className="bg-white border border-stone-200 rounded-3xl p-6 shadow-3xs flex flex-col justify-between hover:shadow-md hover:border-amber-900/10 transition-all group"
            >
              <div className="space-y-4">
                {/* Reviewer Header Row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-amber-900/10 overflow-hidden bg-stone-50">
                      <img
                        src={item.user.avatar}
                        alt={item.user.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-serif font-black text-stone-950 block">
                          {item.user.name}
                        </span>
                        <span className="px-1.5 py-0.5 bg-amber-800 text-amber-50 text-[8px] font-bold rounded-sm uppercase tracking-wider scale-90 origin-left">
                          {item.user.level}
                        </span>
                      </div>
                      <span className="text-[9px] text-stone-400 font-mono block">
                        {item.date}
                      </span>
                    </div>
                  </div>

                  {/* Rating summary */}
                  <div className="text-right">
                    <div className="text-amber-500 font-semibold text-xs flex items-center justify-end gap-1 font-serif">
                      <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                      <span>{item.rating.overall.toFixed(1)}分</span>
                    </div>
                    <span className="text-[8px] text-stone-400 font-mono">OVERALL RATING</span>
                  </div>
                </div>

                {/* Sub ratings breakdown chart for specific dimensions to render richness */}
                <div className="bg-stone-50/50 p-3 rounded-2xl border border-stone-200/50 grid grid-cols-3 gap-2 text-center text-[10px] text-stone-500 font-mono">
                  <div>
                    <span>口味: </span>
                    <strong className="text-[#3b5323]">{item.rating.taste}.0</strong>
                  </div>
                  <div className="border-x border-stone-200">
                    <span>环境: </span>
                    <strong className="text-[#3b5323]">{item.rating.ambience}.0</strong>
                  </div>
                  <div>
                    <span>材料/服务: </span>
                    <strong className="text-[#3b5323]">{item.rating.ingredients}.0</strong>
                  </div>
                </div>

                {/* Deep Gourmet Review Content Scribe */}
                <p className="text-[12px] md:text-xs text-stone-700 leading-relaxed font-sans first-letter:text-base first-letter:font-serif first-letter:font-black first-letter:text-amber-800">
                  {item.content}
                </p>

                {/* Review images gallery attached */}
                {item.images && item.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {item.images.map((photoUrl, photoIdx) => (
                      <div
                        key={photoIdx}
                        className="aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 relative group/photo cursor-zoom-in"
                      >
                        <img
                          src={photoUrl}
                          alt="Gourmet detail"
                          className="w-full h-full object-cover group-hover/photo:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px]">
                          点赞分享
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer action, merchant locator and like interactive trigger */}
              <div className="pt-4 mt-4 border-t border-stone-100/75 flex items-center justify-between">
                {/* Link to commented shop indicator */}
                <span className="inline-flex items-center gap-1 text-[11px] font-serif font-black text-amber-800 bg-amber-50/70 border border-amber-900/5 px-2.5 py-1 rounded-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700 block animate-pulse"></span>
                  📍 对其点评: {item.merchantName}
                </span>

                {/* Interactive Like action button trigger */}
                <button
                  type="button"
                  onClick={() => handleLikeClick(item.id)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-bold font-mono tracking-wider transition-all select-none cursor-pointer ${
                    item.isLiked
                      ? "bg-rose-50 text-rose-600 border border-rose-200 shadow-3xs text-rose-700"
                      : "bg-stone-50 border border-stone-200 hover:border-stone-300 text-stone-500 hover:text-stone-700"
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 transition-all ${
                      item.isLiked ? "fill-rose-500 stroke-rose-500 scale-120 animate-wiggle" : "text-stone-300"
                    }`}
                  />
                  <span>{item.likes}人赞同</span>
                </button>
              </div>

              {/* Tag row */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-dashed border-stone-100 mt-3">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-stone-50 border border-stone-200/80 rounded-md text-[9px] text-stone-500 font-serif leading-none"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.article>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 py-16 text-center space-y-4">
            <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-stone-400 mx-auto border border-stone-150">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-serif font-black text-stone-850">未找到相符的食评</h4>
              <p className="text-xs text-stone-400 max-w-md mx-auto">
                可以尝试更换筛选条件或重置上面的搜索框，我们期待听到您关于手工美食商铺的第一声叹词！
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
