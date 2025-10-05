import { useLocation, useNavigate as useNavigateDom } from "react-router";

const states = [
  {
    name: "home",
    url: "/home",
    color: "white",
    title: "Home",
  },
  {
    name: "settings",
    url: "/settings",
    color: "green-back",
    title: "Settings",
    page: true,
  },
  {
    name: "demo",
    url: "/moveable",
    color: "blue-back",
    title: "Demo",
    page: true,
    showObject: true,
  },
  {
    name: "slide",
    url: "/slide",
    color: "blue4-back",
    title: "Slide",
    page: true,
    showObject: true,
  },
  // {
  //   name: 'balance',
  //   url: '/moveable/game/balance',
  //   color: 'blue4-back',
  //   title: 'Balance',
  //   page: true,
  //   showObject: true,
  // },
  // {
  //   name: 'collide',
  //   url: '/moveable/game/collide',
  //   color: 'green7-back',
  //   title: 'Collide',
  //   page: true,
  //   showObject: true,
  // },
];

const stateMap = states.reduce((accum, item) => {
  return { ...accum, [item.name]: item };
}, {});

const urlMap = states.reduce((accum, item) => {
  return { ...accum, [item.url]: item };
}, {});

export const useNavigate = () => {
  const nav = useNavigateDom();

  const goto = (state) => {
    if (state === -1) {
      nav(-1);
      return;
    }
    nav(stateMap[state].url);
  };

  return goto;
};

export const usePage = () => {
  const location = useLocation();
  const item = urlMap[location.pathname];
  const state = item.name;
  return state;
};

export const useGetItem = (page) => {
  const state = usePage();
  if (page) {
    return stateMap[page];
  }
  return stateMap[state];
};

export const getPages = () => {
  return states.filter((item) => item.page === true);
};
