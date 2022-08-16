import { useEffect, useState } from 'react';
import './App.css';
import BreedsPage from './components/breedsPage';
import getBreeds from './services/breeds/getBreeds';

function App() {
  return (
    <div>
      <BreedsPage />
    </div>
  );
}

export default App;
