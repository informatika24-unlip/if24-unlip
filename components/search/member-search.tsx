"use client";

import { useState } from "react";
import { Search, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface SearchFilters {
  query: string;
  position: string;
  specialRole: string;
}

interface MemberSearchProps {
  onSearch: (filters: SearchFilters) => void;
  totalResults: number;
}

export function MemberSearch({ onSearch, totalResults }: MemberSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    position: "",
    specialRole: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const positions = ["All", "Ketua Kelas", "Sekretaris", "Bendahara", "Anggota"];
  const specialRoles = ["All", "Leader", "Secretary", "Treasurer"];

  const handleQueryChange = (query: string) => {
    const newFilters = { ...filters, query };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value === "All" ? "" : value.toLowerCase() };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { query: "", position: "", specialRole: "" };
    setFilters(clearedFilters);
    onSearch(clearedFilters);
  };

  const hasActiveFilters = filters.query || filters.position || filters.specialRole;

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search members by name..."
            value={filters.query}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-slate-900 dark:text-slate-100"
          />
          {filters.query && (
            <button onClick={() => handleQueryChange("")} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Toggle & Results */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && <span className="bg-indigo-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">!</span>}
          </Button>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-slate-500">
              Clear all
            </Button>
          )}
        </div>

        <div className="text-sm text-slate-600 dark:text-slate-400">
          {totalResults} member{totalResults !== 1 ? "s" : ""} found
        </div>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Position Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Position</label>
                <select
                  value={filters.position ? positions.find((p) => p.toLowerCase() === filters.position) || "All" : "All"}
                  onChange={(e) => handleFilterChange("position", e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                >
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </div>

              {/* Special Role Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Special Role</label>
                <select
                  value={filters.specialRole ? specialRoles.find((r) => r.toLowerCase() === filters.specialRole) || "All" : "All"}
                  onChange={(e) => handleFilterChange("specialRole", e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                >
                  {specialRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
