import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomButton from './CustomButton';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<CustomButton>Click Me</CustomButton>);
    
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    
    render(<CustomButton onClick={handleClick}>Click Me</CustomButton>);
    
    const buttonElement = screen.getByText('Click Me');
    fireEvent.click(buttonElement);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with the right size class', () => {
    render(<CustomButton size="large">Large Button</CustomButton>);
    
    const buttonElement = screen.getByText('Large Button');
    expect(buttonElement).toHaveClass('text-lg');
  });

  it('renders with variant class', () => {
    render(<CustomButton variant="outline">Outline Button</CustomButton>);
    
    const buttonElement = screen.getByText('Outline Button');
    expect(buttonElement).toHaveClass('border');
  });
}); 