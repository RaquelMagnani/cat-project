import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BreedInfo, getBreedById } from '../services/breeds/getBreeds';

const BreedDetailsPage = (): JSX.Element => {
  const [breedInfo, setBreedInfo] = useState<BreedInfo>();
  const { id } = useParams();
  useEffect(() => {
    const loadBreed = async () => {
      const response = await getBreedById(id as string);
      setBreedInfo(response);
    };
    loadBreed();
  }, [setBreedInfo]);
  return (
    <>
      <h1>Detalhe da Raça</h1>

      <ul>
        <li key={breedInfo?.name}>Name: {breedInfo?.name}</li>
        <li key={breedInfo?.origin}>Origin: {breedInfo?.origin}</li>
        <li key={breedInfo?.description}>
          Decription: {breedInfo?.description}
        </li>
        <li key={breedInfo?.id}>ID: {breedInfo?.id}</li>
      </ul>
    </>
  );
};
export default BreedDetailsPage;
