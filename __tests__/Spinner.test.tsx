/**
 * Spinner Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Spinner } from '@/components/Spinner';

describe('Spinner Component', () => {
  describe('Basic Rendering', () => {
    it('renders spinner without crashing', () => {
      render(<Spinner />);
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('renders with custom message', () => {
      render(<Spinner message="Loading data..." />);
      expect(screen.getByTestId('spinner-message')).toHaveTextContent('Loading data...');
    });

    it('renders without message by default', () => {
      render(<Spinner />);
      expect(screen.queryByTestId('spinner-message')).not.toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('renders small size', () => {
      render(<Spinner size="small" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('food-spinner--small');
    });

    it('renders medium size by default', () => {
      render(<Spinner />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('food-spinner--medium');
    });

    it('renders large size', () => {
      render(<Spinner size="large" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('food-spinner--large');
    });
  });

  describe('Full Page Overlay', () => {
    it('renders with full page overlay when fullPage is true', () => {
      render(<Spinner fullPage />);
      expect(screen.getByTestId('spinner-overlay')).toBeInTheDocument();
    });

    it('renders without overlay by default', () => {
      render(<Spinner />);
      expect(screen.queryByTestId('spinner-overlay')).not.toBeInTheDocument();
    });

    it('renders spinner inside overlay when fullPage is true', () => {
      render(<Spinner fullPage message="Processing..." />);
      const overlay = screen.getByTestId('spinner-overlay');
      const spinner = screen.getByTestId('spinner');
      expect(overlay).toContainElement(spinner);
    });
  });

  describe('Combined Props', () => {
    it('renders large spinner with message and full page overlay', () => {
      render(<Spinner size="large" fullPage message="Please wait..." />);
      
      expect(screen.getByTestId('spinner-overlay')).toBeInTheDocument();
      expect(screen.getByTestId('spinner')).toHaveClass('food-spinner--large');
      expect(screen.getByTestId('spinner-message')).toHaveTextContent('Please wait...');
    });

    it('renders small spinner with message inline', () => {
      render(<Spinner size="small" message="Loading..." />);
      
      expect(screen.queryByTestId('spinner-overlay')).not.toBeInTheDocument();
      expect(screen.getByTestId('spinner')).toHaveClass('food-spinner--small');
      expect(screen.getByTestId('spinner-message')).toHaveTextContent('Loading...');
    });
  });
});
