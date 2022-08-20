import { useNavigate } from 'react-router-dom';

let currentState = '';

const states = [
  {
    name: 'home',
    url: '/home',
    color: 'white',
    title: 'Home',
  },
  {
    name: 'calibrate',
    url: '/calibrate',
    color: 'green-back',
    title: 'Calibrate',
    page: true,
  },
  {
    name: 'demo',
    url: '/moveable/demo',
    color: 'blue-back',
    title: 'Demo',
    page: true,
  },
  {
    name: 'balance',
    url: '/moveable/game/balance',
    color: 'blue4-back',
    title: 'Balance',
    page: true,
  },
  {
    name: 'collide',
    url: '/moveable/game/collide',
    color: 'green7-back',
    title: 'Collide',
    page: true,
  },
  {
    name: 'settings',
    url: '/settings',
    color: 'green7-back',
    title: 'Settings',
  },
];

const stateMap = states.reduce((accum, item) => {
  return { ...accum, [item.name]: item };
}, {});

const urlMap = states.reduce((accum, item) => {
  return { ...accum, [item.url]: item };
});

const setState = (state) => {
  currentState = state;
};

setState(urlMap[window.location.pathname]?.name);

export const getState = () => {
  return currentState;
};

export const useNavigation = () => {
  const nav = useNavigate();

  const goto = (state) => {
    setState(state);
    nav(stateMap[state].url);
  };

  return goto;
};

export const getItem = (state) => {
  return stateMap[state];
};

export const getPages = () => {
  return states.filter((item) => item.page === true);
};

export default {
  useNavigation,
  getState,
  getItem,
  getPages,
};
