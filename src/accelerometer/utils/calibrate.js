import { saveToLocal, getFromLocal } from 'app/utils/utils';
import { truncate } from './utils';

const initialCalibrate = {
  xDir: 1,
  yDir: 1,
  factor: 0.008,
  factorMax: 0.01,
  factorMin: Math.pow(10, -4),
};

let calibrate = {};

export const init = () => {
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
  return calibrate;
};
