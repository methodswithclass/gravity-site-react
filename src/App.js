import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Routes from 'app/routes';
import { overrideConsole } from 'app/utils/utils';
import './styles/index.scss';
import { init } from 'accelerometer/utils/calibrate';

function App() {
  const { REACT_APP_ENV: env } = process.env;
  if (env === 'prod') {
    overrideConsole();
  }

  useEffect(() => {
    init();
  }, []);
  return (
    <div className="museo">
      <ChakraProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
