"use client";

import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { MemberGridSkeleton } from "@/components/loading/member-card-skeleton";
import { ParticleBackground } from "@/components/ui/particle-background";
import { MemberSearch } from "@/components/search/member-search";
import { MemberDetailModal } from "@/components/member/member-detail-modal";
import { AdminPanel } from "@/components/admin/admin-panel";
import Image from "next/image";
import { blurDataUrls } from "@/lib/blur-data-url";
import { analytics, AnalyticsEvents } from "@/lib/analytics";

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
// MENAMBAHKAN ROLE
// specialRole: "leader" Untuk Ketua
// specialRole: "secretary" Untuk Sekertaris
// specialRole: "treasurer" Untuk Bendahara

const membersData: Member[] = [
  {
    id: 1,
    name: "Seli Nopiani",
    position: "Ketua Kelas",
    instagram: "@slinpiii.ii",
    image: "/member/seli.jpg?height=200&width=200",
    isLeader: true,
    specialRole: "leader",
    bio: "",
    skills: [],
    achievements: ["Member of Himpunan Informatika", "Member Of UKM LDK Al-Faruq"],
    joinDate: "September 2024",
  },
  {
    id: 2,
    name: "Ade Rama",
    position: "Anggota",
    instagram: "@rama_tcp",
    image: "/member/ade.jpg?height=200&width=200",
    bio: "",
    skills: [],
    achievements: [],
    joinDate: "September 2024",
  },
  {
    id: 3,
    name: "Akbar Maulana",
    position: "Anggota",
    instagram: "@akbar190603",
    image: "/member/akbar.jpg?height=200&width=200",
    bio: "",
    skills: [],
    achievements: [],
    joinDate: "September 2024",
  },
  {
    id: 4,
    name: "Andika Wahyu",
    position: "Anggota",
    instagram: "@andikawahyu_15",
    image: "/member/andika.jpg?height=200&width=200",
    bio: "",
    skills: [],
    achievements: [],
    joinDate: "September 2024",
  },
  {
    id: 5,
    name: "Fadilatul Hamid",
    position: "Anggota",
    instagram: "@jaisyullah_21",
    image: "/member/fadilatulhamid.jpg?height=200&width=200",
    bio: "",
    skills: [],
    achievements: ["Member of Himpunan Informatika"],
    joinDate: "September 2024",
  },
  {
    id: 6,
    name: "Imron Firmansyah",
    position: "Anggota",
    instagram: "@meunihemm0_0",
    image: "/member/imron.jpg?height=200&width=200",
    bio: "",
    skills: [],
    achievements: ["Member of Himpunan Informatika"],
    joinDate: "September 2024",
  },
  {
    id: 7,
    name: "Isyal Fauzi",
    position: "Anggota",
    instagram: "@isyl.fzi27",
    image: "/member/isyal.jpg?height=200&width=200",
    bio: "",
    skills: [],
    achievements: [],
    joinDate: "September 2024",
  },
  {
    id: 8,
    name: "Kamila Eka Yantri",
    position: "Anggota",
    instagram: "@__j.kmlxyn",
    image: "/member/kamilaekayantri.jpg?height=200&width=200",
    bio: "",
    skills: [],
    achievements: [],
    joinDate: "September 2024",
  },
  {
    id: 9,
    name: "M Hasbi Hasbullah",
    position: "Anggota",
    instagram: "@hasbihasbullh_",
    image: "/member/mhasbihasbullh.jpg?height=200&width=200",
    bio: "",
    skills: ["Junior Web Developer"],
    achievements: [],
    joinDate: "September 2024",
  },
  {
    id: 10,
    name: "Muhammad Ihsan",
    position: "anggota",
    instagram: "@sann_kuyy",
    image: "/member/ihsan.jpg?height=200&width=200",
    bio: "",
    skills: [],
    achievements: ["Member of Himpunan Informatika", "Member Of UKM LDK Al-Faruq"],
    joinDate: "September 2024",
  },
  {
    id: 11,
    name: "Muhammad Taura Azzam",
    position: "Anggota",
    instagram: "@azzamorg_",
    image: "/member/azzam.jpg?height=200&width=200",
    bio: "",
    skills: [],
    achievements: [],
    joinDate: "September 2024",
  },
  {
    id: 12,
    name: "Najma Fajrian",
    position: "Anggota",
    instagram: "@aciwir",
    image: "/member/najma.jpg?height=200&width=200",
    bio: "",
    skills: [],
    achievements: ["Member of Himpunan Informatika"],
    joinDate: "September 2024",
  },
  {
    id: 13,
    name: "Rico Pratama Putra",
    position: "Anggota",
    instagram: "@rcprmptraa_",
    image: "/member/rico.jpeg?height=200&width=200",
    bio: "",
    skills: [],
    achievements: ["Chairman of 2024", "Member of Himpunan Informatika"],
    joinDate: "September 2024",
  },
  {
    id: 14,
    name: "Sazkia Salsabila",
    position: "Anggota",
    instagram: "@aikzasbila",
    image: "/member/sazkiasalsabila.jpg?height=200&width=200",
    bio: "",
    skills: [],
    achievements: ["Member of Himpunan Informatika"],
    joinDate: "September 2024",
  },
  {
    id: 15,
    name: "Sendi Ardiansyah",
    position: "Anggota",
    instagram: "@sendiardsyh_",
    image: "/member/Sendi_A.jpg?height=200&width=200",
    bio: "",
    skills: [],
    achievements: [],
    joinDate: "September 2024",
  },
  {
    id: 16,
    name: "Sendi Maulana",
    position: "Anggota",
    instagram: "@sndimlna78_",
    image: "/member/Sendi_M.jpg?height=200&width=200",
    bio: "",
    skills: [],
    achievements: ["Member of Himpunan Informatika"],
    joinDate: "September 2024",
  },
  {
    id: 17,
    name: "Shera Nisa Shaefar",
    position: "Anggota",
    instagram: "@ransshfr",
    image: "/member/shera.jpg?height=200&width=200",
    bio: "",
    skills: [],
    achievements: [],
    joinDate: "September 2024",
  },
  {
    id: 18,
    name: "Sihab Abdul Hakim",
    position: "Anggota",
    instagram: "@shb.abdl.hkm",
    image: "/member/sihab.jpg?height=200&width=200",
    bio: "",
    skills: [],
    achievements: [],
    joinDate: "September 2024",
  },
  {
    id: 19,
    name: "Syawal Dwi Putra",
    position: "Anggota",
    instagram: "@syahwalldp",
    image: "/member/syawal.jpg?height=200&width=200",
    bio: "",
    skills: [],
    achievements: ["Member of Himpunan Informatika"],
    joinDate: "September 2024",
  },
];

export default function MembersPage() {
  const [isDark, setIsDark] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    query: "",
    position: "",
    specialRole: "",
  });

  // Filter members based on search
  const filteredMembers = useMemo(() => {
    return membersData.filter((member) => {
      const matchesQuery = !searchFilters.query || member.name.toLowerCase().includes(searchFilters.query.toLowerCase()) || member.position.toLowerCase().includes(searchFilters.query.toLowerCase());

      const matchesPosition = !searchFilters.position || member.position.toLowerCase().includes(searchFilters.position.toLowerCase());

      const matchesRole = !searchFilters.specialRole || member.specialRole?.toLowerCase() === searchFilters.specialRole.toLowerCase();

      return matchesQuery && matchesPosition && matchesRole;
    });
  }, [searchFilters]);

  useEffect(() => {
    // Track page view
    analytics.track(AnalyticsEvents.PAGE_VIEW, { page: "members" });

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
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

    analytics.track(AnalyticsEvents.THEME_TOGGLE, { theme: newTheme ? "dark" : "light" });
  };

  const handleMemberClick = (member: Member) => {
    setSelectedMember(member);
    analytics.track(AnalyticsEvents.MEMBER_VIEW, {
      memberId: member.id,
      memberName: member.name,
    });
  };

  const handleSearch = (filters: typeof searchFilters) => {
    setSearchFilters(filters);
    analytics.track(AnalyticsEvents.SEARCH, {
      query: filters.query,
      position: filters.position,
      specialRole: filters.specialRole,
      resultsCount: filteredMembers.length,
    });
  };

  const getPositionIcon = (specialRole?: string) => {
    switch (specialRole) {
      case "leader":
        return;
      case "vice-leader":
        return <Star className="w-4 h-4 text-blue-500" />;
      case "secretary":
        return;
      case "treasurer":
        return;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
        <ParticleBackground />
        <div className="max-w-6xl mx-auto p-5 pt-20 relative">
          <div className="text-center mb-12">
            <motion.div className="inline-flex items-center gap-3 glass-card dark:glass-card-dark rounded-2xl px-6 py-3 shadow-sm mb-6" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <Users className="w-6 h-6 text-indigo-500" />
              <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">Loading Members...</span>
            </motion.div>
          </div>
          <MemberGridSkeleton count={12} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
      {/* Background Decoration */}
      <div
        className="fixed inset-0 opacity-60 pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          background: `
            radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
          `,
        }}
      />

      {/* Theme Toggle */}
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="icon"
        className="fixed top-6 right-6 z-50 w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <span className="text-xl">{isDark ? "🌙" : "☀️"}</span>
      </Button>

      {/* Admin Button */}
      {/* <Button
        onClick={() => setShowAdmin(true)}
        variant="outline"
        size="icon"
        className="fixed top-6 right-20 z-50 w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <Settings className="w-5 h-5" />
      </Button> */}

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/">
          <Button
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto p-5 pt-20 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white dark:bg-slate-800 rounded-2xl px-6 py-3 border border-slate-200 dark:border-slate-700 shadow-sm mb-6">
            <Users className="w-6 h-6 text-indigo-500" />
            <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">Member Class</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Informatika 24</h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Meet our amazing class members from Computer Science 2024 at Universitas Linggabuana PGRI Sukabumi</p>
        </div>

        {/* Search */}
        <MemberSearch onSearch={handleSearch} totalResults={filteredMembers.length} />

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-6 transition-all duration-300 shadow-lg hover:shadow-2xl group relative overflow-hidden cursor-pointer"
              onClick={() => handleMemberClick(member)}
            >
              {/* Special Role Badge */}
              {member.specialRole && <div className="absolute top-4 right-4 flex items-center gap-1 z-10">{getPositionIcon(member.specialRole)}</div>}

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

              {/* Member Image */}
              <div className="relative mb-6">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-600 to-slate-700 relative">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    placeholder="blur"
                    blurDataURL={blurDataUrls.member}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl items-center justify-center text-white font-bold text-2xl hidden">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Member Info */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-950 dark:text-slate-100 mb-1 leading-tight">{member.name}</h3>
                    <div className="flex items-center gap-2">
                      {member.specialRole && getPositionIcon(member.specialRole)}
                      <p className="text-slate-700 dark:text-slate-300 font-medium">{member.position}</p>
                    </div>
                  </div>

                  {/* Instagram Handle - moved to top right */}
                  <a
                    href={`https://instagram.com/${member.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 dark:text-slate-400 hover:text-pink-400 transition-colors duration-300 font-mono text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      analytics.track(AnalyticsEvents.SOCIAL_CLICK, {
                        platform: "instagram",
                        handle: member.instagram,
                      });
                    }}
                  >
                    {member.instagram}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">No members found</h3>
            <p className="text-slate-600 dark:text-slate-400">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-500 mb-2">{membersData.length}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wide font-medium">Total Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-500 mb-2">2024</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wide font-medium">Angkatan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <MemberDetailModal member={selectedMember} isOpen={!!selectedMember} onClose={() => setSelectedMember(null)} />

      <AdminPanel isOpen={showAdmin} onClose={() => setShowAdmin(false)} />
    </div>
  );
}
