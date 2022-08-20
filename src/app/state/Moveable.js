import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { init, start } from '../services/accel.service';
import { getState } from '../services/state.service';
import Console from '../components/console/Console';

const Moveable = () => {
  const id = getState();

  useEffect(() => {
    console.log('debug id', id);
    init({ id });
    start(id);
  }, [id]);

  return (
    <div>
      <div className="arena" id="arena">
        <Outlet />
      </div>
      <Console visible={true} />
    </div>
  );
};

export default Moveable;
