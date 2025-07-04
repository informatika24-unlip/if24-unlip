"use client";

import { motion } from "framer-motion";

export function PageLoading() {
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
          Loading LinkHub...
        </motion.p>
      </motion.div>
    </div>
  );
}

export function ComponentLoading({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <motion.div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-500 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} />
    </div>
  );
}
