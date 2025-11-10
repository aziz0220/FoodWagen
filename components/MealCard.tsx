/**
 * Meal Card Component
 * Displays a single meal with image, rating, restaurant info, and actions
 * 357×463px as per Figma specs - Figma Design
 */

import React, {useState} from 'react';
import Image from 'next/image';
import {Meal} from '@/types/meal';
import {Badge} from './Badge';
import {Button} from './Button';
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
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="food-card" data-testid={props['data-testid']}>
            {/* Food Image with Price Badge */}
            <div style={{position: 'relative', width: '100%', height: '233px'}}>
                <Image
                    src={foodImageError ? '/images/food/food-placeholder.png' : meal.food_image || '/images/food/food-placeholder.png'}
                    alt={meal.food_name}
                    fill
                    className="food-card-image"
                    style={{objectFit: 'cover'}}
                    sizes="357px"
                    priority={false}
                    onError={() => setFoodImageError(true)}
                />

                {/* Price Badge */}
                {meal.food_price && (
                    <div className="food-card-price-badge">
                        <FontAwesomeIcon
                            icon={faTag}/> ${typeof meal.food_price === 'number' ? meal.food_price.toFixed(2) : meal.food_price}
                    </div>
                )}

            </div>

            {/* Card Content */}
            <div className="food-card-content">
                {/* Header */}
                <div className="food-card-header">
                    {/* Left side: Logo and Title with Rating */}
                    <div className="food-card-left">
                        {/* Restaurant Logo */}
                        <div className="food-card-restaurant">
                            <div style={{
                                position: 'relative',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                overflow: 'hidden'
                            }}>
                                <Image
                                    src={logoImageError ? '/images/restaurants/restaurant-placeholder.png' : meal.restaurant_logo || '/images/restaurants/restaurant-placeholder.png'}
                                    alt={meal.restaurant_name}
                                    fill
                                    className="food-card-restaurant-logo"
                                    style={{objectFit: 'cover'}}
                                    sizes="40px"
                                    onError={() => setLogoImageError(true)}
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
                                <FontAwesomeIcon icon={faStar} style={{color: "#FFB30E",}}/>
                                <span>{formatRating(meal.food_rating)}</span>
                            </div>
                        </div>
                    </div>
                    {/*3-Dot Menu Button*/}
                    <div className="food-card-menu">
                        <button
                            className="food-card-menu-button"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Open menu"
                        >
                            <FontAwesomeIcon icon={faEllipsisVertical}/>
                        </button>
                        {/* Dropdown Menu */}
                        {menuOpen && (
                            <div className="food-card-dropdown">
                                <button onClick={() => {
                                    onEdit(meal);
                                    setMenuOpen(false);
                                }}>
                                    Edit
                                </button>
                                <button onClick={() => {
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
