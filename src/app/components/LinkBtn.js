import { useNavigate, getItem } from '../services/state.service';
import { checkMobile } from 'app/utils/utils';

const LinkBtn = (props) => {
  const { name, state } = props;

  const navigate = useNavigate();

  const isMobile = checkMobile();

  const handleClick = () => {
    navigate(state);
  };

  const getColor = () => {
    return getItem(state).color;
  };

  return (
    <div
      className={`${isMobile ? 'linkbtn-mobile' : 'linkbtn'}`}
      onClick={handleClick}
    >
      <div className={`container ${getColor()}`}>
        <div className="inner">{name}</div>
      </div>
    </div>
  );
};

export default LinkBtn;
