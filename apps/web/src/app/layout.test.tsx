import { render, screen } from '@testing-library/react';
import RootLayout from './layout';

it('renders children', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  render(<RootLayout><span data-testid="child">content</span></RootLayout>, {
    container: document.documentElement,
  });
  expect(screen.getByTestId('child')).toBeInTheDocument();
  jest.restoreAllMocks();
});
