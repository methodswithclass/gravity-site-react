import { Accelerometer, Object } from 'accelerometer';
import { getCalibrate } from 'accelerometer/utils/calibrate';

const accelMap = {};

export const init = (props) => {
  const calibrate = getCalibrate();

  const { id, object: objectRef, arena: arenaRef } = props;
  const params = {
    interval: 2,
    filterSize: 3,
    mu: 0.1,
    damp: 0.4,
    gravity: true,
    bounce: true,
    ...calibrate,
  };

  const obj = new Object({
    id: 'object',
    arena: arenaRef,
    object: objectRef,
  });

  const accel = new Accelerometer({
    id: `accel-${id}`,
    object: obj,
    params: params,
  });

  accel.reset();

  accelMap[id] = accel;
};

export const get = (id) => {
  return accelMap[id];
};
