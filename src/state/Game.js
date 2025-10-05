import { useOutlet } from "react-router";

const Game = () => {
  const outlet = useOutlet();
  return (
    <div>
      Game
      {outlet}
    </div>
  );
};

export default Game;
