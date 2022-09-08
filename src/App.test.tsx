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
});

it('should navigate to breedDetails page', async () => {
  render(<App />);
  const links = await screen.findAllByRole('link', { name: /saiba mais/i });
  userEvent.click(links[0]);
  expect(window.location.href).toContain('breed/rag');
  expect(screen.getByText(/detalhe da raça/i)).toBeInTheDocument();
});
