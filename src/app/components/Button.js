const Button = (props) => {
  const { title, onClick, classNames, disabled } = props;
  return (
    <div
      className={`btn ${disabled ? 'hidden' : ''} ${classNames}`}
      onClick={onClick}
    >
      <span>{title}</span>
    </div>
  );
};

export default Button;
