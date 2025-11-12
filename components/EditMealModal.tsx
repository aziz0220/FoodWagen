/**
 * Edit Meal Modal Component
 * Modal for editing an existing meal
 * Dimensions: 934×1132px, 6 fields WITH labels above, "Save" button
 * Pre-filled values use Source Sans Pro SemiBold #424242
 */

import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { RestaurantStatusDropdown } from './Dropdown';
import { Meal, UpdateMealData } from '@/types/meal';
import { validateMealData } from '@/lib/utils';

export interface EditMealModalProps {
  /** Whether modal is open */
  isOpen: boolean;
  
  /** Meal data to edit */
  meal: Meal | null;
  
  /** Callback when modal should close */
  onClose: () => void;
  
  /** Callback when form is submitted */
  onSubmit: (id: string, data: UpdateMealData) => void;
  
  /** Whether submission is in progress */
  isLoading?: boolean;
}

/**
 * Edit Meal Modal - 934×1132px, WITH field labels above inputs
 */
export const EditMealModal: React.FC<EditMealModalProps> = ({
  isOpen,
  meal,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Partial<UpdateMealData>>({
    food_name: '',
    food_rating: 0,
    food_image: '',
    restaurant_name: '',
    restaurant_logo: '',
    restaurant_status: 'Open Now',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form when meal changes
  useEffect(() => {
    if (meal) {
      // Helper to check if URL is a local placeholder path
      const isLocalPlaceholder = (url: string): boolean => {
        return url.startsWith('/images/food/') || url.startsWith('/images/restaurants/');
      };

      setFormData({
        food_name: meal.food_name,
        food_rating: meal.food_rating,
        food_image: isLocalPlaceholder(meal.food_image || '') ? '' : meal.food_image,
        restaurant_name: meal.restaurant_name,
        restaurant_logo: isLocalPlaceholder(meal.restaurant_logo || '') ? '' : meal.restaurant_logo,
        restaurant_status: meal.restaurant_status,
      });
      setErrors({});
    }
  }, [meal]);

  // Prevent body scroll when modal is open and maintain scroll position
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.top = `-${scrollY}px`;
      document.body.classList.add('modal-open');
    } else {
      const scrollY = document.body.style.top;
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
    };
  }, [isOpen]);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Convert food_rating to number
    const finalValue = name === 'food_rating' ? parseFloat(value) || 0 : value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!meal?.id) return;

    // Validate form data
    const validationErrors = validateMealData(formData);
    
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((err) => {
        errorMap[err.field] = err.message;
      });
      setErrors(errorMap);
      return;
    }

    // Submit data
    onSubmit(meal.id, formData as UpdateMealData);
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({
      food_name: '',
      food_rating: 0,
      food_image: '',
      restaurant_name: '',
      restaurant_logo: '',
      restaurant_status: 'Open Now',
    });
    setErrors({});
    onClose();
  };

  if (!isOpen || !meal) return null;

  return (
    <div className="food-modal-overlay" data-testid="edit-modal-overlay">
      <div className="food-modal food-modal--edit" data-testid="edit-modal">
        <h2 className="food-modal-title" data-testid="edit-modal-title">
          Edit Meal
        </h2>

        <form className="food-modal-form" onSubmit={handleSubmit} data-testid="edit-meal-form">
          {/* Food Name - WITH LABEL */}
          <Input
            id="edit_food_name"
            name="food_name"
            type="text"
            label="Food name"
            placeholder="Food name"
            value={formData.food_name}
            onChange={handleChange}
            isFilled={!!formData.food_name}
            error={errors.food_name}
            disabled={isLoading}
            data-testid="edit-food-name-input"
          />

          {/* Food Rating - WITH LABEL */}
          <Input
            id="edit_food_rating"
            name="food_rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            label="Food rating"
            placeholder="Food rating"
            value={formData.food_rating || ''}
            onChange={handleChange}
            isFilled={!!formData.food_rating}
            error={errors.food_rating}
            disabled={isLoading}
            data-testid="edit-food-rating-input"
          />

          {/* Food Image - WITH LABEL */}
          <Input
            id="edit_food_image"
            name="food_image"
            type="url"
            label="Food image (link)"
            placeholder="Food image (link)"
            value={formData.food_image}
            onChange={handleChange}
            isFilled={!!formData.food_image}
            error={errors.food_image}
            disabled={isLoading}
            data-testid="edit-food-image-input"
          />

          {/* Restaurant Name - WITH LABEL */}
          <Input
            id="edit_restaurant_name"
            name="restaurant_name"
            type="text"
            label="Restaurant name"
            placeholder="Restaurant name"
            value={formData.restaurant_name}
            onChange={handleChange}
            isFilled={!!formData.restaurant_name}
            error={errors.restaurant_name}
            disabled={isLoading}
            data-testid="edit-restaurant-name-input"
          />

          {/* Restaurant Logo - WITH LABEL */}
          <Input
            id="edit_restaurant_logo"
            name="restaurant_logo"
            type="url"
            label="Restaurant logo (link)"
            placeholder="Restaurant logo (link)"
            value={formData.restaurant_logo}
            onChange={handleChange}
            isFilled={!!formData.restaurant_logo}
            error={errors.restaurant_logo}
            disabled={isLoading}
            data-testid="edit-restaurant-logo-input"
          />

          {/* Restaurant Status - WITH LABEL */}
          <RestaurantStatusDropdown
            id="edit_restaurant_status"
            name="restaurant_status"
            label="Restaurant status (open/close)"
            value={formData.restaurant_status}
            onChange={handleChange}
            disabled={isLoading}
            data-testid="edit-restaurant-status-dropdown"
          />

          {/* Action Buttons */}
          <div className="food-modal-buttons">
            <Button
              type="submit"
              variant="primary"
              isModal
              disabled={isLoading}
              data-testid="edit-submit-button"
            >
              Save
            </Button>
            <Button
              type="button"
              variant="secondary"
              isModal
              onClick={handleCancel}
              disabled={isLoading}
              data-testid="edit-cancel-button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
