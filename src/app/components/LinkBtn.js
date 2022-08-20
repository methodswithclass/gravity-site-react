import { useNavigation, getItem } from '../services/state.service';

const LinkBtn = (props) => {
  const { name, state } = props;

  const nav = useNavigation();

  const handleClick = () => {
    nav(state);
  };

  const getColor = () => {
    return getItem(state).color;
  };

  return (
    <div className="linkbtn" onClick={handleClick}>
      <div className={`container ${getColor()}`}>
        <div className="inner">{name}</div>
      </div>
    </div>
  );
};

export default LinkBtn;
