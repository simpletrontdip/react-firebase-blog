import { ChakraProvider } from "@chakra-ui/react";
import Content from "layout/Content";
import Header from "layout/Header";
import FirebaseUserProvider from "../context/userContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <FirebaseUserProvider>
      <ChakraProvider>
        <Header />
        <Content>
          <Component {...pageProps} />
        </Content>
      </ChakraProvider>
    </FirebaseUserProvider>
  );
};

export default MyApp;
