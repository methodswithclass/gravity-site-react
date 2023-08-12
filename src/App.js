import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Routes from 'app/routes';
import './styles/index.scss';
import Validate from 'app/state/Validate';

function App() {
  return (
    <div className="museo">
      <ChakraProvider>
        <BrowserRouter>
          <Validate>
            <Routes />
          </Validate>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
