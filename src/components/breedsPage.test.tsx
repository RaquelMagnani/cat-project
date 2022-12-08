import { render, screen, within } from '@testing-library/react';
import axios from 'axios';
import { GetBreedInfoResponse } from '../services/breeds/getBreeds';
import BreedsPage from './breedsPage';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
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
  mockedAxios.get.mockResolvedValue(mockBreeds);
  // DUVIDA - pq o teste não falhou depois de colocar a origin tb?
  render(
    // coloca o MemoryRouter por causa do erro: "useHref() may be used only in the context of a Router componen"
    <MemoryRouter>
      <BreedsPage />
    </MemoryRouter>
  );
});

describe('breedsPage', () => {
  it('should renders Cats Breeds', async () => {
    const linkElement = await screen.findByText(/cats breeds/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('should renders a list of cat breeds', async () => {
    const listElement = await screen.findAllByRole('listitem');
    expect(listElement).toHaveLength(3);
  });

  it('should render a breed', async () => {
    const listElement = await screen.findAllByRole('listitem');
    expect(listElement[0]).toHaveTextContent('ragdol');
    expect(listElement[0]).toHaveTextContent('Origin : usa');
  });

  it('should appear a loaderComponent when the list is loading', () => {
    const element = screen.getByText(/loading.../i);
    expect(element).toBeInTheDocument();
  });

  it('should appear a `Saiba Mais` link on cat breeds card', async () => {
    const linkElement = await screen.findAllByRole('link', {
      name: /saiba mais/i,
    });
    expect(linkElement).toHaveLength(3);
  });
});
