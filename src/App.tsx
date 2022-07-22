import { useEffect, useState } from "react";
import "./App.css";
import api from "./services/api";

export type Breed = {
  name: string;
};
export type GetBreedsResponse = {
  data: Breed[];
};

export const getBreeds = async (): Promise<Breed[] | any> => {
  try {
    console.log("AQUI", api.get("breeds"));
    return await api.get("breeds");
  } catch (error) {
    return error;
  }
};

function App() {
  const [cats, setCats] = useState<Breed[]>([]);

  useEffect(() => {
    // bora chamar a API
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
