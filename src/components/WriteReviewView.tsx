import React, { useState } from "react";
import { Merchant, Review } from "../types";
import { ArrowLeft, Star, Camera, MapPin, UploadCloud, AlertCircle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface WriteReviewViewProps {
  merchant: Merchant;
  onSelectSubmit: (review: Omit<Review, "id" | "date" | "likes">) => void;
  onBack: () => void;
}

export default function WriteReviewView({ merchant, onSelectSubmit, onBack }: WriteReviewViewProps) {
  // Star rating indices
  const [tasteRating, setTasteRating] = useState(5);
  const [ambienceRating, setAmbienceRating] = useState(5);
  const [ingredientsRating, setIngredientsRating] = useState(5);

  const [reviewText, setReviewText] = useState("");
  const [locationTag, setLocationTag] = useState(merchant.address);
  // Manual uploaded preset images (converting selected mock presets to links, or standard base64 if dropped)
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [errorText, setErrorText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // High-quality review photos the customer can "instant-upload" as preset
  const foodPhotoPresets = [
    {
      id: "preset1",
      name: "窑炉面团",
      url: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "preset2",
      name: "手舂辣酱",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIOwm6GLYmMR6F_si7yIVqb1Ll6kW9ttgS5P3pBwnHkunfzRQxoip3MU9iehtOU6PRfdlU0NFhBwMKX9mPZbF5nwN5MJbdt26tkgMr1qGy0m2mA69WvNbcs_G-yRF3JzIimgEZ7xTp8wIKq39EH5em2LLis17ZcEmEw7oo4Ual1VsKfIDUVJzy18RIyi8vq9AbWvmUCx88KCfFVPYpq7DeB--IpISgDR2mHVZNAZFcui3pkhPCM59lz95jXRSLF2ivByhRD3oyBQ"
    },
    {
      id: "preset3",
      name: "高山茶宴",
      url: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "preset4",
      name: "馄饨特写",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVrCLdsqvheLR2rmufTlbzQmCNL0zMfigSnVbAjPsZa9t1P7HAF3UXT7s0xYSApgLESdwjtXWGywdNKEv9UK24bueDuj6RAzwSG33Te0gBvWKj80KB-9tv9IrdBj66lHZwstUmIY6x088ewo1x6Cl72wd4hKrMtZ9V32tYkG3xuajUTJyhx3iHfumKeu8Nv6R-tNzkrj5Plxt-9JtUC6Pgv_KxLOvUfkLpgzOnStspO2n3E2aCibHvo1BP9DI8CyS1j-sJ6nnd2A"
    }
  ];

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    // Simulate drops adding the first preset
    const randomPreset = foodPhotoPresets[Math.floor(Math.random() * foodPhotoPresets.length)].url;
    if (!uploadedPhotos.includes(randomPreset)) {
      setUploadedPhotos([...uploadedPhotos, randomPreset]);
    }
  };

  const handleFileSelect = () => {
    // Select the first non-selected preset
    const available = foodPhotoPresets.find(p => !uploadedPhotos.includes(p.url));
    if (available) {
      setUploadedPhotos([...uploadedPhotos, available.url]);
    } else {
      setUploadedPhotos([...uploadedPhotos, foodPhotoPresets[0].url]);
    }
  };

  const removeUploaded = (url: string) => {
    setUploadedPhotos(uploadedPhotos.filter((item) => item !== url));
  };

  // Submit trigger validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText("");

    if (reviewText.trim().length < 15) {
      setErrorText("为保证食评质量，撰写的主体故事字数建议不少于15个字哦。");
      return;
    }

    const overallScore = parseFloat(
      ((tasteRating + ambienceRating + ingredientsRating) / 3.0).toFixed(1)
    );

    const newReviewPartial = {
      merchantId: merchant.id,
      merchantName: merchant.name,
      user: {
        name: "美食寻味",
        avatar: "https://i.postimg.cc/ry96jBL4/artisanal-sourdough-1780274060881.jpg",
        level: "资深探店 pioneer"
      },
      rating: {
        taste: tasteRating,
        ambience: ambienceRating,
        ingredients: ingredientsRating,
        overall: overallScore
      },
      content: reviewText.trim(),
      images: uploadedPhotos,
      tags: ["手擀热络", "味道惊艳", "环境清雅", "食材严选"].slice(0, Math.floor(Math.random() * 3) + 1)
    };

    setShowSuccess(true);
    setTimeout(() => {
      onSelectSubmit(newReviewPartial);
      setShowSuccess(false);
    }, 1500);
  };

  return (
    <div className="relative space-y-6 pb-16">
      {/* Back button */}
      <div className="border-b border-stone-200/50 pb-4">
        <button
          onClick={onBack}
          className="group flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-amber-900 transition-colors cursor-pointer"
          id="write-review-back"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          返回店铺
        </button>
      </div>

      {/* Success Animation view overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-stone-50/98 backdrop-blur-xs z-30 flex flex-col items-center justify-center space-y-4 text-center rounded-2xl"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 360 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <CheckCircle className="w-16 h-16 text-emerald-600" />
            </motion.div>
            <div className="space-y-1">
              <h3 className="text-lg font-serif font-black text-stone-900">发布评价成功！</h3>
              <p className="text-xs text-stone-500 font-sans">
                您的评价已实时录入美味版图，同时解锁了“探店先锋”荣誉进度！
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Core Review Form Frame */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 bg-white border border-stone-200/70 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs">
          <div className="space-y-1">
            <span className="text-[10px] text-amber-700 font-mono tracking-widest uppercase block">Writing Review</span>
            <h2 className="text-xl font-serif font-black text-stone-950">
              分享您的美食体验 · <span className="text-amber-700">{merchant.name}</span>
            </h2>
          </div>

          {/* Point dimensions */}
          <section className="space-y-4 bg-amber-50/30 p-5 rounded-2xl border border-amber-900/5">
            <h3 className="text-xs font-serif font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5 border-b border-amber-900/10 pb-2">
              <span className="w-1.5 h-3.5 bg-amber-600 rounded-sm"></span>
              评分详情 (Dimensions Rating)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-1">
              {/* Taste */}
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-xs text-stone-600 font-mono block">极致风味 (Taste)</span>
                <div className="flex items-center justify-center sm:justify-start gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setTasteRating(idx + 1)}
                      className="text-xl text-amber-400 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                    >
                      {idx < tasteRating ? "★" : "☆"}
                    </button>
                  ))}
                  <span className="text-xs font-bold font-mono text-stone-700 ml-1.5">{tasteRating}.0</span>
                </div>
              </div>

              {/* Ambience */}
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-xs text-stone-600 font-mono block">环境清修 (Ambience)</span>
                <div className="flex items-center justify-center sm:justify-start gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setAmbienceRating(idx + 1)}
                      className="text-xl text-amber-400 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                    >
                      {idx < ambienceRating ? "★" : "☆"}
                    </button>
                  ))}
                  <span className="text-xs font-bold font-mono text-stone-700 ml-1.5">{ambienceRating}.0</span>
                </div>
              </div>

              {/* Ingredients */}
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-xs text-stone-600 font-mono block">材料原度 (Ingredients)</span>
                <div className="flex items-center justify-center sm:justify-start gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setIngredientsRating(idx + 1)}
                      className="text-xl text-amber-400 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                    >
                      {idx < ingredientsRating ? "★" : "☆"}
                    </button>
                  ))}
                  <span className="text-xs font-bold font-mono text-stone-700 ml-1.5">{ingredientsRating}.0</span>
                </div>
              </div>
            </div>
          </section>

          {/* Textarea stories column */}
          <div className="space-y-2">
            <label htmlFor="review-content" className="text-xs text-stone-600 font-bold font-serif uppercase flex items-center gap-1.5">
              分享您的故事 (Your Artisanal Tale)
            </label>
            <textarea
              id="review-content"
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="面包咬下去麦香漫溢吗？弄堂拉面到底有无人情味？在这里记录下您最真切的探店感知、口味特写与环境感触..."
              className="w-full text-sm text-stone-800 p-4 border border-stone-250 rounded-xl bg-stone-50/50 focus:bg-white outline-none focus:ring-1 focus:ring-amber-800 placeholder-stone-400 transition-all font-sans resize-none"
            />
          </div>

          {/* Dynamic drag drop Uploader Zone */}
          <div className="space-y-3">
            <span className="text-xs text-stone-600 font-bold font-serif uppercase block">上传照片 (Photo Attachment)</span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
              {/* Uploader Box */}
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleFileSelect}
                className="h-28 border-2 border-dashed border-stone-300 hover:border-amber-700 bg-stone-50 hover:bg-amber-50/10 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all p-3 space-y-1 group"
              >
                <UploadCloud className="w-6 h-6 text-stone-400 group-hover:text-amber-800 transition-colors" />
                <span className="text-[10px] text-stone-500 font-sans block">本地拖曳 / 挑选</span>
                <span className="text-[8px] text-stone-400 font-mono italic">Support jpg, png</span>
              </div>

              {/* Rendered Uploads thumbnails list */}
              {uploadedPhotos.map((url, idx) => (
                <div
                  key={idx}
                  className="h-28 rounded-2xl border border-stone-200 overflow-hidden relative group bg-stone-100"
                >
                  <img
                    src={url}
                    alt="Upload thumbnail"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Delete button Overlay */}
                  <button
                    type="button"
                    onClick={() => removeUploaded(url)}
                    className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-rose-600 text-white rounded-full text-xs transition-colors focus:outline-none"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Photo preset selectors (helpful if the user does not want to upload real file in preview) */}
            <div className="space-y-1 pt-1">
              <span className="text-[9px] text-stone-400 font-mono uppercase tracking-wider block">无需本地上传？点踩下方精选素材图一键添加：</span>
              <div className="flex gap-2">
                {foodPhotoPresets.map((preset) => {
                  const added = uploadedPhotos.includes(preset.url);
                  return (
                    <button
                      type="button"
                      key={preset.id}
                      onClick={() => {
                        if (added) {
                          removeUploaded(preset.url);
                        } else {
                          setUploadedPhotos([...uploadedPhotos, preset.url]);
                        }
                      }}
                      className={`px-2 py-1 border rounded text-[9px] font-medium transition-all ${
                        added
                          ? "bg-amber-100 border-amber-900/20 text-amber-950 font-semibold"
                          : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                      }`}
                    >
                      {added ? `✓ 已加${preset.name}` : preset.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Location details */}
          <div className="space-y-2">
            <label htmlFor="review-location" className="text-xs text-stone-600 font-bold font-serif uppercase flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-700" />
              定位标签 (Location Tag)
            </label>
            <input
              type="text"
              id="review-location"
              value={locationTag}
              onChange={(e) => setLocationTag(e.target.value)}
              className="w-full text-xs text-stone-800 py-2.5 px-3 bg-stone-50 border border-stone-250 rounded-xl focus:bg-white outline-none focus:ring-1 focus:ring-amber-800"
            />
          </div>

          {/* Validation & Publish check */}
          {errorText && (
            <div className="flex items-center gap-2 bg-rose-50 text-rose-700 p-3.5 rounded-xl text-xs border border-rose-100">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorText}</span>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-stone-100">
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-amber-800 hover:bg-amber-900 text-amber-50 rounded-xl font-semibold text-xs text-center transition-colors shadow-md hover:shadow-lg cursor-pointer"
              id="submit-review-button"
            >
              发布我的探店食评
            </button>
            <button
              type="button"
              onClick={onBack}
              className="py-3 px-6 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 rounded-xl font-semibold text-xs transition-colors"
            >
              取消
            </button>
          </div>
        </form>

        {/* Right Columns: Guidelines & Review atmospheric advice context */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-stone-900 text-white rounded-2xl p-5 space-y-4 shadow-sm border border-stone-800">
            <div className="flex items-center gap-2 text-amber-400">
              <Camera className="w-5 h-5" />
              <h3 className="text-xs font-serif font-black tracking-widest uppercase">匠心食评公约</h3>
            </div>
            <ul className="space-y-3.5 text-[11px] text-stone-300 leading-relaxed font-sans">
              <li className="flex gap-2">
                <span className="text-amber-500 font-bold font-mono">1.</span>
                <span><strong>客观原度</strong>: 评价纯粹发自真实的味觉体验，对食材、口感和主厨制程保持客观描述。</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-500 font-bold font-mono">2.</span>
                <span><strong>重温人情</strong>: 除了食物本身，试着留意环境布置和周边街坊聊天的温暖人情。</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-500 font-bold font-mono">3.</span>
                <span><strong>抵制虚假</strong>: 拒绝灌水与纯机器模版话语。一段带有木柴烟熏或热汤蒸汽的温度文字，能让其他食客感知生活的温度。</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50/40 rounded-2xl p-5 border border-amber-900/5 space-y-4">
            <h4 className="text-xs font-serif font-bold text-amber-900">
              撰写技巧：
            </h4>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              试着从<strong>“口味特写、手艺工序、推荐搭配”</strong>等角度落笔。例如：“全麦欧包带着淡淡松木烟熏焦香，内壁润泽拉丝，搭配手沏大红袍让人惊艳！”一字一句皆是生活。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
