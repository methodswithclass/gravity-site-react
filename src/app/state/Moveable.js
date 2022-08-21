import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { init, start } from '../services/accel.service';
import { getState, getItem } from '../services/state.service';
import Console from '../components/console/Console';

const Moveable = () => {
  const id = getState();
  const item = getItem(id);
  const { showObject } = item;

  useEffect(() => {
    console.log('debug id', id);
    init({ id, showObject });
    start(id);
  }, [id]);

  return (
    <div>
      <div className="arena" id="arena"></div>
      <Outlet />
      <Console visible={true} />
    </div>
  );
};

export default Moveable;
