import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import BreedsPage from './components/breedsPage';
import BreedDetailsPage from './components/breedDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BreedsPage />}></Route>
        <Route path="/breed/:id" element={<BreedDetailsPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
