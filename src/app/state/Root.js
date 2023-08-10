import React, { useEffect } from 'react';
import { useNavigate } from '../services/state.service';

const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('home');
  }, []);
  return <div></div>;
};

export default Root;
