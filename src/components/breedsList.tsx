import { Breed } from '../App';

export type Props = {
  list: Breed[];
};
const BreedsList: React.FC<Props> = ({ list }) => {
  return (
    <ul>
      {list.map((item) => (
        <li key={`${item.name}`}>{item.name}</li>
      ))}
    </ul>
  );
};

export default BreedsList;
