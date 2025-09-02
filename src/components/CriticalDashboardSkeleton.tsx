import React, { memo, useMemo } from 'react';

// Critical above-the-fold dashboard skeleton for instant LCP
const CriticalDashboardSkeleton = memo(function CriticalDashboardSkeleton() {
  const skeletonCards = useMemo(() => Array(4).fill(null), []);
  
  return (
    <div className="critical-above-fold lcp-optimized p-6 space-y-6 animate-pulse">
      {/* Top metrics cards - critical for LCP */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skeletonCards.map((_, i) => (
          <div key={i} className="bg-card border rounded-lg p-6 space-y-3">
            <div className="h-4 bg-muted rounded w-2/3" />
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="h-3 bg-muted rounded w-1/2" />
          </div>
        ))}
      </div>
      
      {/* Main content area skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border rounded-lg p-6">
            <div className="h-6 bg-muted rounded w-1/4 mb-4" />
            <div className="space-y-3">
              {Array(5).fill(null).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-8 w-8 bg-muted rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-card border rounded-lg p-6">
            <div className="h-6 bg-muted rounded w-1/3 mb-4" />
            <div className="grid grid-cols-2 gap-3">
              {Array(6).fill(null).map((_, i) => (
                <div key={i} className="h-20 bg-muted rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export { CriticalDashboardSkeleton };