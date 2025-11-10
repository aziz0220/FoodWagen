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
  const rows: Meal[][] = [];
  for (let i = 0; i < meals.length; i += 4) {
    rows.push(meals.slice(i, i + 4));
  }

  return (
    <section className="food-featured">
      <h2 className="food-featured-title">Featured Meals</h2>
      
      <div className="food-featured-grid">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="food-featured-row">
            {row.map((meal, mealIndex) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onEdit={onEdit}
                onDelete={onDelete}
                priority={rowIndex === 0 && mealIndex === 0}
              />
            ))}
          </div>
        ))}
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
