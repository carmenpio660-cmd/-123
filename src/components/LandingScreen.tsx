import React, { useState } from "react";
import { motion } from "motion/react";
import { Utensils, ArrowRight, Compass, ShieldAlert } from "lucide-react";

interface LandingScreenProps {
  onEnter: () => void;
}

export default function LandingScreen({ onEnter }: LandingScreenProps) {
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-stone-950 text-white select-none">
      {/* Background Video or fallback with elegant 80% opacity overlay */}
      <div className="absolute inset-0 z-0 bg-stone-950 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.15],
            x: [0, -4],
            y: [0, -2],
          }}
          transition={{
            duration: 18,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-full h-full"
        >
          {!videoError ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              onCanPlay={() => setVideoLoading(false)}
              onError={() => {
                setVideoError(true);
                setVideoLoading(false);
              }}
              className="w-full h-full object-cover opacity-80 transition-opacity duration-1000"
              style={{ opacity: videoLoading ? 0.4 : 0.8 }}
            >
              {/* Ultra-stable, high-quality, close-up gourmet culinary videos with continuous slow camera push-ins from Mixkit & public CDNs */}
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-dripping-syrup-on-delicious-pancakes-41618-large.mp4"
                type="video/mp4"
              />
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-butter-melting-on-a-baked-potato-42171-large.mp4"
                type="video/mp4"
              />
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-fresh-vegetable-salad-41619-large.mp4"
                type="video/mp4"
              />
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-steaming-hot-coffee-pouring-into-a-cup-42407-large.mp4"
                type="video/mp4"
              />
            </video>
          ) : (
            /* High-end cinematic dark food close-up image fallback in case browser or sandbox iframe constraints block video */
            <div
              className="w-full h-full bg-cover bg-center opacity-85 transition-transform duration-1000"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=82&w=1800')",
              }}
            />
          )}
        </motion.div>
        {/* Subtle glass vignette to darken edges for cinematic look */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/80 z-10" />
        <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-2xs z-10" />
      </div>

      {/* Top Bar Navigation / Logo */}
      <header className="relative w-full z-20 px-6 py-8 md:px-12 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-stone-950 shadow-lg shadow-amber-500/20">
            <Utensils className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-amber-400 font-bold uppercase block">
              Artisanal Space
            </span>
            <span className="text-[10px] text-stone-400 font-light tracking-wider block">
              Est. 2026 / Local Wisdom
            </span>
          </div>
        </div>

        {/* Minimal sound or hint indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] font-mono tracking-wider text-amber-200/80">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <span>CINEMATIC EXPERIENCE</span>
        </div>
      </header>

      {/* Central Content */}
      <main className="relative z-20 flex flex-col items-center text-center px-6 max-w-4xl mx-auto my-auto py-12">
        {/* Decorative Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono tracking-[0.2em] uppercase"
        >
          ✦ Discover Handcrafted Wonders ✦
        </motion.div>

        {/* Website Giant Name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-8xl font-serif font-black tracking-widest text-[#FFFdfa] drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] leading-tight">
            手工匠心美食
          </h1>
          <p className="text-base md:text-xl font-light text-stone-200 tracking-[0.3em] font-serif max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            寻找散落在日常里的手作微光
          </p>
        </motion.div>

        {/* Enter Button Call To Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12"
        >
          <motion.button
            onClick={onEnter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative cursor-pointer flex items-center gap-4 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 px-8 py-4.5 rounded-2xl text-stone-950 font-bold tracking-widest text-sm transition-all shadow-[0_10px_35px_-8px_rgba(245,158,11,0.5)] border border-amber-300/40"
            id="enter-site-btn"
          >
            {/* Breathing Ambient Backlight */}
            <span className="absolute inset-x-0 bottom-0 h-1/3 bg-white/20 rounded-b-2xl blur-xs group-hover:h-full transition-all duration-300 pointer-events-none" />

            <Compass className="w-5 h-5 text-stone-950 animate-spin-slow group-hover:rotate-45 transition-transform duration-500" />
            <span className="font-sans">点击进入 · ENTER SITE</span>
            <ArrowRight className="w-5 h-5 text-stone-950 transition-transform duration-300 transform group-hover:translate-x-1.5" />
          </motion.button>

          {/* Quick Info underbutton */}
          <p className="text-[10px] text-stone-400/95 font-mono tracking-widest uppercase mt-4">
            手作烘焙 · 窑烤柴火 · 古镇茶室 · 原野本味
          </p>
        </motion.div>
      </main>

      {/* Footer bar */}
      <footer className="relative z-20 w-full px-6 py-8 md:px-12 flex flex-col md:flex-row items-center justify-between text-stone-500 text-[10px] tracking-widest font-mono pointer-events-none border-t border-white/5 bg-gradient-to-b from-transparent to-stone-950">
        <span className="uppercase">© 2026 Artisanal Culinary Hub</span>
        <span className="uppercase mt-2 md:mt-0">Inspired by Heritage & Modern Crafts</span>
      </footer>
    </div>
  );
}
