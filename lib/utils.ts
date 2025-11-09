/**
 * Utility Functions for FoodWagen Application
 * Provides filtering, validation, and helper functions
 */

import { Meal, RestaurantStatus, CreateMealData } from '@/types/meal';

/**
 * Filter meals by search query
 * Searches in food_name and restaurant_name
 */
export function filterMealsBySearch(meals: Meal[], searchQuery: string): Meal[] {
  if (!searchQuery.trim()) {
    return meals;
  }

  const query = searchQuery.toLowerCase().trim();
  
  return meals.filter((meal) => {
    const foodName = meal.food_name?.toLowerCase() || '';
    const restaurantName = meal.restaurant_name?.toLowerCase() || '';
    
    return foodName.includes(query) || restaurantName.includes(query);
  });
}

/**
 * Filter meals by restaurant status
 */
export function filterMealsByStatus(
  meals: Meal[],
  status: RestaurantStatus | 'all'
): Meal[] {
  if (status === 'all') {
    return meals;
  }

  return meals.filter((meal) => meal.restaurant_status === status);
}

/**
 * Filter meals by minimum rating
 */
export function filterMealsByRating(meals: Meal[], minRating: number): Meal[] {
  if (minRating === 0) {
    return meals;
  }

  return meals.filter((meal) => meal.food_rating >= minRating);
}

/**
 * Apply all filters to meals
 */
export function applyAllFilters(
  meals: Meal[],
  searchQuery: string,
  status: RestaurantStatus | 'all',
  minRating: number
): Meal[] {
  let filtered = meals;
  
  filtered = filterMealsBySearch(filtered, searchQuery);
  filtered = filterMealsByStatus(filtered, status);
  filtered = filterMealsByRating(filtered, minRating);
  
  return filtered;
}

/**
 * Validation error type
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validate meal data before submission
 * Returns array of validation errors
 */
export function validateMealData(data: Partial<CreateMealData>): ValidationError[] {
  const errors: ValidationError[] = [];

  // Food name validation
  if (!data.food_name || !data.food_name.trim()) {
    errors.push({
      field: 'food_name',
      message: 'Food name is required',
    });
  }

  // Food rating validation
  if (data.food_rating === undefined || data.food_rating === null) {
    errors.push({
      field: 'food_rating',
      message: 'Food rating is required',
    });
  } else if (data.food_rating < 0 || data.food_rating > 5) {
    errors.push({
      field: 'food_rating',
      message: 'Food rating must be between 0 and 5',
    });
  }

  // Food image validation
  if (!data.food_image || !data.food_image.trim()) {
    errors.push({
      field: 'food_image',
      message: 'Food image URL is required',
    });
  } else if (!isValidUrl(data.food_image)) {
    errors.push({
      field: 'food_image',
      message: 'Food image must be a valid URL',
    });
  }

  // Restaurant name validation
  if (!data.restaurant_name || !data.restaurant_name.trim()) {
    errors.push({
      field: 'restaurant_name',
      message: 'Restaurant name is required',
    });
  }

  // Restaurant logo validation
  if (!data.restaurant_logo || !data.restaurant_logo.trim()) {
    errors.push({
      field: 'restaurant_logo',
      message: 'Restaurant logo URL is required',
    });
  } else if (!isValidUrl(data.restaurant_logo)) {
    errors.push({
      field: 'restaurant_logo',
      message: 'Restaurant logo must be a valid URL',
    });
  }

  // Restaurant status validation
  if (!data.restaurant_status) {
    errors.push({
      field: 'restaurant_status',
      message: 'Restaurant status is required',
    });
  } else if (data.restaurant_status !== 'Open Now' && data.restaurant_status !== 'Closed') {
    errors.push({
      field: 'restaurant_status',
      message: 'Restaurant status must be "Open Now" or "Closed"',
    });
  }

  return errors;
}

/**
 * Check if a string is a valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Format rating for display
 */
export function formatRating(rating: number | undefined | null): string {
  if (rating === undefined || rating === null || isNaN(rating)) {
    return '0.0';
  }
  return Number(rating).toFixed(1);
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength) + '...';
}

/**
 * Get badge color class based on restaurant status
 */
export function getStatusBadgeClass(status: RestaurantStatus): string {
  return status === 'Open Now' ? 'food-badge--open' : 'food-badge--closed';
}

/**
 * Get display text for restaurant status
 */
export function getStatusText(status: RestaurantStatus): string {
  return status;
}

/**
 * Debounce function for search input
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
