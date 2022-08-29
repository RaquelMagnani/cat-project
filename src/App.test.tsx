import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import App from './App';
import { GetBreedsResponse } from './services/breeds/getBreeds';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockBreeds: GetBreedsResponse = {
  data: [
    {
      name: 'ragdol',
      id: 'rag',
    },
    {
      name: 'persa',
      id: 'per',
    },
    {
      name: 'srd',
      id: 'srd',
    },
  ],
};

beforeEach(() => {
  mockedAxios.get.mockResolvedValue(mockBreeds);
  Object.defineProperty(window, 'location', {
    get() {
      return { href: mockedAxios };
    },
  });
});

describe('app', () => {
  it('should renders Cats Breeds', async () => {
    render(<App />);
    const linkElement = await screen.findByText(/cats breeds/i);
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

  it('should appear a `Saiba Mais` link on cat breeds card', async () => {
    render(<App />);
    const linkElement = await screen.findAllByRole('link', {
      name: /saiba mais/i,
    });
    expect(linkElement).toHaveLength(3);
  });

  it('should change url to breed id', async () => {
    render(<App />);
    await userEvent.click(
      screen.getAllByRole('link', { name: /saiba mais/i })[0]
    );
    expect(window.location.href).toBe('breed/rag');
  });
});
