import axios, { AxiosError } from 'axios';
export type Breed = {
  name: string;
};
export type GetBreedsResponse = {
  data: Breed[];
};

const getBreeds = async (): Promise<Breed[]> => {
  try {
    const { data } = await axios.get('https://api.thecatapi.com/v1/breeds');
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error('Aconteceu um erro inesperado');
    }
  }
};

export default getBreeds;
