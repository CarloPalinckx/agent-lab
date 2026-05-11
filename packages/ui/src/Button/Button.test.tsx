import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../index';

describe('Button', () => {
  it('renders label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handler = vi.fn();
    render(<Button label="Click" onClick={handler} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('applies secondary variant', () => {
    render(<Button label="Secondary" variant="secondary" />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveStyle({ backgroundColor: '#e5e7eb', color: '#111827' });
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Disabled" disabled />);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveStyle({ cursor: 'not-allowed' });
  });
});
