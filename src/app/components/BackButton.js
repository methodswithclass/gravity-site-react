import { useNavigate } from 'app/services/state.service';
import Button from './Button';

const BackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return <Button title="Back" onClick={handleBack} classNames={`blue-back`} />;
};

export default BackButton;
