import Head from "next/head";

import { Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

const Login = ({ login }) => {
  return (
    <Flex minHeight="100vh" paddingY="0.5rem" flexDirection="column" justifyContent="center" alignItems="center">
      <Head>
        <title>Coding Test: Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button onClick={login}>Sign In with Google</Button>
    </Flex>
  );
};

export default Login;
