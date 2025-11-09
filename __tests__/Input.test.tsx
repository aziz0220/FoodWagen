/**
 * Input Component Tests
 * Tests for the reusable Input component with label and error support
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@/components/Input';

describe('Input Component', () => {
  it('renders input field', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders with label when provided', () => {
    render(<Input label="Food Name" id="food-name" />);
    expect(screen.getByLabelText('Food Name')).toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    render(<Input error="This field is required" data-testid="test-input" />);
    expect(screen.getByTestId('input-error')).toHaveTextContent('This field is required');
  });

  it('applies filled class when isFilled is true', () => {
    render(<Input isFilled value="filled value" readOnly />);
    const input = screen.getByDisplayValue('filled value');
    expect(input).toHaveClass('food-input--filled');
  });

  it('applies error class when error is present', () => {
    render(<Input error="Error message" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('food-input--error');
  });

  it('calls onChange handler when value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('renders with correct type attribute', () => {
    render(<Input type="email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('renders with correct name attribute', () => {
    render(<Input name="food_name" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('name', 'food_name');
  });
});
