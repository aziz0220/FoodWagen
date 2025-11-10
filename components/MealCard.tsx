/**
 * Meal Card Component
 * Displays a single meal with image, rating, restaurant info, and actions
 * 357×463px as per Figma specs - Figma Design
 */

import React, {useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import {Meal} from '@/types/meal';
import {Badge} from './Badge';
import {formatRating} from '@/lib/utils';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTag, faEllipsisVertical, faStar} from "@fortawesome/free-solid-svg-icons";

export interface MealCardProps {
    /** Meal data to display */
    meal: Meal;

    /** Callback when Edit button is clicked */
    onEdit: (meal: Meal) => void;

    /** Callback when Delete button is clicked */
    onDelete: (meal: Meal) => void;

    /** Whether this is a priority image (for LCP optimization) */
    priority?: boolean;

    /** Test ID for testing */
    'data-testid'?: string;
}

/**
 * Meal Card component with image, details, and action buttons
 */
// Get random placeholder functions
const getRandomFoodPlaceholder = (): string => {
    const placeholders = ['food-1.png', 'food-2.png', 'food-3.png', 'food-4.png', 'food-5.png', 'food-6.png', 'food-7.png', 'food-8.png'];
    const random = placeholders[Math.floor(Math.random() * placeholders.length)];
    return `/images/food/${random}`;
};

const getRandomRestaurantPlaceholder = (): string => {
    const placeholders = ['restaurant-1.png', 'restaurant-2.png', 'restaurant-3.png', 'restaurant-4.png', 'restaurant-5.png', 'restaurant-6.png', 'restaurant-7.png', 'restaurant-8.png'];
    const random = placeholders[Math.floor(Math.random() * placeholders.length)];
    return `/images/restaurants/${random}`;
};

export const MealCard: React.FC<MealCardProps> = ({
                                                      meal,
                                                      onEdit,
                                                      onDelete,
                                                      priority = false,
                                                      ...props
                                                  }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [foodPlaceholder] = useState(getRandomFoodPlaceholder());
    const [logoPlaceholder] = useState(getRandomRestaurantPlaceholder());
    
    // Determine the actual image source with fallback logic
    const foodImageSrc = meal.food_image && meal.food_image.trim() !== '' ? meal.food_image : foodPlaceholder;
    const logoImageSrc = meal.restaurant_logo && meal.restaurant_logo.trim() !== '' ? meal.restaurant_logo : logoPlaceholder;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <div className="food-card" data-testid={props['data-testid']}>
            {/* Food Image with Price Badge */}
            <div style={{position: 'relative', width: '100%', height: '233px'}}>
                <Image
                    src={foodImageSrc}
                    alt={meal.food_name}
                    fill
                    className="food-card-image"
                    style={{objectFit: 'cover'}}
                    sizes="357px"
                    priority={priority}
                    loading={priority ? 'eager' : 'lazy'}
                    onError={(e) => {
                        // Fallback to placeholder on error
                        const target = e.target as HTMLImageElement;
                        target.src = foodPlaceholder;
                    }}
                />

                {/* Price Badge */}
                {meal.food_price && (
                    <div className="food-card-price-badge">
                        <FontAwesomeIcon icon={faTag} /> ${typeof meal.food_price === 'number' ? meal.food_price.toFixed(2) : meal.food_price}
                    </div>
                )}

            </div>

            {/* Card Content */}
            <div className="food-card-content">
                {/* Header */}
                <div className="food-card-header">
                    {/* Left side: Logo and Title with Rating */}
                    <div className="food-card-left">
                        {/* Restaurant Logo - Rectangular with rounded corners */}
                        <div className="food-card-restaurant">
                            <div style={{
                                position: 'relative',
                                width: '48px',
                                height: '48px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                flexShrink: 0
                            }}>
                                <Image
                                    src={logoImageSrc}
                                    alt={meal.restaurant_name}
                                    fill
                                    className="food-card-restaurant-logo"
                                    style={{objectFit: 'cover'}}
                                    sizes="48px"
                                    onError={(e) => {
                                        // Fallback to placeholder on error
                                        const target = e.target as HTMLImageElement;
                                        target.src = logoPlaceholder;
                                    }}
                                />
                            </div>
                        </div>
                        {/* Title and Rating */}
                        <div className="food-card-title-and-rating">
                            {/*Title*/}
                            <div className="food-card-title">
                                <h6 data-testid="meal-name">
                                    {meal.food_name}
                                </h6>
                            </div>
                            {/* Rating */}
                                <div className="food-card-rating" data-testid="meal-rating">
                                <FontAwesomeIcon icon={faStar} style={{width: '20px'}}/>       <span>{formatRating(meal.food_rating)}</span>

                            </div>
                        </div>
                    </div>
                    {/*3-Dot Menu Button*/}
                    <div className="food-card-menu" ref={menuRef}>
                        <button
                            className="food-card-menu-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setMenuOpen(!menuOpen);
                            }}
                            aria-label="Open menu"
                        >
                            <FontAwesomeIcon icon={faEllipsisVertical} style={{width: '20px', height: '20px'}}/>
                        </button>
                        {/* Dropdown Menu */}
                        {menuOpen && (
                            <div className="food-card-dropdown">
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(meal);
                                    setMenuOpen(false);
                                }}>
                                    Edit
                                </button>
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(meal);
                                    setMenuOpen(false);
                                }}>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>


                {/* Status Badge */}
                <div>
                    <Badge status={meal.restaurant_status} data-testid="restaurant-status"/>
                </div>
            </div>
        </div>
    );
};
