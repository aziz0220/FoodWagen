/**
 * Navigation Component
 * Top navigation bar with logo and Add Meal button
 */

'use client';

import React from 'react';
import Image from 'next/image';

export interface NavigationProps {
  onAddMealClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onAddMealClick }) => {
  return (
    <nav className="food-nav">
      <div className="food-nav-content">
        {/* Logo */}
        <div className="food-logo">
          <div className="food-logo-icon">
            <Image
              src="/images/logo/logo-icon.png"
              alt="FoodWagen"
              width={28}
              height={30}
              priority
            />
          </div>
          <span className="food-logo-text">
            Food<span className="food-logo-accent">Wagen</span>
          </span>
        </div>

        {/* Add Meal Button */}
        <button 
          className="food-button food-button--primary food-button--nav"
          onClick={onAddMealClick}
          data-testid="add-meal-button"
        >
          Add Meal
        </button>
      </div>
    </nav>
  );
};
