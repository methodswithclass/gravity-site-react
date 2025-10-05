import { useNavigate, useGetItem } from "services/state-service";

const LinkBtn = (props) => {
  const { name, state } = props;

  const navigate = useNavigate();
  const item = useGetItem(state);

  const handleClick = () => {
    navigate(state);
  };

  return (
    <div className={`linkbtn`}>
      <div className={`container ${item.color}`} onClick={handleClick}>
        <div className="inner">{name}</div>
      </div>
    </div>
  );
};

export default LinkBtn;
