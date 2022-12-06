import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BreedDetailsPage from './breedDetailsPage';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>; // mock do axios
const mockBreedInfo = {
  name: 'ragdol',
  id: 'rag',
  origin: 'US',
  description: 'Ragdolls love their people, greeting them at the door',
};

beforeEach(() => {
  mockedAxios.get.mockResolvedValue(mockBreedInfo);
  render(
    //definindo a url que o MemoryRouter vai pegar inicialmente, se precisar pode definir + de um
    <MemoryRouter initialEntries={['/breed/rag']}>
      <Routes>
        <Route path="/breed/:id" element={<BreedDetailsPage />}></Route>
      </Routes>
    </MemoryRouter>
  );
});
it('Should render Detalhe da Raça', async () => {
  const linkElement = await screen.findByText(/detalhe da raça/i);
  expect(linkElement).toBeInTheDocument();
});

it('should renders a list of breed infos', async () => {
  const listElement = await screen.findAllByRole('listitem');
  expect(listElement).toHaveLength(4);
});

it('Should call API with correct parameters', async () => {
  //Teste integrado!
  expect(mockedAxios.get).toHaveBeenCalledWith(
    'https://api.thecatapi.com/v1/breeds/rag'
  );
});
