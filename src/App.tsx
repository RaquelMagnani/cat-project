import { useEffect, useState } from 'react';
import './App.css';

import getBreeds from './services/breeds/getBreeds';

export type Breed = {
  name: string;
};
export type GetBreedsResponse = {
  data: Breed[];
};

function App() {
  const [cats, setCats] = useState<Breed[]>([]);

  useEffect(() => {
    getBreeds().then(({ data }) => {
      setCats(data);
    });
  }, []);
  return (
    <div>
      Hello World
      <ul>
        {cats.map((item) => (
          <li key={`${item.name}`}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
