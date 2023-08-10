import { FaCog } from 'react-icons/fa';
import { useNavigate } from '../services/state.service';

const SettingsBtn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('settings');
  };

  return (
    <div className="settingsbtn" onClick={handleClick}>
      <FaCog />
    </div>
  );
};

export default SettingsBtn;
