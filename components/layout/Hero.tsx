/**
 * Hero Component
 * Orange hero section with title and search card
 */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export interface HeroProps {
  onSearch?: (query: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'delivery' | 'pickup'>('delivery');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <section className="food-hero">
      <div className="food-hero-content">
        {/* Title */}
        <div className="food-hero-title">
          <h1>Are you starving?</h1>
          <p>Within a few clicks, find meals that are accessible near you</p>
        </div>

        {/* Search Card */}
        <div className="food-hero-card">
          {/* Tabs */}
          <div className="food-hero-tabs">
            <button
              className={`food-hero-tab ${activeTab === 'delivery' ? 'food-hero-tab--active' : ''}`}
              onClick={() => setActiveTab('delivery')}
            >
              <span className="food-icon">🏍️</span>
              <span>Delivery</span>
            </button>
            <button
              className={`food-hero-tab ${activeTab === 'pickup' ? 'food-hero-tab--active' : ''}`}
              onClick={() => setActiveTab('pickup')}
            >
              <span className="food-icon">🛍️</span>
              <span>Pickup</span>
            </button>
          </div>

          <div className="food-hero-divider"></div>

          {/* Search Input */}
          <div className="food-hero-search">
            <div className="food-hero-input-wrapper">
              <div className="food-hero-input">
                <Image
                  src="/icons/search.svg"
                  alt="Search"
                  width={18}
                  height={18}
                />
                <input
                  type="text"
                  placeholder="What do you like to eat today?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
            <button 
              className="food-button food-button--primary food-button--search"
              onClick={handleSearch}
            >
              <span className="food-icon">🔍</span>
              <span>Find Meal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Food Image */}
      <div className="food-hero-image">
        <Image
          src="/images/hero/hero-food.png"
          alt="Delicious food"
          width={497}
          height={497}
          priority
        />
      </div>
    </section>
  );
};
