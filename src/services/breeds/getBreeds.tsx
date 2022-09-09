import axios from 'axios';

export type Breed = {
  name: string;
  id: string;
};

export type BreedInfo = {
  name: string;
  id: string;
  origin: string;
  description: string;
};
export type GetBreedsResponse = {
  data: Breed[];
};

export type GetBreedInfoResponse = {
  data: BreedInfo;
};
//Separar em dois arquivos!
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
