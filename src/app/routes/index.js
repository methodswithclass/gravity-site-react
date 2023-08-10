import { Routes, Route } from 'react-router-dom';
import Home from '../state/Home';
import Moveable from '../state/Moveable';
import Game from '../state/Game';
import Collide from '../state/Collide';
import Balance from '../state/Balance';
import Settings from '../state/Settings';
import Root from '../state/Root';

const routes = () => {
  return (
    <Routes>
      <Route path="moveable" element={<Moveable />}>
        {/* <Route path="game" element={<Game />}>
          <Route path="balance" element={<Balance />} />
          <Route path="collide" element={<Collide />} />
        </Route> */}
      </Route>
      <Route path="home" element={<Home />} />
      <Route path="settings" element={<Settings />} />
      <Route path="*" element={<Root />} />
    </Routes>
  );
};

export default routes;
