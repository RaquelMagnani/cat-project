import axios from 'axios';
import { GetBreedsResponse } from '../../App';
import getBreeds from './getBreeds';

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

describe('api', () => {
  it.skip('Should return a list with 3 cat breeds when API/breeds call is successful', async () => {
    const result = await getBreeds();
    console.log('AQUIII', result);
    expect(mockedAxios).toHaveBeenCalledWith(
      'https://api.thecatapi.com/v1/breeds'
    );
    expect(result).toEqual(mockBreeds);
  });
});
