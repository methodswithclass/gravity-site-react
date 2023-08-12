import { useState, useEffect } from 'react';
import { showConsole, overrideConsole } from 'app/utils/utils';

overrideConsole(!showConsole);

const oldLog = console.log;

export const useConsole = () => {
  const [history, setHistory] = useState([]);

  const log = function (...args) {
    let message = '';

    Object.values(args).forEach((value) => {
      message += ` ${JSON.stringify(value)}`;
    });
    history.push(`${history.length}  ${message}`);
    setHistory([...history]);
  };

  const attach = () => {
    console.log = function (...args) {
      log.apply(log, args);
      oldLog.apply(oldLog, args);
    };

    window.onerror = (msg, url, linenumber) => {
      log('error', msg, url, linenumber);
    };
  };

  useEffect(() => {
    attach();
  }, []);

  return history;
};
