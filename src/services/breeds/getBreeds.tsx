import axios from 'axios';
import { useParams } from 'react-router-dom';
export type Breed = {
  name: string;
  id: string;
  origin: string;
  description: string;
};
export type GetBreedsResponse = {
  data: Breed[];
};

export const getBreeds = async (): Promise<Breed[]> => {
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

export const getBreedById = async (id: string): Promise<Breed> => {
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
