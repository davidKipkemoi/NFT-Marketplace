import React from 'react';
import Skeleton from './Skeleton';

const CardSkeleton = () => {
  return (
    <div className="rounded-lg overflow-hidden border border-slate-700/50 backdrop-blur-sm bg-gradient-to-b from-zinc-800/80 to-slate-900/80">
      {/* Image area */}
      <Skeleton height="16rem" className="w-full" />
      
      {/* Content area */}
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          {/* Avatar */}
          <Skeleton width="3rem" height="3rem" circle={true} />
          
          {/* Name and title */}
          <div className="flex-1">
            <Skeleton width="70%" height="1.25rem" className="mb-2" />
            <Skeleton width="50%" height="0.875rem" />
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-between items-center pt-2 border-t border-slate-700/50">
          <Skeleton width="40%" height="1rem" />
          <Skeleton width="20%" height="1.5rem" className="rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton; 