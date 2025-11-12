/**
 * MealCardSkeleton Component
 * Loading placeholder with shimmer animation
 * Matches MealCard dimensions: 357px × auto
 */

import React from 'react';

/**
 * Single skeleton card
 */
export const MealCardSkeleton: React.FC = () => {
  return (
    <div className="food-card-skeleton" data-testid="meal-card-skeleton">
      <div className="food-skeleton-image"></div>
      <div className="food-skeleton-content">
        <div className="food-skeleton-header">
          <div className="food-skeleton-logo"></div>
          <div className="food-skeleton-text food-skeleton-text--title"></div>
        </div>
        <div className="food-skeleton-text food-skeleton-text--subtitle"></div>
        <div className="food-skeleton-footer">
          <div className="food-skeleton-text food-skeleton-text--small"></div>
          <div className="food-skeleton-badge"></div>
        </div>
      </div>
    </div>
  );
};

export interface MealGridSkeletonProps {
  /** Number of skeleton cards to show */
  count?: number;
}

/**
 * Grid of skeleton cards matching FeaturedMeals layout
 */
export const MealGridSkeleton: React.FC<MealGridSkeletonProps> = ({ count = 6 }) => {
  return (
    <section className="food-section" data-testid="meal-grid-skeleton">
      <div className="food-content">
        {/* Section Header Skeleton */}
        <div className="food-section-header-skeleton">
          <div className="food-skeleton-text food-skeleton-text--heading"></div>
        </div>

        {/* Grid of Skeleton Cards */}
        <div className="food-grid">
          {Array.from({ length: count }).map((_, index) => (
            <MealCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
