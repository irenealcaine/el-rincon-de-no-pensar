import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the home page', () => {
  render(<App />);
  const heading = screen.getByText('El rincón de no pensar');
  expect(heading).toBeInTheDocument();
});
