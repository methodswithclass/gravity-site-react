import { Vector, averageVector } from './utils/utils';
import { getCalibrate } from './utils/calibrate';

const Accelerometer = function (props) {
  const self = this;

  const id = props.id;
  const object = props.object;
  const params = props.params;

  const {
    mu,
    bounce: doesBounce,
    damp,
    filterSize,
    gravity,
    interval,
    factor: globalFactor,
    xDir: xAxis,
    yDir: yAxis,
  } = params;

  let timer;
  let filterBucket = [];
  let unfiltered = new Vector({ x: 0, y: 0 });
  let threshold = globalFactor * 0.5;
  let pos0 = new Vector({ x: 0, y: 0 });
  let vel0 = new Vector({ x: 0, y: 0 });
  let accel0 = new Vector({ x: 0, y: 0 });
  let pos1 = new Vector({ x: 0, y: 0 });
  let vel1 = new Vector({ x: 0, y: 0 });
  let accel1 = new Vector({ x: 0, y: 0 });
  let startTime = 0;
  let currentTime = 0;
  let running = false;
  let xDir = xAxis;
  let yDir = yAxis;
  let factor = globalFactor;

  const motion = (e) => {
    if (!running) {
      return;
    }

    const raw = {
      gravity: {
        x: e.accelerationIncludingGravity.x,
        y: e.accelerationIncludingGravity.y,
      },
      abs: {
        x: e.acceleration.x,
        y: e.acceleration.y,
      },
    };

    // console.log('debug motion', raw);

    if (gravity) {
      unfiltered.set({
        x: xDir * factor * raw.gravity.x,
        y: yDir * factor * raw.gravity.y,
        time: (e.timeStamp - startTime) / 1000,
      });
    } else {
      unfiltered.set({
        x: xDir * factor * raw.abs.x,
        y: yDir * factor * raw.abs.y,
        time: (e.timeStamp - startTime) / 1000,
      });
    }

    // console.log('debug raw', xDir, factor, unfiltered.x, unfiltered.y);
  };

  const handleEvent = (e) => {
    // func(id, e.pos, e.vel, e.acc);
    // console.log('debug event', e.detail.pos.x, e.detail.pos.y);
    object.setPosition(e.detail.pos);
    object.setVelocity(e.detail.vel);
    object.setAcceleration(e.detail.acc);
  };

  const attach = () => {
    window.ondevicemotion = motion;

    window.addEventListener(`accel${id}`, handleEvent);
  };

  const unattach = () => {
    window.ondevicemotion = null;
    window.removeEventListener(`accel${id}`, handleEvent);
  };

  const setCalibrate = () => {
    const calibrate = getCalibrate();
    xDir = calibrate?.xDir || xDir;
    yDir = calibrate?.yDir || yDir;
    factor = calibrate?.factor || factor;
    console.log('debug factor', factor);
    threshold = factor * 0.5;
  };

  const bounce = () => {
    const wallStatus = object.hasHitWall(pos1);

    const minVel = 12 * (Math.abs(accel1.y) + Math.abs(accel1.x));

    if (wallStatus.x) {
      pos1.x = wallStatus.xmax;
      vel1.x = -(1 - damp) * vel1.x;
      if ((Math.abs(vel1.x) < minVel && gravity) || !doesBounce) {
        vel1.x = 0;
      }
    }

    if (wallStatus.y) {
      pos1.y = wallStatus.ymax;
      vel1.y = -(1 - damp) * vel1.y;
      if ((Math.abs(vel1.y) < minVel && gravity) || !doesBounce) {
        vel1.y = 0;
      }
    }
  };

  const friction = () => {
    if (accel1.len() == 0) {
      vel1 = vel1.multiply(1 - mu);
    }
  };

  const updateMotion = (pos, vel, acc) => {
    window.dispatchEvent(
      new CustomEvent(`accel${id}`, {
        detail: { pos, vel, acc },
      })
    );
  };

  const integrate = (accelArray) => {
    if (!running) {
      return;
    }

    accel1.set(averageVector(accelArray));

    if (accel1.len() < threshold) {
      accel1.set(new Vector({ x: 0, y: 0, time: accel1.time }));
    }

    const timeInterval = interval * filterSize;

    vel1.set(
      vel0
        .add(accel0.multiply(timeInterval))
        .add(accel1.subtract(accel0).multiply(0.5 * timeInterval))
    );
    pos1.set(
      pos0
        .add(vel0.multiply(timeInterval))
        .add(vel1.subtract(vel0).multiply(0.5 * timeInterval))
    );

    bounce();
    friction();

    updateMotion(pos1, vel1, accel1);

    pos0.set(pos1);
    vel0.set(vel1);
    accel0.set(accel1);
  };

  self.getObject = () => {
    return object;
  };

  self.start = () => {
    setCalibrate();

    console.log('start accel', id);

    startTime = new Date().getTime();
    currentTime = startTime;

    attach();
    this.reset();

    running = true;

    timer = setInterval(() => {
      currentTime = currentTime + interval;
      filterBucket.push(unfiltered);

      if (filterBucket.length == filterSize) {
        integrate(filterBucket);

        filterBucket = [];
      }
    }, interval);
  };

  self.stop = () => {
    console.log('stop accel', id);

    running = false;

    unattach();

    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  self.reset = () => {
    console.log('reset accel', id);

    filterBucket = [];

    unfiltered = new Vector({ x: 0, y: 0, time: 0 });
    accel0 = new Vector({ x: 0, y: 0, time: 0 });
    vel0 = new Vector({ x: 0, y: 0, time: 0 });
    pos0 = new Vector({ x: 0, y: 0, time: 0 });
    startTime = 0;

    updateMotion(pos0, vel0, accel0);
  };

  self.unfiltered = () => {
    return unfiltered;
  };

  self.isRunning = () => {
    return running;
  };

  self.check = () => {
    return { accel: unfiltered, wall: object.hasHitWall(pos1) };
  };
};

export default Accelerometer;
