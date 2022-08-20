import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './app/state/Home';
import Moveable from './app/state/Moveable';
import Game from './app/state/Game';
import Calibrate from './app/state/Calibrate';
import Demo from './app/state/Demo';
import Collide from './app/state/Collide';
import Balance from './app/state/Balance';
import Settings from './app/state/Settings';
import { useNavigation } from './app/services/state.service';
import './styles/index.scss';

const Root = () => {
  const nav = useNavigation();

  useEffect(() => {
    nav('home');
  }, []);
  return null;
};

function App() {
  return (
    <div className="museo">
      <Router>
        <Routes>
          <Route path="moveable" element={<Moveable />}>
            <Route path="demo" element={<Demo />} />
            <Route path="game" element={<Game />}>
              <Route path="balance" element={<Balance />} />
              <Route path="collide" element={<Collide />} />
            </Route>
          </Route>
          <Route path="calibrate" element={<Calibrate />} />
          <Route path="home" element={<Home />} />
          <Route path="settings" element={<Settings />} />
          <Route path="/" element={<Root />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
