"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Users, BarChart3, Plus, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AdminStats {
  totalMembers: number;
  totalViews: number;
  totalClicks: number;
  lastUpdated: string;
}

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const stats: AdminStats = {
    totalMembers: 12,
    totalViews: 1247,
    totalClicks: 89,
    lastUpdated: "2024-01-15",
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "members", label: "Members", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (!isOpen) return null;

  return (
    <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="bg-white dark:bg-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Admin Panel</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${activeTab === tab.id ? "bg-indigo-500 text-white" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-6 h-6" />
                    <span className="text-sm opacity-90">Total Members</span>
                  </div>
                  <div className="text-3xl font-bold">{stats.totalMembers}</div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <Eye className="w-6 h-6" />
                    <span className="text-sm opacity-90">Total Views</span>
                  </div>
                  <div className="text-3xl font-bold">{stats.totalViews}</div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="w-6 h-6" />
                    <span className="text-sm opacity-90">Total Clicks</span>
                  </div>
                  <div className="text-3xl font-bold">{stats.totalClicks}</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-slate-600 dark:text-slate-400">New member "Ahmad Rizki" added</span>
                    <span className="text-slate-400 text-xs ml-auto">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-600 dark:text-slate-400">Member profile updated</span>
                    <span className="text-slate-400 text-xs ml-auto">5 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-slate-600 dark:text-slate-400">Class photo uploaded</span>
                    <span className="text-slate-400 text-xs ml-auto">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "members" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Manage Members</h3>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Member
                </Button>
              </div>

              {/* Members List */}
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-semibold">M{i}</div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">Member {i}</div>
                        <div className="text-sm text-slate-500">member{i}@example.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Application Settings</h3>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                  <label className="flex items-center justify-between">
                    <span className="text-slate-900 dark:text-slate-100">Enable member registration</span>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </label>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                  <label className="flex items-center justify-between">
                    <span className="text-slate-900 dark:text-slate-100">Public member directory</span>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </label>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                  <label className="flex items-center justify-between">
                    <span className="text-slate-900 dark:text-slate-100">Analytics tracking</span>
                    <input type="checkbox" className="toggle" />
                  </label>
                </div>
              </div>

              <Button className="w-full">Save Settings</Button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
