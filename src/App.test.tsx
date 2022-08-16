import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';
import { GetBreedsResponse } from './services/breeds/getBreeds';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockBreeds: GetBreedsResponse = {
  data: [
    {
      name: 'ragdol',
    },
    {
      name: 'persa',
    },
    {
      name: 'srd',
    },
  ],
};

beforeEach(() => {
  mockedAxios.get.mockResolvedValue(mockBreeds);
});

describe('app', () => {
  it('should renders Cats Breeds', () => {
    render(<App />);
    const linkElement = screen.getByText(/cats breeds/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('should renders a list of cat breeds', async () => {
    render(<App />);
    const listElement = await screen.findAllByRole('listitem');
    expect(listElement).toHaveLength(3);
  });

  it('should appear a loaderComponent when the list is loading', () => {
    render(<App />);
    const element = screen.getByText(/loading.../i);
    expect(element).toBeInTheDocument();
  });

  it('should appear a link on cat breeds card', () => {
    render(<App />);
    const linkElementO = screen.getAllByRole('link');
    expect(linkElementO).toBeInTheDocument();
  });
});
