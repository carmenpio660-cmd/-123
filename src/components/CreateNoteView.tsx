import React, { useState } from "react";
import { Merchant, ExplorationNote } from "../types";
import { ArrowLeft, BookOpen, Camera, MapPin, UploadCloud, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CreateNoteViewProps {
  merchants: Merchant[];
  onSubmitNote: (newNote: Omit<ExplorationNote, "id" | "date" | "likes">) => void;
  onBack: () => void;
}

export default function CreateNoteView({ merchants, onSubmitNote, onBack }: CreateNoteViewProps) {
  // Fields state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedMerchantId, setSelectedMerchantId] = useState(merchants[0]?.id || "");
  const [locationText, setLocationText] = useState(merchants[0]?.address || "上海市 静安街区");

  // Selection tags
  const [selectedTaste, setSelectedTaste] = useState("味道惊艳");
  const [selectedAmbience, setSelectedAmbience] = useState("环境清雅");
  const [selectedService, setSelectedService] = useState("和蔼诚挚");

  // Uploaded photo array
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [errorText, setErrorText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Preset appetizing culinary note images
  const notePhotoPresets = [
    {
       id: "note1",
       name: "窑烤欧包特写",
       url: "/src/assets/images/regenerated_image_1780277388309.jpg"
     },
    {
      id: "note2",
      name: "苏式馄饨沸水",
      url: "/src/assets/images/regenerated_image_1780276939655.jpg"
    },
    {
      id: "note3",
      name: "古法茶皿荔枝木",
      url: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "note4",
      name: "高山枫蜜凝结",
      url: "/src/assets/images/regenerated_image_1780054246786.jpg"
    }
  ];

  // Tag list alternatives
  const tasteOptions = ["味道惊艳", "麦香充盈", "汤底浓郁", "岩骨茶香", "酸脆可口", "咸甜均适"];
  const ambienceOptions = ["环境清雅", "林间小憩", "弄堂温存", "柴火窑烧", "庭院微澜", "极简宋风"];
  const serviceOptions = ["和蔼诚挚", "匠人手作", "主厨特供", "细心周密", "独立私房", "古法熬煮"];

  // Drag-and-drop mechanics
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const randomPreset = notePhotoPresets[Math.floor(Math.random() * notePhotoPresets.length)].url;
    if (!uploadedPhotos.includes(randomPreset)) {
      setUploadedPhotos([...uploadedPhotos, randomPreset]);
    }
  };

  const handleSelectLocal = () => {
    const nextAvailable = notePhotoPresets.find(p => !uploadedPhotos.includes(p.url));
    if (nextAvailable) {
      setUploadedPhotos([...uploadedPhotos, nextAvailable.url]);
    } else {
      setUploadedPhotos([...uploadedPhotos, notePhotoPresets[0].url]);
    }
  };

  const handleRemovePhoto = (url: string) => {
    setUploadedPhotos(uploadedPhotos.filter(pic => pic !== url));
  };

  const handleMerchantSelectChange = (merchantId: string) => {
    setSelectedMerchantId(merchantId);
    const shop = merchants.find(m => m.id === merchantId);
    if (shop) {
      setLocationText(shop.address);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText("");

    if (!title.trim()) {
      setErrorText("给精心记录的随笔起一个闪闪发光的标题吧。");
      return;
    }

    if (content.trim().length < 15) {
      setErrorText("探店故事正文建议不少于15个字哦，多描述一点细节吧！");
      return;
    }

    const linkedMerchant = merchants.find(m => m.id === selectedMerchantId);
    const categoryName = linkedMerchant ? linkedMerchant.category : "手工寻味";

    const newNotePartial = {
      title: title.trim(),
      content: content.trim(),
      images: uploadedPhotos.length > 0 ? uploadedPhotos : [notePhotoPresets[0].url],
      tags: {
        taste: selectedTaste,
        ambience: selectedAmbience,
        service: selectedService
      },
      location: locationText,
      author: "美食寻味",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCBTkFagJRH7f1-qIS-6M996dNw1SpN59Wm9183meenCmXrb3jUPyeWo8KUEpkhNEhojsLkNQ96LWtUp3H1LwLnrLLdqZ2kkbHjnlvZvCQgzv5IzyLVIzKeh7uZp7yidtinv9bNY0GG12SnIasxrvOrYLscEaMWVFzWY1ntDgfHbwo9qWoQVaPHPqwtzH5WbcccstIotByXmnC99HDdrgVlBKgtscGDoQdrNO_PSEX0T3liPY8EXUYKrF54poTJlbhpBUX7Rscvw",
      category: categoryName
    };

    setShowSuccess(true);
    setTimeout(() => {
      onSubmitNote(newNotePartial);
      setShowSuccess(false);
    }, 1500);
  };

  return (
    <div className="relative space-y-6 pb-16">
      {/* Go Back action header link */}
      <div className="border-b border-stone-200/50 pb-4">
        <button
          onClick={onBack}
          className="group flex items-center gap-1.5 text-xs font-semibold text-stone-605 hover:text-[#5C7A44] transition-colors cursor-pointer"
          id="create-note-back"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          返回个人主页
        </button>
      </div>

      {/* Success Animation Overlay view */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#FAF8F2]/98 backdrop-blur-xs z-30 flex flex-col items-center justify-center space-y-4 text-center rounded-2xl"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 360 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <CheckCircle2 className="w-16 h-16 text-[#5C7A44]" />
            </motion.div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-serif font-black text-stone-900">发布随笔手记成功！</h3>
              <p className="text-xs text-stone-550 font-sans max-w-sm">
                您的笔记已汇入社区精选，并且自动提升了“探店先锋”以及“市集猎人”的成就荣誉进度！
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Note Editor Left Form Area */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 bg-white border border-stone-200/80 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs">
          <div className="space-y-1.5">
            <span className="text-[10px] text-[#5C7A44] font-mono tracking-widest uppercase block">Crafting Explorer Note</span>
            <h2 className="text-xl font-serif font-black text-stone-950">
              撰写新的探店手记 · 记录微光生活
            </h2>
          </div>

          {/* 1. Note title input */}
          <div className="space-y-2">
            <label htmlFor="note-title" className="text-xs text-stone-700 font-bold font-serif uppercase block">
              手记标题 (Note Title)
            </label>
            <input
              type="text"
              id="note-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例如：窑烤红豆欧包的温存，配上一盏手制荔枝炭红茶"
              className="w-full text-sm text-stone-800 py-3 px-4 border border-stone-250 rounded-xl bg-stone-50/50 focus:bg-white outline-none focus:ring-1 focus:ring-[#7A9A61]"
            />
          </div>

          {/* 2. Content story textarea */}
          <div className="space-y-2">
            <label htmlFor="note-content" className="text-xs text-stone-700 font-bold font-serif uppercase block">
              手记正文 (Story Content)
            </label>
            <textarea
              id="note-content"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="描述食物或环境、手工艺制品制作过程中的动人温度与口味特写，在这里流淌您的真实感情..."
              className="w-full text-sm text-stone-850 p-4 border border-stone-250 rounded-xl bg-stone-50/50 focus:bg-white outline-none focus:ring-1 focus:ring-[#7A9A61] placeholder-stone-400 font-sans resize-none leading-relaxed"
            />
          </div>

          {/* 3. Drop down to link with merchant in city */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="note-merchant" className="text-xs text-stone-700 font-bold font-serif uppercase block">
                关联匠人店铺 (Link Shop)
              </label>
              <select
                id="note-merchant"
                value={selectedMerchantId}
                onChange={(e) => handleMerchantSelectChange(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-stone-250 bg-stone-50 text-stone-800 outline-none focus:ring-1 focus:ring-[#7A9A61]"
              >
                {merchants.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Location selector / input */}
            <div className="space-y-2">
              <label htmlFor="note-location" className="text-xs text-stone-700 font-bold font-serif uppercase block">
                打卡地理位置 (Geo Location)
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="note-location"
                  value={locationText}
                  onChange={(e) => setLocationText(e.target.value)}
                  className="w-full text-xs text-stone-800 pl-9 pr-4 py-3 border border-stone-250 rounded-xl bg-stone-50 outline-none focus:ring-1 focus:ring-[#7A9A61]"
                />
                <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-[#5C7A44]" />
              </div>
            </div>
          </div>

          {/* 4. Granular interactive TAG elements: Taste / Environment / Service */}
          <section className="space-y-4 bg-[#FAF8F2]/60 p-5 rounded-2xl border border-[#7A9A61]/15">
            <h3 className="text-xs font-serif font-black text-[#5C7A44] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#7A9A61]/10 pb-2">
              <span className="w-1.5 h-3.5 bg-[#7A9A61] rounded-sm"></span>
              美食标签选择颗粒选项 (Artisanal Custom Tags)
            </h3>

            <div className="space-y-4 pt-1">
              {/* 口味 */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-stone-500 font-mono block">极致口味描述 (Taste Tag)</span>
                <div className="flex flex-wrap gap-2">
                  {tasteOptions.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setSelectedTaste(t)}
                      className={`px-3 py-1.5 border text-xs rounded-lg transition-all cursor-pointer ${
                        selectedTaste === t
                          ? "bg-[#7A9A61] border-[#5C7A44] text-white font-semibold"
                          : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* 环境 */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-stone-500 font-mono block">环境清修感触 (Ambience Tag)</span>
                <div className="flex flex-wrap gap-2">
                  {ambienceOptions.map((a) => (
                    <button
                      type="button"
                      key={a}
                      onClick={() => setSelectedAmbience(a)}
                      className={`px-3 py-1.5 border text-xs rounded-lg transition-all cursor-pointer ${
                        selectedAmbience === a
                          ? "bg-[#7A9A61] border-[#5C7A44] text-white font-semibold"
                          : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* 服务 */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-stone-500 font-mono block">服务以及态度感官 (Service Tag)</span>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSelectedService(s)}
                      className={`px-3 py-1.5 border text-xs rounded-lg transition-all cursor-pointer ${
                        selectedService === s
                          ? "bg-[#7A9A61] border-[#5C7A44] text-white font-semibold"
                          : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 5. Upload photo attachments */}
          <div className="space-y-3">
            <span className="text-xs text-stone-700 font-bold font-serif uppercase block">
              手记图片上传 (Artisan Photo Gallery)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
              {/* Drop area */}
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleSelectLocal}
                className="h-28 border-2 border-dashed border-[#7A9A61]/40 hover:border-[#7A9A61] bg-[#FAF8F2]/40 hover:bg-[#FAF8F2] rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all p-3 space-y-1.5 group"
              >
                <UploadCloud className="w-6 h-6 text-stone-400 group-hover:text-[#5C7A44] transition-colors" />
                <span className="text-[10px] text-stone-500 font-sans block">本地拖曳 / 点击上传</span>
                <span className="text-[8px] text-stone-400 font-mono">JPG, PNG support</span>
              </div>

              {/* Thumbnails */}
              {uploadedPhotos.map((url, idx) => (
                <div
                  key={idx}
                  className="h-28 rounded-2xl border border-stone-200 overflow-hidden relative group bg-stone-50"
                >
                  <img
                    src={url}
                    alt="Uploaded note scene"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(url)}
                    className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-rose-600 text-white rounded-full text-[9px] transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Quick pre-seeded additions */}
            <div className="space-y-1">
              <span className="text-[9px] text-stone-400 font-mono tracking-wider block">快速使用精美手艺图素材（点击一键添减）：</span>
              <div className="flex flex-wrap gap-2">
                {notePhotoPresets.map((pic) => {
                  const alreadySaved = uploadedPhotos.includes(pic.url);
                  return (
                    <button
                      type="button"
                      key={pic.id}
                      onClick={() => {
                        if (alreadySaved) {
                          handleRemovePhoto(pic.url);
                        } else {
                          setUploadedPhotos([...uploadedPhotos, pic.url]);
                        }
                      }}
                      className={`px-2 py-1 border rounded text-[9px] font-medium transition-all ${
                        alreadySaved
                          ? "bg-[#eef3e9] border-[#7A9A61]/30 text-[#3B5323] font-semibold"
                          : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                      }`}
                    >
                      {alreadySaved ? `✓ 已选${pic.name}` : pic.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Validation error indicators */}
          {errorText && (
            <div className="flex items-center gap-2 bg-rose-50 text-rose-700 p-3.5 rounded-xl text-xs border border-rose-100">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorText}</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex gap-3 pt-4 border-t border-stone-100">
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-[#7A9A61] hover:bg-[#5C7A44] text-[#FAF8F2] rounded-xl font-semibold text-xs text-center transition-colors shadow-md hover:shadow-lg cursor-pointer"
              id="submit-note-button"
            >
              发布我的精品手记
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

        {/* Sidebar details */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-[#7A9A61] to-[#5C7A44] text-white rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#FAF8F2]" />
              <h3 className="text-xs font-serif font-black tracking-widest uppercase">探店手记创作指引</h3>
            </div>
            <ul className="space-y-3.5 text-[11px] text-[#FAF8F2]/90 leading-relaxed font-sans">
              <li className="flex gap-2">
                <span className="text-amber-300 font-bold font-mono">1.</span>
                <span><strong>诗意表达</strong>: 试着将刚砍好的荔枝炭红亮、面团在穹顶低语的过程诗意记录下来，字句是时间的指痕。</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-300 font-bold font-mono">2.</span>
                <span><strong>真实定位</strong>: 尽可能准确地绑定寻味所处的街道、弄堂名称，这能帮助同城匠心同好按图索骥。</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-300 font-bold font-mono">3.</span>
                <span><strong>感官颗粒</strong>: 从“口味、环境、服务”等三个维度中挑选出最点睛的一个标签词，突出此店风骨。</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#FAF8F2] rounded-2xl p-5 border border-[#7A9A61]/15 space-y-2">
            <h4 className="text-xs font-serif font-bold text-[#5C7A44]">
              手随笔范例 (Note Specimen):
            </h4>
            <p className="text-[11px] text-stone-500 italic leading-relaxed">
              “静安弄堂里的面馆，一口热汤下肚，太湖干虾米的温润鲜感在喉咙散开，是老头老太默默守护了三十年的好味道。隔壁老灶正温炖着白鸡，真好。”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
