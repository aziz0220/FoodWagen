/**
 * Hero Component
 * Orange hero section with title and search card
 */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faBagShopping, faMotorcycle} from "@fortawesome/free-solid-svg-icons";


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
      {/* Decorative background circles */}
      <div className="food-hero-bg-circle food-hero-bg-circle-1"></div>
      <div className="food-hero-bg-circle food-hero-bg-circle-2"></div>
      <div className="food-hero-bg-circle food-hero-bg-circle-3"></div>
      
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
              <span className="food-icon"><FontAwesomeIcon icon={faMotorcycle} /></span>
              <span>Delivery</span>
            </button>
            <button
              className={`food-hero-tab ${activeTab === 'pickup' ? 'food-hero-tab--active' : ''}`}
              onClick={() => setActiveTab('pickup')}
            >
              <span className="food-icon"><FontAwesomeIcon icon={faBagShopping} /></span>
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
              className="food-button-find food-button-find--primary food-button-find--search"
              onClick={handleSearch}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              <span>Find Meal</span>
            </button>
          </div>
        </div>
      </div>


};
