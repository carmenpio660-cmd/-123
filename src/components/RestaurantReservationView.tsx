import React, { useState, useEffect } from "react";
import { Merchant, Product } from "../types";
import { Calendar, Users, Clock, Plus, Minus, Check, MapPin, Sparkles, Ticket, Coffee, ShoppingBag, ChevronRight, X, Heart, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Reservation {
  id: string;
  merchant: Merchant;
  date: string;
  time: string;
  guestsCount: number;
  customerName: string;
  customerPhone: string;
  specialRequests: string[];
  tableId: string;
  preOrderedProducts: { product: Product; quantity: number }[];
  totalPrice: number;
}

interface RestaurantReservationViewProps {
  merchants: Merchant[];
  onSelectMerchant?: (merchantId: string) => void;
}

export default function RestaurantReservationView({ merchants, onSelectMerchant }: RestaurantReservationViewProps) {
  // Only display merchants that can reasonably take food orders (baking, organic, traditional, private dining, tea house, meals etc)
  const diningMerchants = merchants.filter(
    (m) => ["手工烘焙", "有机素食", "传统小吃", "匠心私厨", "茶事琴房", "私房膳食"].includes(m.category)
  );

  // Selected Merchant
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant>(diningMerchants[0] || merchants[0]);

  // Form states
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string>("18:30");
  const [selectedTable, setSelectedTable] = useState<string>("T3");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [specialNote, setSpecialNote] = useState<string>("");
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);

  // Menu pre-ordering state
  const [orderCart, setOrderCart] = useState<{ [productId: string]: number }>({});
  
  // Active sub-tab inside My Bookings vs. New Booking
  const [viewMode, setViewMode] = useState<"book" | "my-reservations">("book");

  // Local Storage key for mock reservations
  const [myReservations, setMyReservations] = useState<Reservation[]>([]);

  // Newly created reservation info for Ticket Modal
  const [newlyCreatedReservation, setNewlyCreatedReservation] = useState<Reservation | null>(null);

  // Load reservations on component mount
  useEffect(() => {
    const saved = localStorage.getItem("culinary_reservations");
    if (saved) {
      try {
        setMyReservations(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Update menu cart when merchant changes
  useEffect(() => {
    setOrderCart({});
  }, [selectedMerchant]);

  // Date Selection Options starting from today 2026-06-01
  const dateOptions = [
    { label: "今天 6月1日", subLabel: "周一", iso: "2026-06-01" },
    { label: "明天 6月2日", subLabel: "周二", iso: "2026-06-02" },
    { label: "后天 6月3日", subLabel: "周三", iso: "2026-06-03" },
    { label: "端午 6月4日", subLabel: "周四", iso: "2026-06-04" },
    { label: "周五 6月5日", subLabel: "周末档", iso: "2026-06-05" },
    { label: "周六 6月6日", subLabel: "热度档", iso: "2026-06-06" },
    { label: "周日 6月7日", subLabel: "闲适档", iso: "2026-06-07" },
  ];

  // Time Slots Selection
  const timeSlots = [
    { time: "11:30", type: "lunch", status: "满座" },
    { time: "12:30", type: "lunch", status: "余2桌" },
    { time: "13:30", type: "lunch", status: "可订" },
    { time: "17:30", type: "dinner", status: "余1桌" },
    { time: "18:30", type: "dinner", status: "热订中" },
    { time: "19:30", type: "dinner", status: "余3桌" },
    { time: "20:30", type: "dinner", status: "可订" },
    { time: "21:30", type: "midnight", status: "可订" },
  ];

  // Table map seats configuration
  // S = Window Seat, T = Cozy Center, V = Private Room, B = Chef's Counter
  const tableLayout = [
    { id: "S1", name: "S1 临窗双人雅座", size: 2, x: 20, y: 20, state: "taken" },
    { id: "S2", name: "S2 临窗阁楼双人", size: 2, x: 50, y: 20, state: "free" },
    { id: "S3", name: "S3 琴音流风双人", size: 2, x: 80, y: 20, state: "free" },
    { id: "T1", name: "T1 温暖方桌 2-4人", size: 4, x: 20, y: 55, state: "taken" },
    { id: "T2", name: "T2 温暖方桌 2-4人", size: 4, x: 50, y: 55, state: "taken" },
    { id: "T3", name: "T3 匠心居中 2-4人", size: 4, x: 80, y: 55, state: "free" },
    { id: "V1", name: "V1 「古槐」极尊包厢 (≤8人)", size: 8, x: 25, y: 85, state: "free" },
    { id: "V2", name: "V2 「独松」云阁包厢 (≤12人)", size: 12, x: 75, y: 85, state: "taken" },
  ];

  // Preset Special requests tags
  const requestsPresets = ["备辅婴儿椅", "忌大蒜辛辣", "临窗安静桌", "同行人生日", "需要温水"];

  // Quantity controllers for Order cart
  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setOrderCart(prev => {
      const current = prev[productId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: next };
    });
  };

  // Select Request tags
  const handleToggleRequest = (req: string) => {
    if (selectedRequests.includes(req)) {
      setSelectedRequests(selectedRequests.filter(r => r !== req));
    } else {
      setSelectedRequests([...selectedRequests, req]);
    }
  };

  // Calculation total reservation costs
  const cartTotalPrice = selectedMerchant.products.reduce((sum, p) => {
    const qty = orderCart[p.id] || 0;
    return sum + (p.price * qty);
  }, 0);

  const mockPreOrderItems = selectedMerchant.products
    .filter(p => orderCart[p.id] > 0)
    .map(p => ({
      product: p,
      quantity: orderCart[p.id]
    }));

  const depositFee = 50; // Booking holding seat deposit
  const finalTotalAmount = cartTotalPrice + depositFee;

  // Form submit callback
  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      alert("请输入您的预订姓名以留座");
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 5) {
      alert("请输入正确的手机号以便通知");
      return;
    }

    const compiledRequests = [...selectedRequests];
    if (specialNote.trim()) {
      compiledRequests.push(specialNote.trim());
    }

    const nextReservation: Reservation = {
      id: `RSV_${Date.now().toString().slice(-6)}`,
      merchant: selectedMerchant,
      date: dateOptions[selectedDateIndex].iso,
      time: selectedTime,
      guestsCount,
      customerName,
      customerPhone,
      specialRequests: compiledRequests,
      tableId: selectedTable,
      preOrderedProducts: mockPreOrderItems,
      totalPrice: finalTotalAmount
    };

    const nextList = [nextReservation, ...myReservations];
    setMyReservations(nextList);
    localStorage.setItem("culinary_reservations", JSON.stringify(nextList));

    // Show Beautiful Ticket Overlay
    setNewlyCreatedReservation(nextReservation);

    // Reset Form
    setCustomerName("");
    setCustomerPhone("");
    setSpecialNote("");
    setSelectedRequests([]);
    setOrderCart({});
  };

  // Delete Reservation handler
  const handleDeleteReservation = (id: string) => {
    const filtered = myReservations.filter(r => r.id !== id);
    setMyReservations(filtered);
    localStorage.setItem("culinary_reservations", JSON.stringify(filtered));
  };

  return (
    <div className="space-y-8" id="restaurant-booking-root">
      {/* Dynamic Header visual widget */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-stone-100 p-8 md:p-12 shadow-md border border-stone-800">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-65">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://www.pexels.com/zh-cn/download/video/6645796/" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-stone-950 via-stone-900/90 to-transparent" />
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full uppercase">
              Time Capsule Table Booking
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] text-stone-300 font-mono">匠匠留位 · 即刻落座</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-serif font-black tracking-tight text-white">
            极简美学 · 手作餐饮预订
          </h1>
          <p className="text-sm text-stone-300 leading-relaxed max-w-xl">
            告别传统无趣的排队等待，我们为青年人全新重构了极简国潮风的一键留座空间。您可以提前在线筛选匠人店家、择定临窗安静雅座，甚至一并锁定炉灶刚烤出的柴火面包或刚沏出的大红袍清热！
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-4">
            <button
              onClick={() => setViewMode("book")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                viewMode === "book"
                  ? "bg-amber-500 text-stone-950 shadow-md shadow-amber-500/10"
                  : "bg-white/10 hover:bg-white/20 text-stone-200"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>智能定席点单</span>
            </button>
            <button
              onClick={() => setViewMode("my-reservations")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                viewMode === "my-reservations"
                  ? "bg-amber-500 text-stone-950 shadow-md shadow-amber-500/10"
                  : "bg-white/10 hover:bg-white/20 text-stone-200"
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>我的专属预约 ({myReservations.length})</span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === "book" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            key="book-container"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* LEFT / MAIN COLUMN - CONFIGURATION */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* STEP 1: RESTAURANT / MERCHANT CHOICE */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200/60 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                      <span className="text-xs font-bold">01</span>
                    </div>
                    <h2 className="text-base font-serif font-black text-stone-950">选择匠心店所</h2>
                  </div>
                  <span className="text-xs text-stone-400 font-mono">共 {diningMerchants.length} 家品质餐厅</span>
                </div>

                {/* Horizontal slider of restaurant choices */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {diningMerchants.map((shop) => (
                    <div
                      key={shop.id}
                      onClick={() => setSelectedMerchant(shop)}
                      className={`relative rounded-2xl p-3 border transition-all cursor-pointer flex flex-col justify-between h-28 overflow-hidden group select-none ${
                        selectedMerchant.id === shop.id
                          ? "border-amber-800 bg-amber-50/20 shadow-xs"
                          : "border-stone-200/80 hover:border-stone-300 hover:bg-stone-50/40"
                      }`}
                    >
                      <div className="absolute inset-0 bg-cover bg-center brightness-95 opacity-0 group-hover:opacity-5 transition-opacity" style={{ backgroundImage: `url(${shop.images[0]})` }} />
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200">
                            {shop.category}
                          </span>
                          <span className="text-[10px] font-mono text-amber-800 font-semibold">★ {shop.rating}</span>
                        </div>
                        <h3 className="text-xs font-serif font-black text-stone-900 group-hover:text-amber-900 transition-colors truncate">
                          {shop.name}
                        </h3>
                        <p className="text-[9px] text-stone-400 truncate leading-normal">
                          {shop.subtitle}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-stone-100/50 mt-1">
                        <span className="text-[9px] text-stone-400 font-mono truncate max-w-[80px]">
                          {shop.address.split(" ")[2] || shop.address.substring(0,6)}
                        </span>
                        <span className="text-[9px] text-stone-500 font-bold font-mono">¥{shop.pricePerCapita}/人</span>
                      </div>

                      {/* Chosen tick ribbon indicator */}
                      {selectedMerchant.id === shop.id && (
                        <div className="absolute top-0 right-0 w-6 h-6 bg-amber-800 text-white rounded-bl-xl flex items-center justify-center animate-fade-in">
                          <Check className="w-3 w-3" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Selected venue overview mini-card */}
                <div className="p-4 bg-stone-50 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-stone-200/50">
                  <div className="flex gap-3.5 items-center">
                    <img
                      src={selectedMerchant.images[0]}
                      alt={selectedMerchant.name}
                      className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                    />
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-serif font-black text-stone-900 flex items-center gap-1.5">
                        {selectedMerchant.name}
                        <span className="text-[10px] font-mono bg-amber-100 text-amber-950 px-1.5 py-0.5 rounded">
                          {selectedMerchant.statusText}
                        </span>
                      </h4>
                      <p className="text-[10px] text-stone-400 font-mono flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-400 flex-shrink-0" />
                        <span>{selectedMerchant.address}</span>
                        <span className="mx-1">·</span>
                        <span>距您约 {selectedMerchant.distance}</span>
                      </p>
                    </div>
                  </div>
                  
                  {onSelectMerchant && (
                    <button
                      onClick={() => onSelectMerchant(selectedMerchant.id)}
                      className="text-[10px] font-bold text-amber-900 border border-amber-900/20 px-2.5 py-1.5 rounded-lg hover:bg-amber-50 cursor-pointer flex items-center gap-1 shrink-0"
                    >
                      <span>查看店铺细节</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>


              {/* STEP 2: DETAILS CONFIG (GUESTS & TIME TICKETS) */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200/60 shadow-xs space-y-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                    <span className="text-xs font-bold">02</span>
                  </div>
                  <h2 className="text-base font-serif font-black text-stone-950">设定留位参数</h2>
                </div>

                {/* Number of guests (Counter) + Visual hint */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className="space-y-3">
                    <label className="text-xs font-medium text-stone-500 block">人数配置</label>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-stone-300 rounded-2xl bg-stone-50/50 p-1">
                        <button
                          type="button"
                          onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 active:scale-95 cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center text-sm font-bold text-stone-905">{guestsCount} 位</span>
                        <button
                          type="button"
                          onClick={() => setGuestsCount(Math.min(12, guestsCount + 1))}
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 active:scale-95 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex-1 p-2 bg-stone-50 text-stone-500 text-[11px] rounded-xl border border-dotted border-stone-300/80 leading-relaxed">
                        {guestsCount <= 2 ? (
                          <span className="text-amber-800 font-semibold block">【 独幽临窗 · 双人雅席 】</span>
                        ) : guestsCount <= 4 ? (
                          <span className="text-emerald-800 font-semibold block">【 温馨聚落 · 4人方席 】</span>
                        ) : guestsCount <= 8 ? (
                          <span className="text-blue-800 font-semibold block">【 匠心围聚 · 8人圆席 】</span>
                        ) : (
                          <span className="text-purple-800 font-semibold block">【 尊荣私密 · 豪华包厢 】</span>
                        )}
                        <span>适合年轻人小聚，我们将为您智能筛选对应区域桌型。</span>
                      </div>
                    </div>
                  </div>

                  {/* Dates Horizontal Picker */}
                  <div className="space-y-3">
                    <label className="text-xs font-medium text-stone-500 block">预订日期</label>
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hidden">
                      {dateOptions.map((opt, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedDateIndex(idx)}
                          className={`flex-shrink-0 text-center rounded-xl p-2 min-w-[70px] border transition-all cursor-pointer ${
                            selectedDateIndex === idx
                              ? "bg-stone-950 border-stone-950 text-white shadow-sm"
                              : "border-stone-200 hover:border-stone-300 text-stone-605"
                          }`}
                        >
                          <span className="text-[9px] font-mono text-stone-400 block">{opt.subLabel}</span>
                          <span className="text-xs font-bold block mt-0.5 leading-none">{opt.label.split(" ")[1]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Time Slots Selector */}
                <div className="space-y-3">
                  <label className="text-xs font-medium text-stone-500 block">到店时段</label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                    {timeSlots.map((slot) => (
                      <div
                        key={slot.time}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`rounded-xl p-2.5 text-center border transition-all cursor-pointer ${
                          selectedTime === slot.time
                            ? "bg-amber-950 text-amber-20s border-amber-950 font-bold"
                            : "border-stone-200 bg-stone-50/50 hover:bg-stone-50"
                        }`}
                      >
                        <span className="text-[11px] block font-mono tracking-tight">{slot.time}</span>
                        <span className={`text-[8px] font-sans px-1 rounded block mt-1 ${
                          slot.status.includes("满")
                            ? "bg-stone-200 text-stone-450"
                            : slot.status.includes("订")
                            ? "bg-amber-100 text-amber-800 font-semibold"
                            : "bg-emerald-50 text-emerald-700"
                        }`}>
                          {slot.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Seat Map booking indicator overlay */}
                <div className="space-y-3 pt-3 border-t border-stone-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-stone-500">
                      座位空间可视化定位 <span className="font-mono text-stone-400">(单击选座)</span>
                    </label>
                    <div className="flex items-center gap-3 text-[10px] font-mono">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-stone-100 border border-stone-200" />闲置</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-amber-800" />选中</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-stone-300" />已被别的饕客订走</span>
                    </div>
                  </div>

                  {/* Seat Map Design Container */}
                  <div className="relative rounded-2xl border border-stone-200 bg-stone-900 p-4 h-64 overflow-hidden flex flex-col justify-between">
                    {/* Background architectural accents */}
                    <div className="absolute inset-x-8 top-1 py-1 text-center border-b border-dashed border-stone-800 text-[10px] font-mono text-stone-600 tracking-widest uppercase">
                      —— [ 茶香袅袅 · 极简炉灶烹茶区 ] ——
                    </div>
                    <div className="absolute left-1 inset-y-12 w-1.5 border-l border-dashed border-stone-800 flex items-center justify-center text-[8px] font-mono text-stone-700 writing-vertical select-none">
                      STREAM GARDEN 临溪水景
                    </div>
                    <div className="absolute right-1 inset-y-12 w-1.5 border-r border-dashed border-stone-800 flex items-center justify-center text-[8px] font-mono text-stone-700 writing-vertical select-none font-bold">
                      ENTRANCE 古窗弄堂大门
                    </div>

                    {/* Actual Interactive Seats Layout */}
                    <div className="relative w-full h-full my-3">
                      {tableLayout.map((tbl) => {
                        const isTaken = tbl.state === "taken";
                        const isSelected = selectedTable === tbl.id;
                        return (
                          <button
                            key={tbl.id}
                            type="button"
                            disabled={isTaken}
                            onClick={() => setSelectedTable(tbl.id)}
                            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-2 cursor-pointer transition-all flex flex-col items-center justify-center z-10 select-none ${
                              isTaken
                                ? "bg-stone-800 border border-stone-700 text-stone-500 opacity-40 cursor-not-allowed"
                                : isSelected
                                ? "bg-amber-500 text-stone-950 scale-110 shadow-lg shadow-amber-500/20 font-bold border-2 border-white ring-2 ring-amber-900"
                                : "bg-stone-800/80 hover:bg-stone-700 text-stone-200 border border-stone-600/60"
                            }`}
                            style={{ left: `${tbl.x}%`, top: `${tbl.y}%` }}
                          >
                            <span className="text-[10px] font-mono leading-none">{tbl.id}</span>
                            <span className="text-[8px] scale-90 font-sans block leading-none mt-0.5">{tbl.size}人席</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Seating detailed description overlay banner */}
                    <div className="border-t border-stone-800 pt-2 flex items-center justify-between text-[11px] font-mono text-stone-300">
                      <div>
                        <span>正在锁定：</span>
                        <span className="text-amber-400 font-bold">
                          {tableLayout.find(t => t.id === selectedTable)?.name || selectedTable}
                        </span>
                      </div>
                      <span className="text-stone-500 text-[10px]">席位专享不外排店</span>
                    </div>
                  </div>
                </div>
              </div>


              {/* STEP 3: FOOD PRE-ORDERING (DISH SELECTOR/点单) */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200/60 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                      <span className="text-xs font-bold">03</span>
                    </div>
                    <h2 className="text-base font-serif font-black text-stone-950">提前预约加购菜品</h2>
                  </div>
                  <span className="text-xs text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-mono font-medium">免排队 · 到店即烹</span>
                </div>
                
                <p className="text-xs text-stone-500 leading-relaxed">
                  为了保证匠人纯手工极细火候制作的质量，部分招牌菜品每日仅限量输出。提前在线锁定喜爱的食物，到店即可第一时间开席：
                </p>

                {/* Sublist of the selected merchant's products */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedMerchant.products && selectedMerchant.products.length > 0 ? (
                    selectedMerchant.products.map((product) => {
                      const countInCart = orderCart[product.id] || 0;
                      return (
                        <div
                          key={product.id}
                          className={`rounded-2xl p-4 border flex gap-3 transition-all ${
                            countInCart > 0
                              ? "bg-amber-50/15 border-amber-900/30"
                              : "bg-stone-50/40 border-stone-200"
                          }`}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-200"
                          />
                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <div className="flex items-start justify-between">
                                <h4 className="text-xs font-serif font-black text-stone-900 truncate">
                                  {product.name}
                                </h4>
                                <span className="text-sm font-mono text-stone-950 font-bold ml-2">¥{product.price}</span>
                              </div>
                              <p className="text-[10px] text-stone-400 line-clamp-2 leading-relaxed mt-0.5">
                                {product.description}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-1 border-t border-dotted border-stone-200 mt-2">
                              <span className="text-[9px] font-mono text-amber-800 font-semibold truncate max-w-[120px]">
                                {product.tasteNotes?.[0] || product.category}
                              </span>

                              {/* Plus Minus count controller */}
                              <div className="flex items-center gap-2">
                                {countInCart > 0 ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateCartQuantity(product.id, -1)}
                                      className="w-6 h-6 rounded bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-900"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="text-xs font-mono font-bold w-4 text-center">{countInCart}</span>
                                  </>
                                ) : null}
                                <button
                                  type="button"
                                  onClick={() => handleUpdateCartQuantity(product.id, 1)}
                                  className="w-6 h-6 rounded bg-stone-950 text-white flex items-center justify-center hover:bg-stone-850"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-2 text-center py-8 text-stone-400 text-xs">
                      该店家暂无线上点单菜品，您可以照常提交定席预约。
                    </div>
                  )}
                </div>
              </div>


              {/* STEP 4: CONTACT & FINAL NOTES */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200/60 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                    <span className="text-xs font-bold">04</span>
                  </div>
                  <h2 className="text-base font-serif font-black text-stone-950">输入联系人信息</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-stone-500">预订人姓名 *</label>
                    <input
                      type="text"
                      required
                      placeholder="怎么称呼您（如：温女士 / 麦先生）"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs border border-stone-200 rounded-xl px-3.5 py-2.5 focus:border-stone-950 outline-hidden bg-stone-50/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-stone-500">手机号码 (接收短信) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="您的 11 位手机联系号"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full text-xs border border-stone-200 rounded-xl px-3.5 py-2.5 focus:border-stone-950 outline-hidden bg-stone-50/50"
                    />
                  </div>
                </div>

                {/* Preset tags for quick requests selection */}
                <div className="space-y-2 pt-2">
                  <label className="text-[11px] font-medium text-stone-500 block">快捷个性需求（可选）</label>
                  <div className="flex flex-wrap gap-2">
                    {requestsPresets.map((req) => {
                      const isSelected = selectedRequests.includes(req);
                      return (
                        <button
                          key={req}
                          type="button"
                          onClick={() => handleToggleRequest(req)}
                          className={`text-[10px] font-sans px-2.5 py-1.5 rounded-lg border transition-all ${
                            isSelected
                              ? "bg-stone-950 text-white border-stone-950"
                              : "bg-stone-50 text-stone-500 border-stone-205 hover:border-stone-300"
                          }`}
                        >
                          {req}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Manual Text Requirements */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-stone-500">给大厨备注的其他小卡片</label>
                  <textarea
                    placeholder="例如：麻烦准备清汤。这是一次纪念日用餐，希望安静..."
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    rows={2}
                    className="w-full text-xs border border-stone-200 rounded-xl px-3.5 py-2.5 focus:border-stone-950 outline-hidden bg-stone-50/50 resize-hidden"
                  />
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN - RESERVATION BILLING CARDS */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
              <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 border border-stone-800 shadow-lg space-y-6 relative overflow-hidden select-none">
                {/* Background retro geometric grids */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
                
                <div className="border-b border-stone-800 pb-4">
                  <span className="text-[10px] font-mono tracking-widest text-amber-400 block uppercase">Reservation Summary</span>
                  <h3 className="text-lg font-serif font-black text-white mt-1">留座凭证核对</h3>
                </div>

                {/* Key specs bullet list */}
                <div className="space-y-4 text-xs font-sans">
                  <div className="flex items-center justify-between py-1 border-b border-stone-800">
                    <span className="text-stone-400">定席店铺</span>
                    <span className="font-semibold text-white truncate max-w-[150px]">{selectedMerchant.name}</span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-stone-800">
                    <span className="text-stone-400">预订桌席</span>
                    <span className="font-mono text-amber-400 font-bold bg-amber-400/5 border border-amber-400/10 px-2 py-0.5 rounded">
                      {selectedTable} ({tableLayout.find(t=>t.id === selectedTable)?.size}人席)
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-stone-800">
                    <span className="text-stone-400">到店时间</span>
                    <div className="text-right">
                      <span className="text-white block font-semibold">{dateOptions[selectedDateIndex].label.split(" ")[1]}</span>
                      <span className="text-[10px] text-stone-400 font-mono mt-0.5 block">{selectedTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-stone-800">
                    <span className="text-stone-400">留位人数</span>
                    <span className="text-white font-semibold">{guestsCount} 位饕客</span>
                  </div>

                  {/* Pre-order menu dishes collapse review */}
                  {mockPreOrderItems.length > 0 && (
                    <div className="space-y-2 py-2 border-b border-stone-800">
                      <div className="flex items-center justify-between">
                        <span className="text-stone-400">已选前置点单 ({mockPreOrderItems.length})</span>
                        <button
                          type="button"
                          onClick={() => setOrderCart({})}
                          className="text-[10px] text-rose-400 hover:text-rose-300"
                        >
                          清空点单
                        </button>
                      </div>

                      <div className="space-y-1.5 max-h-24 overflow-y-auto scrollbar-hidden">
                        {mockPreOrderItems.map(item => (
                          <div key={item.product.id} className="flex justify-between text-[10px] text-stone-300">
                            <span className="truncate max-w-[140px]">{item.product.name}</span>
                            <span className="font-mono">x{item.quantity} · ¥{item.product.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contacts validation preview */}
                  {(customerName || customerPhone) && (
                    <div className="p-3 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-1">
                      <div className="text-[9px] text-stone-500 font-mono uppercase tracking-wider">联系人档案</div>
                      <p className="text-[11px] text-stone-300 leading-normal font-sans">
                        {customerName || "尚未输入名字"} ({customerPhone || "无联系方式"})
                      </p>
                    </div>
                  )}
                </div>

                {/* Numeric Financial pricing bills list */}
                <div className="space-y-2 bg-stone-950 p-4 rounded-2xl border border-stone-800">
                  <div className="flex justify-between text-xs text-stone-400">
                    <span>食品预订额</span>
                    <span className="font-mono text-stone-200">¥{cartTotalPrice}</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-400">
                    <span>定席服务定金 (到店抵扣)</span>
                    <span className="font-mono text-stone-200">¥{depositFee}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm font-bold text-white pt-2 border-t border-stone-850 mt-1">
                    <span className="flex items-center gap-1">
                      预订合计
                      <span className="text-[9px] font-normal px-1 rounded bg-stone-800 text-stone-400">含退改险</span>
                    </span>
                    <span className="font-mono text-base text-amber-400">¥{finalTotalAmount}</span>
                  </div>
                </div>

                {/* Final Booking Button */}
                <form onSubmit={handleConfirmReservation} className="space-y-2">
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 py-3.5 px-4 rounded-2xl text-xs font-black transition-all cursor-pointer shadow-md shadow-amber-500/5 active:scale-99 flex items-center justify-center gap-2"
                  >
                    <Coffee className="w-4 h-4" />
                    <span>确认锁定此张预订餐券</span>
                  </button>
                  <p className="text-[9px] text-center text-stone-500 leading-normal">
                    * 锁定后将扣除定金，到店就餐直接抵扣。提前2小时退订可全额原路径退还。
                  </p>
                </form>
              </div>

              {/* Young aesthetic lifestyle slogan card */}
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-900/10 space-y-2">
                <div className="flex items-center gap-1 text-amber-900 font-bold text-xs font-serif">
                  <Sparkles className="w-4 h-4 text-amber-800" />
                  <span>年轻人的非遗美食新范式</span>
                </div>
                <p className="text-[11px] text-stone-605 leading-relaxed">
                  传统不等于土气。这里的每一支精细面包、每一盏古镇春茶、每一盘火窑瓦罐，都是对老祖宗时光配方的敬畏和新派雕琢。让我们从一杯温朴的粗陶热汤里，触碰大地的诚意。
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            key="my-reservations-container"
            className="space-y-6"
          >
            <div className="space-y-2 border-b border-stone-200 pb-4">
              <span className="text-[10px] text-amber-700 font-mono tracking-widest uppercase block">Personal Reservations Book</span>
              <h2 className="text-2xl font-serif font-black text-stone-950">您在「手工匠心美食」里的全部邀约</h2>
              <p className="text-xs text-stone-400">在这里，所有预订记录都以温润印章的形式，随时等待为您留位献席。</p>
            </div>

            {myReservations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myReservations.map((resv) => (
                  <div
                    key={resv.id}
                    className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-xs flex flex-col justify-between relative relative group p-6"
                  >
                    {/* Decorative Stamp stamp */}
                    <div className="absolute right-6 top-6 w-14 h-14 rounded-full border-2 border-dashed border-emerald-500/40 text-emerald-500/40 flex items-center justify-center text-[10px] font-bold font-mono tracking-widest uppercase transform rotate-12 select-none pointer-events-none group-hover:scale-105 transition-transform">
                      匠心已约
                    </div>

                    <div className="space-y-4">
                      {/* Merchant hero details */}
                      <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                        <img
                          src={resv.merchant.images[0]}
                          alt={resv.merchant.name}
                          className="w-10 h-10 rounded-xl object-cover border border-stone-200"
                        />
                        <div className="space-y-0.5 min-w-0">
                          <h4 className="text-sm font-serif font-black text-stone-900 truncate">
                            {resv.merchant.name}
                          </h4>
                          <span className="text-[10px] text-stone-400 font-mono tracking-wider flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-stone-400 flex-shrink-0" />
                            <span className="truncate">{resv.merchant.address}</span>
                          </span>
                        </div>
                      </div>

                      {/* Specs information layout */}
                      <div className="grid grid-cols-2 gap-3 text-xs bg-stone-50 p-3 rounded-2xl border border-stone-100 font-mono">
                        <div>
                          <span className="text-stone-400 text-[10px] block font-sans">预订场号</span>
                          <span className="text-stone-850 font-bold text-xs mt-0.5 block">{resv.id}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 text-[10px] block font-sans">锁定席位</span>
                          <span className="text-amber-800 font-bold block mt-0.5">{resv.tableId} 号桌</span>
                        </div>
                        <div>
                          <span className="text-stone-400 text-[10px] block font-sans">就餐到店时间</span>
                          <span className="text-stone-855 font-bold block mt-0.5">{resv.date} {resv.time}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 text-[10px] block font-sans">到店人数</span>
                          <span className="text-stone-855 font-bold block mt-0.5">{resv.guestsCount} 位就餐</span>
                        </div>
                      </div>

                      {/* Contact details */}
                      <div className="space-y-1.5 text-xs text-stone-605">
                        <div className="flex justify-between py-1 border-b border-dashed border-stone-100">
                          <span>留存姓名</span>
                          <span className="text-stone-900 font-semibold">{resv.customerName}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-dashed border-stone-100">
                          <span>留存手机</span>
                          <span className="text-stone-900 font-mono">{resv.customerPhone}</span>
                        </div>
                        
                        {resv.specialRequests.length > 0 && (
                          <div className="pt-1.5">
                            <span className="text-stone-400 text-[10px] font-sans block mb-1">特别备注：</span>
                            <div className="flex flex-wrap gap-1.5">
                              {resv.specialRequests.map((req, i) => (
                                <span key={i} className="text-[9px] bg-stone-100 text-stone-550 border border-stone-200 px-1.5 py-0.5 rounded">
                                  {req}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Preordered dishes selection */}
                      {resv.preOrderedProducts.length > 0 && (
                        <div className="p-3 rounded-2xl bg-amber-50/20 border border-amber-900/10 space-y-1.5 mt-2">
                          <span className="text-[10px] font-bold text-amber-900 block font-sans flex items-center gap-1">
                            <ShoppingBag className="w-3 h-3 text-amber-800" />
                            <span>提前锁定的饭食 ({resv.preOrderedProducts.length})</span>
                          </span>
                          <div className="space-y-1 max-h-16 overflow-y-auto scrollbar-hidden">
                            {resv.preOrderedProducts.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center text-[10px] text-stone-600 font-mono">
                                <span>{item.product.name}</span>
                                <span>x{item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer price & actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-4">
                      <div>
                        <span className="text-[10px] text-stone-400 block">合计付款金额</span>
                        <span className="font-mono font-bold text-stone-900 text-sm">¥{resv.totalPrice}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteReservation(resv.id)}
                        className="text-[10px] font-bold text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/60 px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                      >
                        取消本单
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-stone-200/80 p-8 max-w-lg mx-auto space-y-4">
                <div className="w-12 h-12 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-400 mx-auto">
                  <Ticket className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-serif font-black text-stone-950">暂无任何预订餐券</h3>
                  <p className="text-xs text-stone-400 max-w-xs mx-auto leading-relaxed">
                    在快节奏的日子里，何不抽空预订一张小座，在松木柴火或是淡淡琴茗里安放一个慵懒温存的下午？
                  </p>
                </div>
                
                <button
                  onClick={() => setViewMode("book")}
                  className="bg-stone-950 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-stone-850 cursor-pointer transition-all inline-block"
                >
                  去选择匠人店所
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* DETAILED BOOKING CONFIRMATION MODAL TICKET */}
      <AnimatePresence>
        {newlyCreatedReservation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-950/70 z-50 flex items-center justify-center p-4 backdrop-blur-3xs"
          >
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              className="w-full max-w-md bg-[#FAF9F6] text-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-amber-900/10 flex flex-col justify-between"
            >
              {/* Header card info */}
              <div className="bg-stone-900 text-stone-100 p-6 relative overflow-hidden text-center space-y-1 select-none">
                <button
                  type="button"
                  onClick={() => setNewlyCreatedReservation(null)}
                  className="absolute top-4 right-4 text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="w-9 h-9 bg-amber-500 rounded-2xl flex items-center justify-center text-stone-950 mx-auto mb-2 animate-bounce">
                  <Check className="w-5 h-5 stroke-[3px]" />
                </div>
                <span className="text-[9px] font-mono tracking-widest text-amber-400 uppercase">Artisanal Booking Voucher</span>
                <h3 className="text-base font-serif font-black text-white">定席餐卡锁定成功！</h3>
              </div>

              {/* Ticket Voucher body */}
              <div className="p-6 space-y-5 relative">
                {/* Visual Stamp stamp overlay */}
                <div className="absolute right-4 top-4 w-20 h-20 rounded-full border-4 border-double border-red-500/20 text-red-500/25 flex flex-col items-center justify-center text-[10px] font-black font-mono tracking-widest uppercase transform -rotate-12 select-none pointer-events-none">
                  <span className="text-[8px] scale-85 leading-normal">SUCCESS</span>
                  <span className="leading-none mt-0.5">預訂成功</span>
                  <span className="text-[6px] tracking-normal font-sans mt-0.5">2026 SHANGHAI</span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] text-stone-400 font-mono tracking-wider block">所预订店家</span>
                  <h4 className="text-base font-serif font-black text-stone-950">
                    {newlyCreatedReservation.merchant.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                    <span>{newlyCreatedReservation.merchant.address}</span>
                  </p>
                </div>

                {/* Voucher dotted tear lines */}
                <div className="border-t-2 border-dashed border-stone-200 relative my-3">
                  <div className="absolute -left-8 -top-2 w-4 h-4 bg-stone-950 rounded-full" />
                  <div className="absolute -right-8 -top-2 w-4 h-4 bg-stone-950 rounded-full" />
                </div>

                {/* Reservation specifications list details */}
                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-stone-400 text-[10px] block font-sans">预约单号</span>
                    <span className="text-stone-900 font-bold block mt-0.5">{newlyCreatedReservation.id}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 text-[10px] block font-sans">锁定坐席</span>
                    <span className="text-stone-900 font-bold block mt-0.5">{newlyCreatedReservation.tableId} 号席</span>
                  </div>
                  <div>
                    <span className="text-stone-400 text-[10px] block font-sans">预留到店时刻</span>
                    <span className="text-stone-900 font-bold block mt-0.5">
                      {newlyCreatedReservation.date} {newlyCreatedReservation.time}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 text-[10px] block font-sans">预订人数</span>
                    <span className="text-stone-900 font-bold block mt-0.5">{newlyCreatedReservation.guestsCount} 位就餐</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-stone-400 text-[10px] block font-sans">留档记录联系</span>
                    <span className="text-stone-800 font-sans block mt-0.5">
                      {newlyCreatedReservation.customerName}（{newlyCreatedReservation.customerPhone}）
                    </span>
                  </div>
                </div>

                {newlyCreatedReservation.preOrderedProducts.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-amber-50/30 border border-amber-900/10 space-y-1 mt-1">
                    <span className="text-[10px] font-bold text-amber-950 block font-sans">
                      已提前定妥的手作点单：
                    </span>
                    <div className="space-y-1 text-[10px] text-stone-600 font-mono">
                      {newlyCreatedReservation.preOrderedProducts.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{item.product.name}</span>
                          <span>x{item.quantity} 份</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mock QR / Barcode aesthetic item for young trendsetters */}
                <div className="space-y-2 pt-4 border-t border-stone-200 mt-2 text-center select-none">
                  <div className="bg-white p-3 rounded-2xl border border-stone-200 inline-block">
                    {/* Retro CSS Simulated stripe barcode */}
                    <div className="flex items-stretch justify-center h-10 w-44 gap-0.5">
                      <div className="w-2 bg-stone-900" />
                      <div className="w-0.5 bg-stone-900" />
                      <div className="w-1 bg-stone-300" />
                      <div className="w-1.5 bg-stone-900" />
                      <div className="w-0.5 bg-stone-900" />
                      <div className="w-2 bg-stone-900" />
                      <div className="w-1 bg-stone-300" />
                      <div className="w-0.5 bg-stone-900" />
                      <div className="w-1.5 bg-stone-900" />
                      <div className="w-2 bg-stone-900" />
                      <div className="w-1 bg-stone-300" />
                      <div className="w-0.5 bg-stone-900" />
                      <div className="w-1 bg-stone-900" />
                    </div>
                  </div>
                  <p className="text-[9px] text-stone-400 font-mono tracking-widest leading-none mt-1">
                    * 到店出示凭证由服务生一键扫码核入餐位
                  </p>
                </div>
              </div>

              {/* Close / Action footer banner */}
              <div className="bg-stone-50 border-t border-stone-200/50 p-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setNewlyCreatedReservation(null);
                    setViewMode("my-reservations");
                  }}
                  className="w-full bg-stone-900 hover:bg-stone-850 text-white text-xs font-black py-3 rounded-xl cursor-pointer transition-all select-none"
                >
                  好了，去管理我的预约餐券
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
