import { ChakraProvider } from "@chakra-ui/react";
import Content from "layout/Content";
import Header from "layout/Header";
import Layout from "layout/Layout";
import FirebaseUserProvider from "context/userContext";

import "styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <FirebaseUserProvider>
      <ChakraProvider>
        <Layout>
          <Header />
          <Content>
            <Component {...pageProps} />
          </Content>
        </Layout>
      </ChakraProvider>
    </FirebaseUserProvider>
  );
};

export default MyApp;
