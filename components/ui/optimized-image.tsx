"use client";

import { useState } from "react";
import Image from "next/image";
import { blurDataUrls } from "@/lib/blur-data-url";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallbackText?: string;
  priority?: boolean;
  type?: "avatar" | "photo" | "member" | "default";
}

export function OptimizedImage({ src, alt, width, height, className = "", fallbackText, priority = false, type = "default" }: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Generate fallback text from alt if not provided
  const displayText =
    fallbackText ||
    alt
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  if (imageError) {
    return (
      <div className={`bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold ${className}`} style={{ width, height }}>
        {displayText}
      </div>
    );
  }

  return (
    <div className="relative">
      <Image src={src || "/placeholder.svg"} alt={alt} width={width} height={height} className={className} placeholder="blur" blurDataURL={blurDataUrls[type]} priority={priority} onError={handleImageError} onLoad={handleImageLoad} />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 animate-pulse flex items-center justify-center" style={{ width, height }}>
          <div className="w-6 h-6 border-2 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
