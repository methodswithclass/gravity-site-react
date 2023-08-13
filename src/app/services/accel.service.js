import { useEffect, useState } from 'react';
import Accelerometer, { ValidStatus } from '@methodswithclass/accelerometer';
import { getCalibrate } from './calibrate.service';

const overrideValidate = false;

const init = (props) => {
  const calibrate = getCalibrate();

  console.log('debug calibrate', calibrate);

  const { id = 'global', gravity, object, arena } = props || {};
  const params = {
    gravity,
    ...calibrate,
  };

  const accel = Accelerometer({
    id,
    arena,
    object,
    params,
    overrideValidate,
  });

  return accel;
};

export const useValidate = (params) => {
  const [valid, setValid] = useState(ValidStatus.unchecked);
  const [accel, setAccel] = useState({});
  const { id } = params;
  useEffect(() => {
    const accel = init(params);
    accel.reset();
    accel.validate().then((valid) => {
      setValid(valid);
    });
    setAccel(accel);
    return () => {
      accel.stop();
    };
  }, [id]);

  return { valid, accel };
};
