import { Skeleton } from "@/components/ui/skeleton";

export function MemberCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      {/* Avatar skeleton */}
      <div className="flex justify-center mb-4">
        <Skeleton className="w-24 h-24 rounded-2xl" />
      </div>

      {/* Name skeleton */}
      <Skeleton className="h-5 w-3/4 mx-auto mb-2" />

      {/* Position skeleton */}
      <Skeleton className="h-4 w-1/2 mx-auto mb-4" />

      {/* Instagram button skeleton */}
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  );
}

export function MemberGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <MemberCardSkeleton key={index} />
      ))}
    </div>
  );
}
