/**
 * Button Component
 * Reusable button with primary/secondary variants
 * Uses food- prefix CSS classes
 */

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: 'primary' | 'secondary';
  
  /** Button size (for modal buttons) */
  isModal?: boolean;
  
  /** Button content */
  children: React.ReactNode;
  
  /** Test ID for testing */
  'data-testid'?: string;
}

/**
 * Button component with support for primary/secondary variants
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', isModal = false, children, className = '', ...props }, ref) => {
    const baseClass = 'food-button';
    const variantClass = variant === 'primary' ? 'food-button--primary' : 'food-button--secondary';
    const modalClass = isModal ? 'food-button--modal' : '';
    
    const classes = [baseClass, variantClass, modalClass, className]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
