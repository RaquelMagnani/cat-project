import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

export interface Breed{
  name: string
}
export interface GetBreedsResponse {
  data: Breed[]
}

export const getBreeds = async (): Promise<Breed[]|any>  => {
  try{
    return await axios.get('https://api.thecatapi.com/v1/breeds');
  }catch(error){
    return error;
  }
}

function App() {
  

  
  const [cats,setCats] = useState<Breed[]>([]);

useEffect(()=>{ 
  // bora chamar a API
  getBreeds()
    .then(({data}) => {
      setCats(data)
  })

},[])
  return (
    <div>

     Hello World
     <ul>
    {cats.map((item)=>(
     <li key={`${item.name}`}>{item.name}</li>
    ))}
    </ul>
    </div>
    
  );
}

export default App;
