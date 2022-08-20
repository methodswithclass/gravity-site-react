import LinkBtn from '../components/LinkBtn';
import { getItems } from '../services/state.service';

const Home = () => {
  return (
    <div>
      {getItems().map((item) => {
        return <LinkBtn key={item.name} name={item.title} state={item.name} />;
      })}
    </div>
  );
};

export default Home;
