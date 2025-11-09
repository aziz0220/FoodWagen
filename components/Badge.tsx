/**
 * Badge Component
 * Status badge for restaurant status (Open/Closed)
 * Uses food- prefix CSS classes
 */

import React from 'react';
import { RestaurantStatus } from '@/types/meal';
import { getStatusBadgeClass, getStatusText } from '@/lib/utils';

export interface BadgeProps {
  /** Restaurant status */
  status: RestaurantStatus;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Test ID for testing */
  'data-testid'?: string;
}

/**
 * Badge component for displaying restaurant status
 */
export const Badge: React.FC<BadgeProps> = ({ status, className = '', ...props }) => {
  const badgeClass = getStatusBadgeClass(status);
  const statusText = getStatusText(status);
  
  const classes = ['food-badge', badgeClass, className].filter(Boolean).join(' ');

  return (
    <span className={classes} data-testid={props['data-testid']}>
      {statusText}
    </span>
  );
};
