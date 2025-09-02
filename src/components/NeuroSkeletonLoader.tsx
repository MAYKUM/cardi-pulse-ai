import React, { memo } from 'react';

// Optimized skeleton specifically for neurology components
const NeuroSkeletonLoader = memo(function NeuroSkeletonLoader() {
  return (
    <div className="space-y-6 animate-pulse p-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 bg-muted rounded w-48" />
          <div className="h-4 bg-muted rounded w-64" />
        </div>
        <div className="h-10 bg-muted rounded w-32" />
      </div>

      {/* Tabs skeleton */}
      <div className="space-y-4">
        <div className="flex gap-4">
          {Array(3).fill(null).map((_, i) => (
            <div key={i} className="h-10 bg-muted rounded w-24" />
          ))}
        </div>

        {/* Content skeleton */}
        <div className="space-y-4">
          {Array(3).fill(null).map((_, i) => (
            <div key={i} className="border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-muted rounded-lg" />
                  <div className="space-y-2">
                    <div className="h-5 bg-muted rounded w-32" />
                    <div className="h-4 bg-muted rounded w-48" />
                  </div>
                </div>
                <div className="h-6 bg-muted rounded w-16" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {Array(3).fill(null).map((_, j) => (
                  <div key={j} className="space-y-1">
                    <div className="h-4 bg-muted rounded w-16" />
                    <div className="h-5 bg-muted rounded w-12" />
                  </div>
                ))}
              </div>
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export { NeuroSkeletonLoader };