import React, { useState, useEffect, useRef } from 'react';
import { useOutlet } from 'react-router-dom';
import Button from 'app/components/Button';
import { init, get } from '../services/accel.service';
import { getState, getItem, useNavigate } from '../services/state.service';
import Console from '../components/console/Console';

const Moveable = () => {
  const { REACT_APP_ENV: env } = process.env;
  const navigate = useNavigate();
  const id = getState();
  const item = getItem(id);
  const outlet = useOutlet();
  const { showObject } = item;
  const arena = useRef({});
  const object = useRef({});
  const [running, setRunning] = useState(false);

  const handleHome = () => {
    navigate('home');
  };

  const handleToggle = () => {
    const accel = get('global');
    if (accel.isRunning()) {
      setRunning(false);
      accel.stop();
    } else {
      setRunning(true);
      accel.start();
    }
  };

  useEffect(() => {
    console.log('debug id', id);
    init({ id: 'global', showObject, arena, object });
    const accel = get('global');
    return () => {
      setRunning(false);
      accel.stop();
    };
  }, [id]);

  return (
    <div>
      <div ref={arena} className="arena" id="arena">
        <div ref={object} className="object" id="object"></div>
      </div>
      <Button title="Home" onClick={handleHome} classNames={`blue-back`} />
      <Button
        title="Start/Stop"
        onClick={handleToggle}
        classNames={`${running ? 'red-back' : 'green7-back'}`}
      />

      {outlet}
      <Console visible={env !== 'prod'} />
    </div>
  );
};

export default Moveable;
