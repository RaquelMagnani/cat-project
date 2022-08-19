import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getBreeds from '../services/breeds/getBreeds';

export type Props = {
  list: Breed[];
};
export type Breed = {
  name: string;
};

const BreedList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const BreedCard = styled.li`
  border: 1px solid #d9d0dd;
  border-left: 3px solid #d9d0dd;
  border-radius: 6px;
  max-width: 100px;
  margin: 10px;
  padding: 10px;
  list-style: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: #c39ae4;
  }
`;

const BreedsPage = (): JSX.Element => {
  const [breeds, setBreed] = useState<Breed[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isloading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadBreeds = async () => {
      try {
        setLoading(true);
        const response = await getBreeds();
        setLoading(false);
        setBreed(response);
      } catch (error) {
        setError(error as string);
      }
    };
    loadBreeds();
  }, [setBreed]);
  if (error) {
    return <div>{error}</div>;
  }
  if (isloading) return <p>loading...</p>;
  return (
    <>
      <h1>Cats Breeds</h1>
      <BreedList>
        {breeds.map((item) => (
          <BreedCard key={`${item.name}`}>
            {item.name}
            <Link to="#">Saiba Mais</Link>
          </BreedCard>
        ))}
      </BreedList>
    </>
  );
};

export default BreedsPage;
