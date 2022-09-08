import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { getBreedById } from '../services/breeds/getBreeds';
import BreedDetailsPage from './breedDetailsPage';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockBreedInfo = {
  name: 'ragdol',
  id: 'rag',
  origin: 'US',
  description: 'Ragdolls love their people, greeting them at the door',
};
jest.mock('../services/breeds/getBreeds.tsx', () => ({
  getBreedById: jest.fn(),
}));
beforeEach(() => {
  mockedAxios.get.mockResolvedValue(mockBreedInfo);
  render(<BreedDetailsPage />);
});
it('Should render Detalhe da Raça', async () => {
  const linkElement = await screen.findByText(/detalhe da raça/i);
  expect(linkElement).toBeInTheDocument();
});

it('should renders a list of breed infos', async () => {
  const listElement = await screen.findAllByRole('listitem');
  expect(listElement).toHaveLength(4);
});
it('Should call getBreedById()with correct parameters', async () => {
  const mock = (getBreedById as jest.Mock).mockReturnValue(mockBreedInfo);
  expect(mock).toHaveBeenCalledWith('rag');
});
