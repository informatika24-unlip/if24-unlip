"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { Github, Youtube, Instagram, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleBackground } from "@/components/ui/particle-background";
import Image from "next/image";
import { blurDataUrls } from "@/lib/blur-data-url";
import { analytics, AnalyticsEvents } from "@/lib/analytics";

interface LinkData {
  id: number;
  title: string;
  description: string;
  url: string;
  icon: string;
  isActive: boolean;
}

const linksData: LinkData[] = [
  {
    id: 1,
    title: "Member Class",
    description: "Explore to Member Class",
    url: "/members",
    icon: "👥",
    isActive: true,
  },
];

const gradients = {
  primary: "from-indigo-500 via-purple-500 to-pink-500",
  secondary: "from-cyan-400 via-blue-500 to-purple-600",
  success: "from-emerald-400 to-cyan-400",
  warning: "from-amber-400 to-orange-500",
  photo: "from-cyan-500 to-blue-500",
};

export default function LinkHub() {
  const [isDark, setIsDark] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [clickedCard, setClickedCard] = useState<number | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }

    // Track page view
    analytics.track(AnalyticsEvents.PAGE_VIEW, { page: "home" });

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    // Track theme toggle
    analytics.track(AnalyticsEvents.THEME_TOGGLE, { theme: newTheme ? "dark" : "light" });
  };

  const handleLinkClick = (linkId: number, url: string) => {
    setClickedCard(linkId);

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    const clicks = JSON.parse(localStorage.getItem("linkClicks") || "{}");
    clicks[linkId] = (clicks[linkId] || 0) + 1;
    localStorage.setItem("linkClicks", JSON.stringify(clicks));

    // Track link click
    analytics.track(AnalyticsEvents.LINK_CLICK, { linkId, url });

    setTimeout(() => {
      setClickedCard(null);
      if (url.startsWith("/")) {
        window.location.href = url;
      } else {
        window.open(url, "_blank");
      }
    }, 150);
  };

  const handleAvatarClick = () => {
    const avatar = document.querySelector(".avatar");
    if (avatar) {
      avatar.classList.add("pulse-glow");
      setTimeout(() => {
        avatar.classList.remove("pulse-glow");
      }, 2000);
    }
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);

    // Track photo view
    if (!isFullscreen) {
      analytics.track(AnalyticsEvents.PHOTO_VIEW, { type: "fullscreen" });
    }
  };

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => handleFullscreenToggle(),
    onSwipedDown: () => setIsFullscreen(false),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            IF24
          </motion.div>
          <motion.p className="text-slate-600 dark:text-slate-400" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
            Loading...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
      <ParticleBackground />

      {/* Enhanced Background Decoration */}
      <motion.div
        className="fixed inset-0 opacity-60 pointer-events-none"
        animate={{
          background: [
            `radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 40% 60%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`,
            `radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)`,
            `radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 40% 60%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`,
          ],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        style={{
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
        }}
      />

      {/* Enhanced Theme Toggle */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="icon"
          className="fixed top-6 right-6 z-50 w-12 h-12 rounded-xl glass-card dark:glass-card-dark hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm bg-transparent"
        >
          <motion.span className="text-xl" animate={{ rotate: isDark ? 180 : 0 }} transition={{ duration: 0.5 }}>
            {isDark ? "🌙" : "☀️"}
          </motion.span>
        </Button>
      </motion.div>

      <div className="max-w-md mx-auto p-5 relative z-10" {...swipeHandlers}>
        {/* Enhanced Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="glass-card dark:glass-card-dark rounded-3xl p-12 mb-6 text-center shadow-xl relative overflow-hidden card-3d">
          {/* Animated gradient bar */}
          <motion.div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients.primary} rounded-t-3xl`} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.3 }} />

          {/* Avatar Section */}
          <div className="mb-8">
            <motion.div
              className="avatar rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 mx-auto mb-6 flex items-center justify-center text-5xl font-bold text-white cursor-pointer relative overflow-hidden group p-1"
              onClick={handleAvatarClick}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.5 }} />
              <Image
                src="/avatar.png?height=120&width=120&text=I24"
                alt="Informatika 24 Avatar"
                width={120}
                height={120}
                className="w-full h-full object-cover rounded-full relative z-10"
                placeholder="blur"
                blurDataURL={blurDataUrls.avatar}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
                priority
              />
              <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full items-center justify-center text-5xl font-bold text-white relative z-10 hidden">I24</div>
            </motion.div>

            <motion.h1 className="text-4xl font-bold mb-2 gradient-text-animated" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              INFORMATIKA
            </motion.h1>

            <motion.p className="text-slate-600 dark:text-slate-400 max-w-xs mx-auto mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              Angkatan 24
              <br />
              Universitas Linggabuana PGRI Sukabumi
            </motion.p>
          </div>

          {/* Enhanced Social Links */}
          <motion.div className="flex justify-center gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            {[
              {
                href: "https://github.com/informatika24-unlip",
                icon: Github,
                color: "hover:from-gray-600 hover:to-gray-800",
              },
              {
                href: "https://www.youtube.com/@informatikaG2",
                icon: Youtube,
                color: "hover:from-red-500 hover:to-red-700",
              },
              {
                href: "https://www.instagram.com/informatic_ii/",
                icon: Instagram,
                color: "hover:from-pink-500 hover:to-rose-500",
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-xl glass-card dark:glass-card-dark flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-white bg-gradient-to-br ${social.color} transition-all duration-300 relative overflow-hidden group`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  analytics.track(AnalyticsEvents.SOCIAL_CLICK, {
                    platform: social.href.includes("github") ? "github" : social.href.includes("youtube") ? "youtube" : "instagram",
                  });
                }}
              >
                <motion.div className={`absolute inset-0 bg-gradient-to-br ${social.color.replace("hover:", "")} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <social.icon className="w-5 h-5 relative z-10" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Group Photo Section */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="glass-card dark:glass-card-dark rounded-3xl p-8 mb-6 shadow-xl relative overflow-hidden group card-3d">
          <motion.div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients.photo} rounded-t-3xl`} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.5 }} />

          <div className="relative z-10">
            <div className="relative group/photo">
              <motion.div className={`aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br ${gradients.photo} p-1 transition-transform duration-300`} whileHover={{ scale: 1.02 }}>
                <motion.div className="w-full h-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700 relative cursor-pointer" onClick={handleFullscreenToggle} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Image
                    src="/_MG_8492.JPG?height=400&width=600&text=Class+Photo+Informatika+24"
                    alt="Informatika 24 Class Photo"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-105"
                    placeholder="blur"
                    blurDataURL={blurDataUrls.photo}
                    priority
                  />

                  <motion.div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center" whileHover={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                    <motion.div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 glass-card rounded-full p-3" initial={{ scale: 0 }} whileHover={{ scale: 1 }}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div className="mt-4 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                <p className="text-slate-600 dark:text-slate-400 text-sm italic">"Together we learn, together we grow, together we succeed"</p>
              </motion.div>
            </div>

            <motion.div className="grid grid-cols-2 gap-4 mt-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
              {[
                { number: "19", label: "Members", color: "text-cyan-500" },
                { number: "2024", label: "Angkatan", color: "text-blue-500" },
              ].map((stat, index) => (
                <motion.div key={index} className="text-center p-3 glass-card dark:glass-card-dark rounded-xl" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                  <motion.div className={`text-lg font-bold ${stat.color} mb-1`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 + index * 0.1, type: "spring" }}>
                    {stat.number}
                  </motion.div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wide font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Links Section */}
        <motion.div className="flex flex-col gap-4 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          {linksData
            .filter((link) => link.isActive)
            .map((link, index) => (
              <motion.button
                key={link.id}
                onClick={() => handleLinkClick(link.id, link.url)}
                className={`glass-card dark:glass-card-dark rounded-2xl p-5 flex items-center gap-4 hover:shadow-xl text-left group relative overflow-hidden card-3d ${clickedCard === link.id ? "scale-95" : ""}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-50/30 dark:via-indigo-900/20 to-transparent" initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.5 }} />

                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients.primary} flex items-center justify-center text-xl text-white flex-shrink-0 transition-transform duration-300`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {link.icon}
                </motion.div>

                <div className="flex-1 relative z-10">
                  <div className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">{link.title}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{link.description}</div>
                </div>

                <motion.div
                  className="w-8 h-8 rounded-lg glass-card dark:glass-card-dark flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300"
                  whileHover={{ x: 4 }}
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.div>
              </motion.button>
            ))}
        </motion.div>

        {/* Enhanced Fullscreen Modal */}
        <AnimatePresence>
          {isFullscreen && (
            <motion.div
              className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
              onClick={handleFullscreenToggle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div className="relative max-w-6xl max-h-full" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                <Image
                  src="/_MG_8492.JPG?height=800&width=1200&text=Class+Photo+Informatika+24"
                  alt="Informatika 24 Class Photo - Fullscreen"
                  width={1200}
                  height={800}
                  className="max-w-full max-h-full object-contain rounded-2xl"
                  onClick={(e) => e.stopPropagation()}
                  placeholder="blur"
                  blurDataURL={blurDataUrls.photo}
                  priority
                />
                <motion.button onClick={handleFullscreenToggle} className="absolute top-4 left-4 glass-card hover:bg-white/30 text-white rounded-full p-2 transition-all duration-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <X className="w-6 h-6" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
