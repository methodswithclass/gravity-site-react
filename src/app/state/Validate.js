import React, { useEffect, useState } from 'react';
import { ValidStatus } from '@methodswithclass/accelerometer';
import { useValidate } from 'app/services/accel.service';
import Button from 'app/components/Button';

const Validate = (props) => {
  const { children } = props;
  const [check, setCheck] = useState(false);
  const { valid, checking } = useValidate({ id: 'validate' }, check);

  const handleCheck = () => {
    setCheck(true);
  };

  const checkingKey = 'checking';
  const needToCheck = 'needToCheck';

  const status =
    valid === ValidStatus.unchecked && checking === 'auto-checking'
      ? valid
      : valid === ValidStatus.unchecked && checking === 'manual-checking'
      ? checkingKey
      : valid === ValidStatus.unchecked && checking === 'notchecking'
      ? needToCheck
      : valid;

  const resultMap = {
    [ValidStatus.valid]: children,
    [ValidStatus.invalid]:
      'This device is not supported. Use on a mobile device.',
    [ValidStatus.unchecked]: 'Validating device...',
    [ValidStatus.denied]:
      'Permission denied by user. Quit and restart to retry.',
    [checkingKey]: 'Requesting Permission...',
    [needToCheck]: (
      <Button
        title="Check Device"
        onClick={handleCheck}
        classNames={`green7-back`}
      />
    ),
  };

  const elements = resultMap[status] || 'Invalid Status';

  return <>{elements}</>;
};

export default Validate;
