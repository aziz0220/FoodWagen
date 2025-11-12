/**
 * Delete Meal Modal Component
 * Modal for confirming meal deletion
 * Dimensions: 712×325px, warning message, "Yes"/"Cancel" buttons
 * "Yes" button is ORANGE (not red danger color)
 */

import React, { useEffect } from 'react';
import { Button } from './Button';
import { Meal } from '@/types/meal';

export interface DeleteMealModalProps {
  /** Whether modal is open */
  isOpen: boolean;
  
  /** Meal to delete */
  meal: Meal | null;
  
  /** Callback when modal should close */
  onClose: () => void;
  
  /** Callback when delete is confirmed */
  onConfirm: (id: string) => void;
  
  /** Whether deletion is in progress */
  isLoading?: boolean;
}

/**
 * Delete Meal Modal - 712×325px, simple confirmation dialog
 */
export const DeleteMealModal: React.FC<DeleteMealModalProps> = ({
  isOpen,
  meal,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
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

  const handleConfirm = () => {
    if (meal?.id) {
      onConfirm(meal.id);
    }
  };

  if (!isOpen || !meal) return null;

  return (
    <div className="food-modal-overlay" data-testid="delete-modal-overlay">
      <div className="food-modal food-modal--delete" data-testid="delete-modal">
        <h2 className="food-modal-title" data-testid="delete-modal-title">
          Delete Meal
        </h2>

        <p className="food-modal-message" data-testid="delete-modal-message">
          Are you sure you want to delete this meal? Actions cannot be reversed.
        </p>

        <div className="food-modal-buttons">
          <Button
            type="button"
            variant="primary"
            isModal
            onClick={handleConfirm}
            disabled={isLoading}
            data-testid="delete-confirm-button"
          >
            Yes
          </Button>
          <Button
            type="button"
            variant="secondary"
            isModal
            onClick={onClose}
            disabled={isLoading}
            data-testid="delete-cancel-button"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
