/**
 * MealCardSkeleton Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MealCardSkeleton, MealGridSkeleton } from '@/components/MealCardSkeleton';

describe('MealCardSkeleton Component', () => {
  describe('Single Card', () => {
    it('renders skeleton card without crashing', () => {
      render(<MealCardSkeleton />);
      expect(screen.getByTestId('meal-card-skeleton')).toBeInTheDocument();
    });

    it('has correct structure with all skeleton elements', () => {
      render(<MealCardSkeleton />);
      const card = screen.getByTestId('meal-card-skeleton');
      
      // Check for image skeleton
      expect(card.querySelector('.food-skeleton-image')).toBeInTheDocument();
      
      // Check for content area
      expect(card.querySelector('.food-skeleton-content')).toBeInTheDocument();
      
      // Check for logo skeleton
      expect(card.querySelector('.food-skeleton-logo')).toBeInTheDocument();
      
      // Check for badge skeleton
      expect(card.querySelector('.food-skeleton-badge')).toBeInTheDocument();
    });

    it('applies correct CSS classes for shimmer animation', () => {
      render(<MealCardSkeleton />);
      const card = screen.getByTestId('meal-card-skeleton');
      expect(card).toHaveClass('food-card-skeleton');
    });
  });

  describe('Grid Skeleton', () => {
    it('renders grid skeleton without crashing', () => {
      render(<MealGridSkeleton />);
      expect(screen.getByTestId('meal-grid-skeleton')).toBeInTheDocument();
    });

    it('renders default 6 skeleton cards', () => {
      render(<MealGridSkeleton />);
      const cards = screen.getAllByTestId('meal-card-skeleton');
      expect(cards).toHaveLength(6);
    });

    it('renders custom number of skeleton cards', () => {
      render(<MealGridSkeleton count={3} />);
      const cards = screen.getAllByTestId('meal-card-skeleton');
      expect(cards).toHaveLength(3);
    });

    it('renders 9 skeleton cards when specified', () => {
      render(<MealGridSkeleton count={9} />);
      const cards = screen.getAllByTestId('meal-card-skeleton');
      expect(cards).toHaveLength(9);
    });

    it('renders section with correct structure', () => {
      render(<MealGridSkeleton />);
      const section = screen.getByTestId('meal-grid-skeleton');
      
      // Check for section and content
      expect(section).toHaveClass('food-section');
      expect(section.querySelector('.food-content')).toBeInTheDocument();
      
      // Check for header skeleton
      expect(section.querySelector('.food-section-header-skeleton')).toBeInTheDocument();
      
      // Check for grid
      expect(section.querySelector('.food-grid')).toBeInTheDocument();
    });

    it('renders heading skeleton in header', () => {
      render(<MealGridSkeleton />);
      const header = screen.getByTestId('meal-grid-skeleton').querySelector('.food-section-header-skeleton');
      expect(header?.querySelector('.food-skeleton-text--heading')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('renders with zero count (edge case)', () => {
      render(<MealGridSkeleton count={0} />);
      const cards = screen.queryAllByTestId('meal-card-skeleton');
      expect(cards).toHaveLength(0);
    });

    it('renders with large count', () => {
      render(<MealGridSkeleton count={12} />);
      const cards = screen.getAllByTestId('meal-card-skeleton');
      expect(cards).toHaveLength(12);
    });
  });
});
