import api from '../api';
export type Breed = {
  name: string;
};

export const getBreeds = async (): Promise<Breed[] | any> => {
  return await api.get('breeds');
};

export default getBreeds;
