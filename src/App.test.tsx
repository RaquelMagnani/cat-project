import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

const cats = ['ragdol', 'persa', 'srd']
describe("app",()=>{

it('should renders hello world', () => {
  render(<App />);
  const linkElement = screen.getByText(/hello world/i);
  expect(linkElement).toBeInTheDocument();
});
it('should renders a list of cat breeds', () => {
  render(<App />);
  const listElement = screen.getAllByRole('listitem');
  expect(listElement).toHaveLength(3);
});

});
