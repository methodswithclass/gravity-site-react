import React, { useState, useEffect } from 'react';
import { useOutlet } from 'react-router-dom';
import Button from 'app/components/Button';
import BackButton from 'app/components/BackButton';
import SettingsBtn from 'app/components/SettingsBtn';
import { showConsole } from 'app/utils/utils';
import { useValidate } from '../services/accel.service';
import { useGetItem } from '../services/state.service';
import Console from '../components/console/Console';

const Moveable = (props) => {
  const { gravity } = props;
  const item = useGetItem();
  const id = item.name;
  const outlet = useOutlet();
  const { accel } = useValidate({
    id,
    gravity,
    arena: 'arena',
    object: 'object',
  });
  const [running, setRunning] = useState(false);

  const handleToggle = () => {
    if (accel?.isRunning()) {
      setRunning(false);
      accel.stop();
    } else if (accel) {
      setRunning(true);
      accel.start();
    }
  };

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        if (running && !accel.isRunning()) {
          setRunning(false);
        }
      }, 100);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
  }, [running, accel]);

  return (
    <div>
      <div className="arena" id="arena">
        <div className={`object`} id="object"></div>
      </div>
      <BackButton />
      <Button
        title="Start/Stop"
        onClick={handleToggle}
        classNames={`${running ? 'red-back' : 'green7-back'}`}
      />
      <SettingsBtn />
      {outlet}
      <Console visible={showConsole} />
    </div>
  );
};

export default Moveable;
