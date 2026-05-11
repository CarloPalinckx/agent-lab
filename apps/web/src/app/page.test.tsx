import { render, screen } from '@testing-library/react';
import Page from './page';

it('renders heading and button', () => {
  render(<Page />);
  expect(screen.getByRole('heading', { name: 'Agent Lab' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
});
