/**
 * Input Component
 * Reusable input field with label and error message support
 * Uses food- prefix CSS classes
 */

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Input label (for Edit modal) */
  label?: string;
  
  /** Error message to display */
  error?: string;
  
  /** Whether input has a filled value (affects styling) */
  isFilled?: boolean;
  
  /** Test ID for testing */
  'data-testid'?: string;
}

/**
 * Input component with label and error message support
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, isFilled, className = '', ...props }, ref) => {
    const inputClass = isFilled ? 'food-input food-input--filled' : 'food-input';
    const errorClass = error ? 'food-input--error' : '';
    
    const classes = [inputClass, errorClass, className].filter(Boolean).join(' ');

    return (
      <div className="food-input-group" data-testid={props['data-testid'] ? `${props['data-testid']}-group` : undefined}>
        {label && (
          <label className="food-input-label" htmlFor={props.id}>
            {label}
          </label>
        )}
        <input ref={ref} className={classes} {...props} />
        {error && (
          <span className="food-text-error" data-testid="input-error">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
