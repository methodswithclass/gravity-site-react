import { FaCog } from 'react-icons/fa';
import { useNavigation } from '../services/state.service';

const SettingsBtn = () => {
  const nav = useNavigation();

  const handleClick = () => {
    nav('settings');
  };

  return (
    <div className="settingsbtn" onClick={handleClick}>
      <FaCog />
    </div>
  );
};

export default SettingsBtn;
