import axios, { AxiosError } from 'axios';
export type Breed = {
  name: string;
};

const getBreeds = async (): Promise<Breed[]> => {
  try {
    const { data } = await axios.get('https://api.thecatapi.com/v1/breeds');
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.message;
    } else {
      throw 'Aconteceu um erro inesperado ';
    }
  }
};

export default getBreeds;
