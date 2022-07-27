import { render, screen } from '@testing-library/react';
import axios from 'axios';
import App, { GetBreedsResponse } from './App';
import getBreeds from './services/breeds/getBreeds';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('app', () => {
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

describe('api', () => {
  it('Should return a list with 3 cat breeds when API/breeds call is successful', async () => {
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

    mockedAxios.get.mockResolvedValue(mockBreeds);

    const result = await getBreeds();

    expect(mockedAxios).toHaveBeenLastCalledWith(
      'https://api.thecatapi.com/v1/breeds'
    );
    expect(result).toEqual(mockBreeds);
  });
});
