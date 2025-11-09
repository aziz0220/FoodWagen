/**
 * Meal Card Component
 * Displays a single meal with image, rating, restaurant info, and actions
 * 357×463px as per Figma specs
 */

import React, { useState } from 'react';
import Image from 'next/image';
import { Meal } from '@/types/meal';
import { Badge } from './Badge';
import { Button } from './Button';
import { formatRating } from '@/lib/utils';

export interface MealCardProps {
  /** Meal data to display */
  meal: Meal;
  
  /** Callback when Edit button is clicked */
  onEdit: (meal: Meal) => void;
  
  /** Callback when Delete button is clicked */
  onDelete: (meal: Meal) => void;
  
  /** Test ID for testing */
  'data-testid'?: string;
}

/**
 * Meal Card component with image, details, and action buttons
 */
export const MealCard: React.FC<MealCardProps> = ({
  meal,
  onEdit,
  onDelete,
  ...props
}) => {
  const [foodImageError, setFoodImageError] = useState(false);
  const [logoImageError, setLogoImageError] = useState(false);

  return (
    <div className="food-card" data-testid={props['data-testid']}>
      {/* Food Image */}
      <div style={{ position: 'relative', width: '100%', height: '233px' }}>
        <Image
          src={foodImageError ? '/food-placeholder.png' : meal.food_image || '/food-placeholder.png'}
          alt={meal.food_name}
          fill
          className="food-card-image"
          style={{ objectFit: 'cover' }}
          sizes="357px"
          priority={false}
          onError={() => setFoodImageError(true)}
        />
      </div>

      {/* Card Content */}
      <div className="food-card-content">
        {/* Header: Title and Rating */}
        <div className="food-card-header">
          <h3 className="food-card-title" data-testid="meal-name">
            {meal.food_name}
          </h3>
          <div className="food-card-rating" data-testid="meal-rating">
            <span>⭐</span>
            <span>{formatRating(meal.food_rating)}</span>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="food-card-restaurant">
          <div style={{ position: 'relative', width: '40px', height: '40px' }}>
            <Image
              src={logoImageError ? '/restaurant-placeholder.png' : meal.restaurant_logo || '/restaurant-placeholder.png'}
              alt={meal.restaurant_name}
              fill
              className="food-card-restaurant-logo"
              style={{ objectFit: 'cover', borderRadius: '50%' }}
              sizes="40px"
              onError={() => setLogoImageError(true)}
            />
          </div>
          <span className="food-card-restaurant-name" data-testid="restaurant-name">
            {meal.restaurant_name}
          </span>
        </div>

        {/* Status Badge */}
        <div>
          <Badge status={meal.restaurant_status} data-testid="restaurant-status" />
        </div>

        {/* Action Buttons */}
        <div className="food-card-actions">
          <Button
            variant="secondary"
            onClick={() => onEdit(meal)}
            style={{ flex: 1, fontSize: '14px', padding: '12px 16px', height: 'auto' }}
            data-testid="edit-button"
          >
            Edit
          </Button>
          <Button
            variant="secondary"
            onClick={() => onDelete(meal)}
            style={{ flex: 1, fontSize: '14px', padding: '12px 16px', height: 'auto' }}
            data-testid="delete-button"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
