import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Name Generator V1', () => {
  render(<App />);
  const linkElement = screen.getByText(/Name Generator V1/i);
  expect(linkElement).toBeInTheDocument();
});

