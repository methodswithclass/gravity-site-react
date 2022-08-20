import LinkBtn from '../components/LinkBtn';
import SettingsBtn from '../components/SettingsBtn';
import { getPages } from '../services/state.service';

const Home = () => {
  return (
    <div>
      <SettingsBtn />
      {getPages().map((item) => {
        return <LinkBtn key={item.name} name={item.title} state={item.name} />;
      })}
    </div>
  );
};

export default Home;
