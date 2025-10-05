import LinkBtn from "components/LinkBtn";
import { getPages } from "services/state-service";

const Home = () => {
  return (
    <div>
      {getPages().map((item) => {
        return <LinkBtn key={item.name} name={item.title} state={item.name} />;
      })}
    </div>
  );
};

export default Home;
