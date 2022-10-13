import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import App from './App';
import { GetBreedInfoResponse } from './services/breeds/getBreeds';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockBreedInfo = {
  name: 'ragdol',
  id: 'rag',
  origin: 'US',
  description: 'Ragdolls love their people, greeting them at the door',
};
const mockBreeds: GetBreedInfoResponse = {
  data: [
    {
      name: 'ragdol',
      id: 'rag',
      origin: 'usa',
      description: 'sssss',
    },
    {
      name: 'persa',
      id: 'per',
      origin: 'usa',
      description: 'sssss',
    },
    {
      name: 'srd',
      id: 'srd',
      origin: 'usa',
      description: 'sssss',
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

it.skip('should navigate to breedDetails page', async () => {
  render(<App />);

  const nameBreed = screen.getByText('ragdol');

  userEvent.click(within(nameBreed).getByText('saiba mais'));

  expect(await screen.findByText(/detalhe da raça/i)).toBeInTheDocument();
  expect(window.location.href).toContain('breed/rag');
});
