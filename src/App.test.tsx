import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import App from './App';
import { GetBreedsResponse } from './services/breeds/getBreeds';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockBreedInfo = {
  name: 'ragdol',
  id: 'rag',
  origin: 'US',
  description: 'Ragdolls love their people, greeting them at the door',
};
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
  mockedAxios.get
    .mockResolvedValueOnce(mockBreeds)
    .mockResolvedValueOnce(mockBreeds)
    .mockRejectedValueOnce(mockBreedInfo)
    .mockRejectedValueOnce(mockBreedInfo);
});
afterEach(() => {
  jest.resetAllMocks();
});

it('should navigate to breedDetails page', async () => {
  render(<App />);

  const nameBreed = screen.getByText('ragdol');

  userEvent.click(within(nameBreed).getByText('saiba mais'));

  expect(await screen.findByText(/detalhe da raça/i)).toBeInTheDocument();
  expect(window.location.href).toContain('breed/rag');
});
