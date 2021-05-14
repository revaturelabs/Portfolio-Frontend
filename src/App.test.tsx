import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import TestComponent from './components/TestComponent';

test('renders App Component', () => {
  render(<App />);
  const linkElement = screen.getByText("Portfolio");
  expect(linkElement).toBeInTheDocument();
});

test('button is visible', () => {
  render(<TestComponent />);
  const button = screen.getByRole('button', {name: "Plus One"});
  expect(button).toBeVisible();
});

test('counter displays correct initial value', () => {
  render(<TestComponent />);
  const button = screen.getByText(/Counter/i);
  expect(button.innerHTML).toBe("Counter: 0");
});

test('counter increments', () => {
  render(<TestComponent />);
  const button = screen.getByText(/Plus/i);
  button.click();
  const linkElement = screen.getByText(/Counter/i);
  expect(linkElement.innerHTML).toBe("Counter: 1");
});

test('counter decrements', () => {
  render(<TestComponent />);
  const button = screen.getByText(/Minus/i);
  button.click();
  const linkElement = screen.getByText(/Counter/i);
  expect(linkElement.innerHTML).toBe("Counter: -1");
});


