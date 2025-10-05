import { useEffect, useState } from "react";
import Accelerometer, { ValidStatus } from "@methodswithclass/accelerometer";
import { getCalibrate } from "./calibrate-service";

const overrideValidate = false;

const init = (props) => {
  const calibrate = getCalibrate();

  console.log("debug calibrate", calibrate);

  const { id = "global", gravity, object, arena } = props || {};
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

export const useValidate = (params, check) => {
  const [valid, setValid] = useState(ValidStatus.unchecked);
  const [accelState, setAccel] = useState(null);
  const [checking, setChecking] = useState("notchecking");
  const { id } = params;

  const handleCheck = (accelParam, checkingStatus) => {
    if (accelParam) {
      setChecking(checkingStatus);
      accelParam.validate().then((valid) => {
        setValid(valid);
        setChecking("notchecking");
      });
    }
  };

  useEffect(() => {
    const accel = init(params);
    setAccel(accel);
    accel.reset();
    handleCheck(accel, "auto-checking");
    return () => {
      accel.stop();
    };
  }, [id]);

  useEffect(() => {
    if (check) {
      handleCheck(accelState, "manual-checking");
    }
  }, [check, accelState]);

  return { valid, accel: accelState, checking };
};
