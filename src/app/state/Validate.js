import React from 'react';
import { useValidate } from 'app/services/accel.service';

const Validate = (props) => {
  const { children } = props;
  const { valid } = useValidate({ id: 'validate' });
  return (
    <>
      {valid === 'invalid' ? (
        <div>This device is not supported. Use on a mobile device.</div>
      ) : (
        <>{valid === 'valid' ? children : <div>Validating device...</div>}</>
      )}
    </>
  );
};

export default Validate;
