import { useEffect, useState } from 'react';
import './App.css';

function App() {
  interface Breed{
    name: string
  }

  const [cats,setCats] = useState<Breed[]>([]);

useEffect(()=>{
  setCats([
    {name:'ragdol'},
    {name:'persa'},
    {name:'srd'}]
  )
},[])
  return (
    <div>

     Hello World
     <ul>
    {cats.map((item)=>(
     <li>{item.name}</li>
    ))}
    </ul>
    </div>
    
  );
}

export default App;
