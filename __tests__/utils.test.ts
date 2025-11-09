/**
 * Utility Functions Tests
 * Tests for filtering, validation, and helper functions
 */

import {
  filterMealsBySearch,
  filterMealsByStatus,
  filterMealsByRating,
  applyAllFilters,
  validateMealData,
  isValidUrl,
  formatRating,
  truncateText,
  getStatusBadgeClass,
} from '@/lib/utils';
import { Meal } from '@/types/meal';

// Mock meal data
const mockMeals: Meal[] = [
  {
    id: '1',
    food_name: 'Bow Lasagna',
    food_rating: 4.6,
    food_image: 'https://example.com/lasagna.jpg',
    restaurant_name: 'Subway',
    restaurant_logo: 'https://example.com/subway.png',
    restaurant_status: 'Open Now',
  },
  {
    id: '2',
    food_name: 'Avocado Smoothie',
    food_rating: 4.2,
    food_image: 'https://example.com/smoothie.jpg',
    restaurant_name: 'Juice Bar',
    restaurant_logo: 'https://example.com/juicebar.png',
    restaurant_status: 'Closed',
  },
  {
    id: '3',
    food_name: 'Pancake Stack',
    food_rating: 4.9,
    food_image: 'https://example.com/pancake.jpg',
    restaurant_name: 'Breakfast Cafe',
    restaurant_logo: 'https://example.com/cafe.png',
    restaurant_status: 'Open Now',
  },
];

describe('Utility Functions', () => {
  describe('filterMealsBySearch', () => {
    it('returns all meals when search query is empty', () => {
      const result = filterMealsBySearch(mockMeals, '');
      expect(result).toEqual(mockMeals);
    });

    it('filters meals by food name', () => {
      const result = filterMealsBySearch(mockMeals, 'lasagna');
      expect(result).toHaveLength(1);
      expect(result[0].food_name).toBe('Bow Lasagna');
    });

    it('filters meals by restaurant name', () => {
      const result = filterMealsBySearch(mockMeals, 'subway');
      expect(result).toHaveLength(1);
      expect(result[0].restaurant_name).toBe('Subway');
    });

    it('is case insensitive', () => {
      const result = filterMealsBySearch(mockMeals, 'AVOCADO');
      expect(result).toHaveLength(1);
      expect(result[0].food_name).toBe('Avocado Smoothie');
    });
  });

  describe('filterMealsByStatus', () => {
    it('returns all meals when status is "all"', () => {
      const result = filterMealsByStatus(mockMeals, 'all');
      expect(result).toEqual(mockMeals);
    });

    it('filters meals by Open Now status', () => {
      const result = filterMealsByStatus(mockMeals, 'Open Now');
      expect(result).toHaveLength(2);
      expect(result.every(meal => meal.restaurant_status === 'Open Now')).toBe(true);
    });

    it('filters meals by Closed status', () => {
      const result = filterMealsByStatus(mockMeals, 'Closed');
      expect(result).toHaveLength(1);
      expect(result[0].restaurant_status).toBe('Closed');
    });
  });

  describe('filterMealsByRating', () => {
    it('returns all meals when minRating is 0', () => {
      const result = filterMealsByRating(mockMeals, 0);
      expect(result).toEqual(mockMeals);
    });

    it('filters meals by minimum rating', () => {
      const result = filterMealsByRating(mockMeals, 4.5);
      expect(result).toHaveLength(2);
      expect(result.every(meal => meal.food_rating >= 4.5)).toBe(true);
    });

    it('returns empty array when no meals meet minimum rating', () => {
      const result = filterMealsByRating(mockMeals, 5.0);
      expect(result).toHaveLength(0);
    });
  });

  describe('applyAllFilters', () => {
    it('applies all filters correctly', () => {
      const result = applyAllFilters(mockMeals, 'pancake', 'Open Now', 4.5);
      expect(result).toHaveLength(1);
      expect(result[0].food_name).toBe('Pancake Stack');
    });

    it('returns all meals when no filters applied', () => {
      const result = applyAllFilters(mockMeals, '', 'all', 0);
      expect(result).toEqual(mockMeals);
    });
  });

  describe('validateMealData', () => {
    const validData = {
      food_name: 'Test Meal',
      food_rating: 4.5,
      food_image: 'https://example.com/image.jpg',
      restaurant_name: 'Test Restaurant',
      restaurant_logo: 'https://example.com/logo.png',
      restaurant_status: 'Open Now' as const,
    };

    it('returns no errors for valid data', () => {
      const errors = validateMealData(validData);
      expect(errors).toHaveLength(0);
    });

    it('returns error for missing food_name', () => {
      const errors = validateMealData({ ...validData, food_name: '' });
      expect(errors.some(e => e.field === 'food_name')).toBe(true);
    });

    it('returns error for missing food_rating', () => {
      const errors = validateMealData({ ...validData, food_rating: undefined });
      expect(errors.some(e => e.field === 'food_rating')).toBe(true);
    });

    it('returns error for invalid food_rating', () => {
      const errors = validateMealData({ ...validData, food_rating: 6 });
      expect(errors.some(e => e.field === 'food_rating')).toBe(true);
    });

    it('returns error for invalid food_image URL', () => {
      const errors = validateMealData({ ...validData, food_image: 'not-a-url' });
      expect(errors.some(e => e.field === 'food_image')).toBe(true);
    });

    it('returns error for missing restaurant_name', () => {
      const errors = validateMealData({ ...validData, restaurant_name: '' });
      expect(errors.some(e => e.field === 'restaurant_name')).toBe(true);
    });

    it('returns error for invalid restaurant_logo URL', () => {
      const errors = validateMealData({ ...validData, restaurant_logo: 'invalid' });
      expect(errors.some(e => e.field === 'restaurant_logo')).toBe(true);
    });

    it('returns error for invalid restaurant_status', () => {
      const errors = validateMealData({ ...validData, restaurant_status: 'Invalid' as any });
      expect(errors.some(e => e.field === 'restaurant_status')).toBe(true);
    });
  });

  describe('isValidUrl', () => {
    it('returns true for valid URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://example.com/path')).toBe(true);
    });

    it('returns false for invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('example.com')).toBe(false);
    });
  });

  describe('formatRating', () => {
    it('formats rating to one decimal place', () => {
      expect(formatRating(4.567)).toBe('4.6');
      expect(formatRating(5)).toBe('5.0');
    });
  });

  describe('truncateText', () => {
    it('returns text as-is if shorter than maxLength', () => {
      expect(truncateText('Short text', 20)).toBe('Short text');
    });

    it('truncates text and adds ellipsis if longer than maxLength', () => {
      const result = truncateText('This is a very long text that needs truncation', 20);
      expect(result).toBe('This is a very long ...');
      expect(result.length).toBe(23);
    });
  });

  describe('getStatusBadgeClass', () => {
    it('returns open badge class for Open Now status', () => {
      expect(getStatusBadgeClass('Open Now')).toBe('food-badge--open');
    });

    it('returns closed badge class for Closed status', () => {
      expect(getStatusBadgeClass('Closed')).toBe('food-badge--closed');
    });
  });
});
