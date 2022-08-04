import { useEffect, useState } from 'react';
import './App.css';
import BreedsList from './components/breedsList';
import getBreeds from './services/breeds/getBreeds';

export type Breed = {
  name: string;
};
export type GetBreedsResponse = {
  data: Breed[];
};

function App() {
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
  return (
    <div>
      <h1>Cats Breeds</h1>
      {isloading ? <p>loading...</p> : <BreedsList list={breeds} />}
    </div>
  );
}

export default App;
