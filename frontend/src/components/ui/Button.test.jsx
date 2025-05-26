import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click Me</Button>);
    
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    const buttonElement = screen.getByText('Click Me');
    fireEvent.click(buttonElement);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with the right size class', () => {
    render(<Button size="large">Large Button</Button>);
    
    const buttonElement = screen.getByText('Large Button');
    expect(buttonElement).toHaveClass('text-lg');
  });

  it('renders with variant class', () => {
    render(<Button variant="outline">Outline Button</Button>);
    
    const buttonElement = screen.getByText('Outline Button');
    expect(buttonElement).toHaveClass('border');
  });
}); 