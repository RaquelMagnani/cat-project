import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import BreedsPage from './components/breedsPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BreedsPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
