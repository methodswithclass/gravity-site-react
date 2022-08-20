import mcaccel from '@methodswithclass/accelerometer';

const g = mcaccel.utility;

const accelMap = {};

export const init = (props) => {
  const { id } = props;
  const params = {
    interval: 2,
    filterSize: 3,
    factor: 0.8,
    mu: 0.1,
    damp: 0.4,
    gravity: true,
    bounce: true,
  };

  const objParams = {
    shape: 'circle',
    size: 200,
    color: 'black',
  };

  /*
        these are global values above and beyond other set values
        they must be set per session on different devices through some calibration means 
        defaults are all positive one which may not give desired motion results
        */
  g.setFactor(g.const.factorG, 0.01);
  g.setAxis(g.const.x, 1);
  g.setAxis(g.const.y, 1);

  const arena = document.getElementById('arena');

  const obj = new mcaccel.object({
    id: 'object',
    arena: arena,
    params: objParams,
  });

  const accel = new mcaccel.accelerometer({
    id: `accel-${id}`,
    object: obj,
    params: params,
  });

  accel.getMotion(`accel-${id}`, (id, pos, vel, acc) => {
    obj.setPosition(pos);
    obj.setVelocity(vel);
    obj.setAcceleration(acc);
  });

  window.ondevicemotion = accel.motion;

  accel.reset();

  accelMap[id] = accel;
};

export const reset = (id) => {
  accelMap[id].reset();
};

export const start = (id) => {
  accelMap[id].start();
};
