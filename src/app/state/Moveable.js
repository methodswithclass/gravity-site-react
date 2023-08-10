import React, { useState, useEffect, useRef } from 'react';
import { useOutlet } from 'react-router-dom';
import Button from 'app/components/Button';
import BackButton from 'app/components/BackButton';
import SettingsBtn from 'app/components/SettingsBtn';
import { init, get } from '../services/accel.service';
import { useGetItem } from '../services/state.service';
import Console from '../components/console/Console';

const Moveable = () => {
  const { REACT_APP_ENV: env } = process.env;
  const item = useGetItem();
  const id = item.name;
  const outlet = useOutlet();
  const { showObject } = item;
  const arena = useRef({});
  const object = useRef({});
  const [running, setRunning] = useState(false);

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
      <BackButton />
      <Button
        title="Start/Stop"
        onClick={handleToggle}
        classNames={`${running ? 'red-back' : 'green7-back'}`}
      />
      <SettingsBtn />

      {outlet}
      <Console visible={env !== 'prod'} />
    </div>
  );
};

export default Moveable;
