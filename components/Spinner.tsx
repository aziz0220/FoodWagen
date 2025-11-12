/**
 * Spinner Component
 * Loading indicator with orange/yellow gradient
 * Designed to match the food design system
 */

import React from 'react';

export interface SpinnerProps {
  /** Size of the spinner */
  size?: 'small' | 'medium' | 'large';
  
  /** Whether to show full-page overlay */
  fullPage?: boolean;
  
  /** Custom message to display */
  message?: string;
}

/**
 * Spinner - Loading indicator with gradient animation
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  fullPage = false,
  message,
}) => {
  const spinner = (
    <div className={`food-spinner food-spinner--${size}`} data-testid="spinner">
      <div className="food-spinner-circle">
        <div className="food-spinner-gradient"></div>
      </div>
      {message && (
        <p className="food-spinner-message" data-testid="spinner-message">
          {message}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="food-spinner-overlay" data-testid="spinner-overlay">
        {spinner}
      </div>
    );
  }

  return spinner;
};
