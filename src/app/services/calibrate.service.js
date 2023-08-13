import { saveToLocal, getFromLocal, truncate } from 'app/utils/utils';

const initialCalibrate = {
  xDir: 1,
  yDir: 1,
  factorMin: Math.pow(10, -4),
  factor: Math.pow(10, -3) * 0.8,
  factorMax: Math.pow(10, -3) * 3,
};

let calibrate = {};

const init = () => {
  const fromLocal = getFromLocal('calibrate');
  calibrate = { ...initialCalibrate, ...fromLocal, ...calibrate };
};

export const getInitialCalibrate = () => {
  init();
  const { factorMin, factorMax, factor } = calibrate;
  const initialFactor = truncate(
    ((Math.log(factor) - Math.log(factorMin)) /
      (Math.log(factorMax) - Math.log(factorMin))) *
      100,
    0
  );
  return { ...calibrate, initialFactor };
};

export const getFactorFromPercent = (value) => {
  init();
  const { factorMin, factorMax } = calibrate;
  return Math.exp(
    ((Math.log(factorMax) - Math.log(factorMin)) * value) / 100 +
      Math.log(factorMin)
  );
};

export const setCalibrate = (params) => {
  calibrate = { ...calibrate, ...params };
  saveToLocal('calibrate', JSON.stringify(calibrate));
};

export const getCalibrate = () => {
  init();
  return calibrate;
};
