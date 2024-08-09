import React from "react";

interface SkeletonProps {
  className?: string;
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  lines = 1,
}) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="skeleton h-4 rounded-lg"
        style={{ width: i === lines - 1 ? "75%" : "100%" }}
      />
    ))}
  </div>
);

export const CardSkeleton: React.FC = () => (
  <div className="glass-card p-6 space-y-4">
    <div className="skeleton h-6 w-2/3 rounded-lg" />
    <div className="space-y-2">
      <div className="skeleton h-4 w-full rounded-lg" />
      <div className="skeleton h-4 w-full rounded-lg" />
      <div className="skeleton h-4 w-3/4 rounded-lg" />
    </div>
    <div className="flex gap-2">
      <div className="skeleton h-7 w-16 rounded-full" />
      <div className="skeleton h-7 w-20 rounded-full" />
      <div className="skeleton h-7 w-14 rounded-full" />
    </div>
  </div>
);

export const TimelineSkeleton: React.FC = () => (
  <div className="space-y-8">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-center gap-6">
        <div className="skeleton h-4 w-16 rounded-lg" />
        <div className="skeleton h-3 w-3 rounded-full flex-shrink-0" />
        <div className="glass-card p-4 flex-1 space-y-3">
          <div className="skeleton h-5 w-1/2 rounded-lg" />
          <div className="skeleton h-4 w-full rounded-lg" />
          <div className="skeleton h-4 w-2/3 rounded-lg" />
        </div>
      </div>
    ))}
  </div>
);
