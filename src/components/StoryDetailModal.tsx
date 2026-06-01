import React from "react";
import { Story } from "../types";
import { X, BookOpen, Clock, Calendar, Leaf, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface StoryDetailModalProps {
  story: Story | null;
  onClose: () => void;
}

export default function StoryDetailModal({ story, onClose }: StoryDetailModalProps) {
  if (!story) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        {/* Backdrop Closure */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl bg-amber-50/98 rounded-3xl overflow-hidden shadow-2xl border border-amber-900/10 flex flex-col max-h-[85vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/65 transition-colors cursor-pointer"
            id="close-story-modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner cover image */}
          <div className="h-48 md:h-64 relative flex-shrink-0 bg-stone-900">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover opacity-85"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-50 via-amber-50/10 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-amber-800 text-amber-100 rounded">
                #{story.tag}
              </span>
              <h2 className="text-lg md:text-2xl font-serif font-black text-amber-950 mt-1.5 leading-snug">
                {story.title}
              </h2>
            </div>
          </div>

          {/* Article main text columns */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-6">
            {/* Meta attributes */}
            <div className="flex flex-wrap gap-4 items-center justify-between text-xs font-mono text-stone-500 border-b border-stone-200/50 pb-4">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-700 font-bold" />
                  {story.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-stone-300" />
                  {story.date}
                </span>
              </div>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-300" />
                建议阅读：{story.readTime}
              </span>
            </div>

            {/* Narrative Content */}
            <article className="prose prose-stone prose-sm leading-relaxed text-stone-850 font-sans space-y-4">
              {story.content.split("\n\n").map((para, idx) => (
                <p key={idx} className="whitespace-pre-wrap text-sm leading-relaxed">
                  {para}
                </p>
              ))}
            </article>

            {/* Custom footer ornament */}
            <div className="flex items-center justify-center gap-2 border-t border-stone-200/50 pt-5">
              <Leaf className="w-4 h-4 text-amber-600 rotate-12" />
              <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase">
                THE END · 寻回日常的温度
              </span>
              <Leaf className="w-4 h-4 text-amber-600 -rotate-12" />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
