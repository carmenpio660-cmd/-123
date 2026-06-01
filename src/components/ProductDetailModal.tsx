import React from "react";
import { Product } from "../types";
import { X, Wheat, Sparkles, ChefHat, Cookie } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        {/* Backdrop Tap to Close */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-4xl bg-amber-50/98 rounded-3xl overflow-hidden shadow-2xl border border-amber-900/10 flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            id="close-product-modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Beautiful image */}
          <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-amber-120 flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Ambient gradients */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 text-white flex flex-col justify-end">
              <span className="text-xs font-mono px-2.5 py-1 bg-amber-600/90 rounded-full w-max text-amber-50 mb-2 font-medium">
                {product.category}
              </span>
              <h2 className="text-2xl font-serif font-bold leading-tight">{product.name}</h2>
              <p className="text-sm text-amber-200 mt-1 flex items-center gap-1.5 font-mono">
                <ChefHat className="w-4 h-4 text-amber-400" />
                {product.artisan}
              </p>
            </div>
          </div>

          {/* Right: Craft details */}
          <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between max-h-[calc(90vh-16rem)] md:max-h-[90vh]">
            <div className="space-y-6">
              {/* Star Rating & Price */}
              <div className="flex items-center justify-between border-b border-amber-900/10 pb-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-600 font-bold text-2xl font-mono">¥{product.price}</span>
                  <span className="text-xs text-amber-700/60 font-medium">/ 份</span>
                </div>
                <div className="flex items-center gap-1 bg-white/60 px-3 py-1 rounded-full border border-amber-900/5 shadow-sm">
                  <span className="text-amber-500 font-bold font-mono">★</span>
                  <span className="text-sm font-bold font-mono text-amber-900">{product.rating}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-sm font-serif font-bold text-amber-900 flex items-center gap-1.5">
                  <span className="w-1.5 h-4 bg-amber-600 rounded-full block"></span>
                  匠物本源
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed font-sans">{product.description}</p>
              </div>

              {/* Crafting Process */}
              <div className="space-y-3 bg-white/40 p-4 rounded-2xl border border-amber-900/5">
                <h4 className="text-sm font-serif font-bold text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  手作工序 (非遗技艺)
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed font-mono">
                  {product.craftingProcess}
                </p>
              </div>

              {/* Ingredients */}
              <div className="space-y-2">
                <h4 className="text-sm font-serif font-bold text-amber-900 flex items-center gap-1.5">
                  <Wheat className="w-4 h-4 text-amber-600" />
                  天然整料 (配料表)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1.5 bg-amber-100/50 hover:bg-amber-100 rounded-xl text-amber-800 border border-amber-900/10 transition-colors font-mono"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Taste Notes */}
              <div className="space-y-2">
                <h4 className="text-sm font-serif font-bold text-amber-900 flex items-center gap-1.5">
                  <Cookie className="w-4 h-4 text-amber-600" />
                  风味品鉴案
                </h4>
                <ul className="space-y-1.5">
                  {product.tasteNotes.map((note, idx) => (
                    <li key={idx} className="text-xs text-stone-600 flex items-start gap-2 font-mono">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5"></span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Action */}
            <div className="mt-8 border-t border-amber-900/10 pt-4 flex gap-3">
              <button
                onClick={() => {
                  alert(`您已收藏该手作美味：${product.name}！可在个人中心中查看同店好物。`);
                }}
                className="flex-1 py-3 px-4 bg-amber-700 hover:bg-amber-800 text-amber-50 rounded-2xl font-medium text-sm transition-colors shadow-md hover:shadow-lg focus:outline-none flex items-center justify-center gap-2"
                id={`fav-btn-${product.id}`}
              >
                <Wheat className="w-4 h-4" />
                收藏此美味
              </button>
              <button
                onClick={onClose}
                className="py-3 px-6 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 rounded-2xl font-medium text-s transition-colors"
                id={`close-btn-${product.id}`}
              >
                返回
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
