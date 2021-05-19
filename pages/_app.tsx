import { ChakraProvider } from "@chakra-ui/react";
import FirebaseUserProvider from "../context/userContext";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <FirebaseUserProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </FirebaseUserProvider>
  );
};

export default MyApp;
