import { render, screen } from '@testing-library/react';
import axios from 'axios';
import App,{Breed, getBreeds, GetBreedsResponse} from './App';

describe("app",()=>{

it('should renders hello world', () => {
  render(<App />);
  const linkElement = screen.getByText(/hello world/i);
  expect(linkElement).toBeInTheDocument();
});
it('should renders a list of cat breeds', () => {
  render(<App />);
  const listElement = screen.getAllByRole('listitem');
  expect(listElement).toHaveLength(3);
});

});

describe("api",()=>{
jest.mock("axios");
it('Should return a list with 3 cat breeds when API/breeds call is successful', async ()=> {
const mockBreeds: GetBreedsResponse = {
  data: [
    {
      name: 'ragdol'
    },
    {
      name: 'persa'
    },
    {
      name: 'srd'
    }] 
  };
  
  (axios.get as jest.Mock).mockResolvedValueOnce(mockBreeds);

  const result =  await getBreeds();

  expect(axios.get).toHaveBeenLastCalledWith('https://api.thecatapi.com/v1/breeds');
  expect(result).toEqual(mockBreeds);
})
});
