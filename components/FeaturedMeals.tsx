/**
 * Featured Meals Section Component
 * Displays a grid of 8 featured meals with a load more button
 */

import React from 'react';
import { Meal } from '@/types/meal';
import { MealCard } from './MealCard';
import { Button } from './Button';

export interface FeaturedMealsProps {
  /** Array of meals to display */
  meals: Meal[];
  
  /** Callback when Edit is clicked */
  onEdit: (meal: Meal) => void;
  
  /** Callback when Delete is clicked */
  onDelete: (meal: Meal) => void;
  
  /** Callback when Load More is clicked */
  onLoadMore: () => void;
  
  /** Whether there are more meals to load */
  hasMore?: boolean;
}

export const FeaturedMeals: React.FC<FeaturedMealsProps> = ({
  meals,
  onEdit,
  onDelete,
  onLoadMore,
  hasMore = false,
}) => {
  // Split meals into rows of 4
  const firstRow = meals.slice(0, 4);
  const secondRow = meals.slice(4, 8);

  return (
    <section className="food-featured">
      <h2 className="food-featured-title">Featured Meals</h2>
      
      <div className="food-featured-grid">
        {/* First Row */}
        {firstRow.length > 0 && (
          <div className="food-featured-row">
            {firstRow.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
        
        {/* Second Row */}
        {secondRow.length > 0 && (
          <div className="food-featured-row">
            {secondRow.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Load More Button */}
      {hasMore && (
        <Button
          variant="secondary"
          onClick={onLoadMore}
          className="food-load-more"
        >
          Load More
        </Button>
      )}
    </section>
  );
};
