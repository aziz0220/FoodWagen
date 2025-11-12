/**
 * Add Meal Modal Component
 * Modal for creating a new meal
 * Dimensions: 934×840px, 6 fields without labels, "Add " button (with space)
 */

import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { RestaurantStatusDropdown } from './Dropdown';
import { CreateMealData } from '@/types/meal';
import { validateMealData, ValidationError } from '@/lib/utils';

export interface AddMealModalProps {
  /** Whether modal is open */
  isOpen: boolean;
  
  /** Callback when modal should close */
  onClose: () => void;
  
  /** Callback when form is submitted */
  onSubmit: (data: CreateMealData) => void;
  
  /** Whether submission is in progress */
  isLoading?: boolean;
}

/**
 * Add Meal Modal - 934×840px, no field labels
 */
export const AddMealModal: React.FC<AddMealModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Partial<CreateMealData>>({
    food_name: '',
    food_rating: 0,
    food_image: '',
    restaurant_name: '',
    restaurant_logo: '',
    restaurant_status: 'Open Now',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    return () => {
      document.body.classList.remove('modal-open');
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
    onSubmit(formData as CreateMealData);
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

  if (!isOpen) return null;

  return (
    <div className="food-modal-overlay" data-testid="add-modal-overlay">
      <div className="food-modal food-modal--add" data-testid="add-modal">
        <h2 className="food-modal-title" data-testid="add-modal-title">
          Add a meal
        </h2>

        <form className="food-modal-form" onSubmit={handleSubmit} data-testid="add-meal-form">
          {/* Food Name - NO LABEL */}
          <Input
            id="food_name"
            name="food_name"
            type="text"
            placeholder="Food name"
            value={formData.food_name}
            onChange={handleChange}
            error={errors.food_name}
            disabled={isLoading}
            data-testid="food-name-input"
          />

          {/* Food Rating - NO LABEL */}
          <Input
            id="food_rating"
            name="food_rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            placeholder="Food rating"
            value={formData.food_rating || ''}
            onChange={handleChange}
            error={errors.food_rating}
            disabled={isLoading}
            data-testid="food-rating-input"
          />

          {/* Food Image - NO LABEL */}
          <Input
            id="food_image"
            name="food_image"
            type="url"
            placeholder="Food image (link)"
            value={formData.food_image}
            onChange={handleChange}
            error={errors.food_image}
            disabled={isLoading}
            data-testid="food-image-input"
          />

          {/* Restaurant Name - NO LABEL */}
          <Input
            id="restaurant_name"
            name="restaurant_name"
            type="text"
            placeholder="Restaurant name"
            value={formData.restaurant_name}
            onChange={handleChange}
            error={errors.restaurant_name}
            disabled={isLoading}
            data-testid="restaurant-name-input"
          />

          {/* Restaurant Logo - NO LABEL */}
          <Input
            id="restaurant_logo"
            name="restaurant_logo"
            type="url"
            placeholder="Restaurant logo (link)"
            value={formData.restaurant_logo}
            onChange={handleChange}
            error={errors.restaurant_logo}
            disabled={isLoading}
            data-testid="restaurant-logo-input"
          />

          {/* Restaurant Status - NO LABEL */}
          <RestaurantStatusDropdown
            id="restaurant_status"
            name="restaurant_status"
            value={formData.restaurant_status}
            onChange={handleChange}
            disabled={isLoading}
            data-testid="restaurant-status-dropdown"
          />

          {/* Action Buttons */}
          <div className="food-modal-buttons">
            <Button
              type="submit"
              variant="primary"
              isModal
              disabled={isLoading}
              data-testid="add-submit-button"
            >
              Add {/* NOTE: Space after "Add" as per Figma */}
            </Button>
            <Button
              type="button"
              variant="secondary"
              isModal
              onClick={handleCancel}
              disabled={isLoading}
              data-testid="add-cancel-button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
