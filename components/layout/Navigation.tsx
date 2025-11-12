/**
 * Navigation Component
 * Top navigation bar with logo, theme toggle, and Add Meal button
 */

'use client';

import React from 'react';
import { Button } from '../Button';
import { useTheme } from '@/lib/theme';

export interface NavigationProps {
  onAddMealClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onAddMealClick }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="food-nav">
      <div className="food-nav-content">
        {/* Logo */}
        <div className="food-logo">
          <div className="food-logo-icon">
            {/* Using img tag for SVG logo */}
            <img
              src="/images/logo/logo-icon.svg"
              alt="FoodWagen"
              width={28}
              height={30}
            />
          </div>
          <span className="food-logo-text">
            Food<span className="food-logo-accent">Wagen</span>
          </span>
        </div>

        {/* Theme Toggle and Add Meal Button */}
        <div className="food-nav-actions">
          <button
            onClick={toggleTheme}
            className="food-theme-toggle"
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <Button
            variant="primary"
            onClick={onAddMealClick}
            className="food-button--nav"
          >
            <span className="food-nav-button-text">Add Meal</span>
            <span className="food-nav-button-icon">+</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};
