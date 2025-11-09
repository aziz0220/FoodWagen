/**
 * Dropdown Component
 * Reusable select dropdown with label support
 * Uses food- prefix CSS classes
 */

import React from 'react';
import { RestaurantStatus } from '@/types/meal';

export interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Dropdown label */
  label?: string;
  
  /** Options for the dropdown */
  options: Array<{ value: string; label: string }>;
  
  /** Test ID for testing */
  'data-testid'?: string;
}

/**
 * Dropdown component for restaurant status selection
 */
export const Dropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(
  ({ label, options, className = '', ...props }, ref) => {
    const classes = ['food-dropdown', className].filter(Boolean).join(' ');

    return (
      <div className="food-input-group" data-testid={props['data-testid'] ? `${props['data-testid']}-group` : undefined}>
        {label && (
          <label className="food-input-label" htmlFor={props.id}>
            {label}
          </label>
        )}
        <select ref={ref} className={classes} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

/**
 * Restaurant Status Dropdown
 * Pre-configured dropdown for restaurant status
 */
export const RestaurantStatusDropdown = React.forwardRef<
  HTMLSelectElement,
  Omit<DropdownProps, 'options'>
>((props, ref) => {
  const statusOptions = [
    { value: 'Open Now', label: 'Open Now' },
    { value: 'Closed', label: 'Closed' },
  ];

  return <Dropdown ref={ref} options={statusOptions} {...props} />;
});

RestaurantStatusDropdown.displayName = 'RestaurantStatusDropdown';
