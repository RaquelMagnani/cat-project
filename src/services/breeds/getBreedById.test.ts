import axios from 'axios';
import { getBreedById } from './getBreedById';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockBreedInfo = {
  name: 'ragdol',
  id: 'rag',
  origin: 'US',
  description: 'Ragdolls love their people, greeting them at the door',
};

describe('getBreedById', () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: mockBreedInfo });
  });
  it('Should return cat infos when API/breedsById call is successful', async () => {
    const result = await getBreedById('rgd');
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.thecatapi.com/v1/breeds/rgd'
    );
    expect(result).toEqual(mockBreedInfo);
  });

  it('should return an error message when API fails ', async () => {
    const message = 'Aconteceu um erro inesperado';
    mockedAxios.get.mockRejectedValueOnce(new Error(message));
    await expect(getBreedById('rgd')).rejects.toThrow(message);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.thecatapi.com/v1/breeds/rgd'
    );
  });

  it('Should call API with correct parameters', async () => {
    //Testando a função - mudar p getBreed! e testar se aparece a lista com os itens certos!
    getBreedById('rag');
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.thecatapi.com/v1/breeds/rag'
    );
  });
});
