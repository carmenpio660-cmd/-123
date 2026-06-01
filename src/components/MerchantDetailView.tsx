import React from "react";
import { Merchant, Product, Review } from "../types";
import { ArrowLeft, Clock, MapPin, Heart, Star, MessageSquare, Plus, Check, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface MerchantDetailViewProps {
  merchant: Merchant;
  reviews: Review[];
  isFavorited: boolean;
  onToggleFavorite: (merchantId: string) => void;
  onSelectProduct: (product: Product) => void;
  onWriteReview: (merchantId: string) => void;
  onBack: () => void;
}

export default function MerchantDetailView({
  merchant,
  reviews,
  isFavorited,
  onToggleFavorite,
  onSelectProduct,
  onWriteReview,
  onBack
}: MerchantDetailViewProps) {
  // Filter reviews matching this specific merchant
  const merchantReviews = reviews.filter((r) => r.merchantId === merchant.id);

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header Back Navigation and title */}
      <div className="flex items-center justify-between border-b border-stone-200/50 pb-4">
        <button
          onClick={onBack}
          className="group flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-amber-900 transition-colors cursor-pointer"
          id="back-to-merchants"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          返回列表
        </button>

        {/* Favorite shop Heart Action */}
        <button
          onClick={() => onToggleFavorite(merchant.id)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
            isFavorited
              ? "bg-rose-50 text-rose-600 border-rose-200 shadow-xs"
              : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
          }`}
          id="toggle-shop-favorite"
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? "fill-current text-rose-600" : ""}`} />
          <span>{isFavorited ? "已收藏店铺" : "收藏店铺"}</span>
        </button>
      </div>

      {/* 2. Brand Grid Banner Layout */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-3xl overflow-hidden shadow-sm h-[200px] md:h-[300px]">
        {/* Large Main cover */}
        <div className="md:col-span-2 h-full bg-stone-100 overflow-hidden relative">
          <img
            src={merchant.images[0]}
            alt={merchant.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
          <div className="absolute bottom-5 left-5 text-white space-y-1">
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-amber-600 rounded">
              {merchant.category}
            </span>
            <h1 className="text-xl md:text-2xl font-serif font-black">{merchant.name}</h1>
          </div>
        </div>

        {/* Secondary Detail Grids */}
        <div className="hidden md:flex flex-col gap-4 h-full">
          <div className="h-1/2 bg-stone-100 overflow-hidden rounded-r-3xl">
            <img
              src={merchant.images[1]}
              alt="Detail image 1"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="h-1/2 bg-stone-100 overflow-hidden rounded-r-3xl">
            <img
              src={merchant.images[2]}
              alt="Detail image 2"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 3. About the Merchant Description Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Story and Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-stone-200/70 shadow-xs space-y-4">
            <h2 className="text-sm font-serif font-black text-stone-900 uppercase tracking-widest flex items-center gap-1.5 border-b border-stone-100 pb-3">
              <span className="w-1.5 h-4 bg-amber-600 rounded-full block"></span>
              关于我们 / 匠人故事
            </h2>
            <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-wrap font-sans">
              {merchant.description}
            </p>
          </div>

          {/* Recommended products/Menu Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200/50 pb-2">
              <h3 className="text-sm font-serif font-black text-stone-900 uppercase tracking-widest">
                推荐菜单 / 精选产品
              </h3>
              <span className="text-[10px] font-mono text-stone-400">点击查看独特手工古法工序</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {merchant.products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group bg-white rounded-xl overflow-hidden border border-stone-250 hover:border-amber-900/20 p-3 shadow-xs hover:shadow-sm cursor-pointer flex flex-col justify-between transition-all"
                >
                  <div className="space-y-3">
                    <div className="h-28 rounded-lg overflow-hidden bg-stone-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-serif font-black text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-[10px] text-stone-500 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-stone-100/60 pt-2 mt-3">
                    <span className="text-xs font-bold font-mono text-amber-950">¥{product.price}</span>
                    <span className="text-[9px] font-semibold text-amber-700 flex items-center gap-0.5">
                      工艺
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Quick info, parameters & Dimensional Ratings Breakdown */}
        <div className="space-y-6">
          {/* Quick info specs */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200/70 shadow-xs space-y-4 text-xs font-medium text-stone-600">
            <h3 className="text-sm font-serif font-black text-stone-900 uppercase tracking-widest border-b border-stone-100 pb-3">
              营业参数
            </h3>
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-amber-700 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-stone-400 font-mono block">营业时间</span>
                <span className="text-stone-850 font-mono">{merchant.openingHours}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-amber-700 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-stone-400 font-mono block">门店位置</span>
                <span className="text-stone-850 leading-relaxed font-sans">{merchant.address}</span>
              </div>
            </div>
          </div>

          {/* Ratings dashboard */}
          <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-900/10 shadow-xs space-y-5">
            <div className="text-center pt-2">
              <span className="text-stone-500 text-[10px] font-mono tracking-widest uppercase block mb-1">Overall Rating</span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black font-serif text-amber-950">{merchant.rating}</span>
                <span className="text-stone-400 text-sm font-light">/ 5.0</span>
              </div>
              <div className="flex justify-center text-amber-400 text-lg gap-0.5 mt-1.5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span key={idx}>★</span>
                ))}
              </div>
              <span className="text-stone-450 text-[10px] font-mono mt-1 block">Based on {merchantReviews.length} reviews</span>
            </div>

            {/* Breakdown bars */}
            <div className="space-y-2 border-t border-amber-900/10 pt-4 text-[11px] font-mono text-stone-500">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>食材原度 (Ingredients)</span>
                  <span className="text-stone-800 font-semibold">{merchant.ratingsBreakdown.ingredients}</span>
                </div>
                <div className="w-full h-1.5 bg-stone-200/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-600 rounded-full"
                    style={{ width: `${(merchant.ratingsBreakdown.ingredients / 5.0) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>极致风味 (Taste)</span>
                  <span className="text-stone-800 font-semibold">{merchant.ratingsBreakdown.taste}</span>
                </div>
                <div className="w-full h-1.5 bg-stone-200/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-600 rounded-full"
                    style={{ width: `${(merchant.ratingsBreakdown.taste / 5.0) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>环境清修 (Ambience)</span>
                  <span className="text-stone-800 font-semibold">{merchant.ratingsBreakdown.ambience}</span>
                </div>
                <div className="w-full h-1.5 bg-stone-200/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-600 rounded-full"
                    style={{ width: `${(merchant.ratingsBreakdown.ambience / 5.0) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Customer Reviews Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-stone-200/60 pb-3">
          <h2 className="text-xl font-serif font-extrabold text-stone-950 flex items-center gap-2">
            食客真实评价
            <span className="text-xs font-mono text-stone-400 font-light hidden sm:inline">User Reviews Feed</span>
          </h2>

          <button
            onClick={() => onWriteReview(merchant.id)}
            className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-amber-50 rounded-xl text-xs font-semibold shadow-xs transition-transform hover:scale-101 cursor-pointer"
            id="write-review-trigger"
          >
            分享我的体验 (写评价)
          </button>
        </div>

        {/* List of review cards */}
        {merchantReviews.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 border border-stone-150 text-center space-y-2 text-stone-400 text-xs">
            <MessageSquare className="w-8 h-8 text-stone-300 mx-auto mb-1" />
            <p className="font-serif font-bold text-stone-600">目前暂无此店评价</p>
            <p className="font-light">点击上方按钮发布首个真实探店食评哦！</p>
          </div>
        ) : (
          <div className="space-y-5">
            {merchantReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs space-y-4"
              >
                {/* Reviewer Header layout */}
                <div className="flex items-center justify-between">
                  {/* User Profile avatar */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-stone-100 flex-shrink-0">
                      <img
                        src={rev.user.avatar}
                        alt={rev.user.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-stone-900">{rev.user.name}</h4>
                      <span className="text-[9px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 border border-amber-900/10 rounded">
                        {rev.user.level}
                      </span>
                    </div>
                  </div>

                  {/* Rating Score Stars and date */}
                  <div className="flex flex-col items-end gap-1 font-mono text-xs">
                    <span className="text-stone-400">{rev.date}</span>
                    <div className="flex items-center gap-1.5 bg-stone-50 px-2 py-0.5 rounded border border-stone-100 font-bold">
                      <span className="text-amber-500">★</span>
                      <span className="text-stone-800">{rev.rating.overall}</span>
                    </div>
                  </div>
                </div>

                {/* Content written descriptions */}
                <p className="text-stone-700 text-sm leading-relaxed font-sans whitespace-pre-wrap">
                  {rev.content}
                </p>

                {/* Optional Review Image Carousels */}
                {rev.images && rev.images.length > 0 && (
                  <div className="flex gap-3 overflow-x-auto py-1 no-scrollbar">
                    {rev.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="w-32 h-24 rounded-lg overflow-hidden bg-stone-100 border border-stone-100 flex-shrink-0"
                      >
                        <img
                          src={img}
                          alt="Review attachment"
                          className="w-full h-full object-cover hover:scale-104 transition-all"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Review tags */}
                {rev.tags && rev.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1 border-t border-stone-100/50">
                    {rev.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono bg-stone-50 text-stone-500 px-2.5 py-1 rounded-md border border-stone-200/40"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
