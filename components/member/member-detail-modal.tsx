"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Instagram, Star, Crown, FileText, Coins } from "lucide-react";
import Image from "next/image";
import { blurDataUrls } from "@/lib/blur-data-url";

interface Member {
  id: number;
  name: string;
  position: string;
  instagram: string;
  image: string;
  isLeader?: boolean;
  specialRole?: string;
  bio?: string;
  skills?: string[];
  achievements?: string[];
  joinDate?: string;
}

interface MemberDetailModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MemberDetailModal({ member, isOpen, onClose }: MemberDetailModalProps) {
  if (!member) return null;

  const getRoleIcon = (specialRole?: string) => {
    switch (specialRole) {
      case "leader":
        return <Crown className="w-5 h-5 text-neutral-950 dark:text-neutral-50" />;
      case "secretary":
        return <FileText className="w-5 h-5 text-neutral-950 dark:text-neutral-50" />;
      case "treasurer":
        return <Coins className="w-5 h-5 text-neutral-950 dark:text-neutral-50" />;
      default:
        return <Star className="w-5 h-5 text-neutral-950 dark:text-neutral-50" />;
    }
  };

  const getRoleColor = (specialRole?: string) => {
    switch (specialRole) {
      case "leader":
        return "from-yellow-500 to-orange-500";
      case "secretary":
        return "from-green-500 to-emerald-500";
      case "treasurer":
        return "from-purple-500 to-violet-500";
      default:
        return "from-blue-500 to-indigo-500";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-8 pb-0">
              <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center transition-colors z-10">
                <X className="w-5 h-5" />
              </button>

              {/* Profile Section */}
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-600 to-slate-700 relative">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} width={128} height={128} className="w-full h-full object-cover" placeholder="blur" blurDataURL={blurDataUrls.member} />
                  </div>

                  {/* Role Badge */}
                  {member.specialRole && (
                    <div className={`absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-gradient-to-r ${getRoleColor(member.specialRole)} flex items-center justify-center shadow-lg`}>{getRoleIcon(member.specialRole)}</div>
                  )}
                </div>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">{member.name}</h2>

                <div className="flex items-center justify-center gap-2 mb-4">
                  {member.specialRole && getRoleIcon(member.specialRole)}
                  <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">{member.position}</p>
                </div>

                {/* Instagram Link */}
                <a
                  href={`https://instagram.com/${member.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105"
                >
                  <Instagram className="w-5 h-5" />
                  {member.instagram}
                </a>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Bio */}
              {member.bio && (
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">About</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{member.bio}</p>
                </div>
              )}

              {/* Skills */}
              {member.skills && member.skills.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">Skills & Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {member.achievements && member.achievements.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">Achievements</h3>
                  <ul className="space-y-2">
                    {member.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                        <Star className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Join Date */}
              {member.joinDate && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Member since {member.joinDate}</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
