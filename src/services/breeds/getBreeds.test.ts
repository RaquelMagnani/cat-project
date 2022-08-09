import axios, { AxiosError } from 'axios';
import getBreeds from './getBreeds';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockBreeds = [
  {
    name: 'ragdol',
  },
  {
    name: 'persa',
  },
  {
    name: 'srd',
  },
];
beforeEach(() => {
  mockedAxios.get.mockResolvedValue({ data: mockBreeds });
});

describe('getBreeds', () => {
  it('Should return a list with 3 cat breeds when API/breeds call is successful', async () => {
    const result = await getBreeds();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.thecatapi.com/v1/breeds'
    );
    expect(result).toEqual(mockBreeds);
  });

  it('should return an error message when API fails ', async () => {
    const message = 'Aconteceu um erro inesperado';
    mockedAxios.get.mockRejectedValueOnce(new Error(message));
    await expect(getBreeds()).rejects.toThrow(message);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.thecatapi.com/v1/breeds'
    );
  });

  it('should return an AXIOS error message when API fails ', async () => {
    mockedAxios.get.mockRejectedValueOnce(new AxiosError());
    await expect(getBreeds()).rejects.toThrow();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.thecatapi.com/v1/breeds'
    );
  });
});
