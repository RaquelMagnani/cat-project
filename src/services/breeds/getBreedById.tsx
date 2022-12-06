import axios from 'axios';

export type BreedInfo = {
  name: string;
  id: string;
  origin: string;
  description: string;
};

export const getBreedById = async (id: string): Promise<BreedInfo> => {
  try {
    const { data } = await axios.get(
      `https://api.thecatapi.com/v1/breeds/${id}`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error('Aconteceu um erro inesperado');
    }
  }
};
