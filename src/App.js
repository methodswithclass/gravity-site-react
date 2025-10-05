import { BrowserRouter } from "react-router";
import { ChakraProvider } from "@chakra-ui/react";
import Routes from "routes";
import Validate from "state/Validate";
import "./styles/index.scss";

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
