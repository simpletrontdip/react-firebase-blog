import Head from "next/head";
import Router from "next/router";
import firebase from "firebase/app";

import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import { Input, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { useFirebaseUser } from "context/userContext";

import { useState } from "react";

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

const SignIn = () => {
  const { user, loading, oAuthSignIn, signIn } = useFirebaseUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const renderContent = () => {
    if (user) {
      setTimeout(() => {
        Router.push("/");
      }, 2000);

      return <Text>You are logged in.</Text>;
    }

    return (
      <Stack spacing={4} w="240px">
        <Heading as="h1" size="lg">
          Sign In
        </Heading>
        <Input
          value={email}
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <Input
          value={password}
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Button
          color="white"
          bgColor="blue.300"
          disabled={!email || !password}
          onClick={() => {
            signIn(email, password).catch((error) => setError(error.message));
          }}>
          Sign In
        </Button>
        <Button
          color="red.500"
          variant="outline"
          onClick={() => {
            oAuthSignIn(googleAuthProvider)
              .then(() => Router.push("/"))
              .catch((error) => setError(error.message));
          }}>
          {loading ? "Signing In" : "Sign In with Google"}
        </Button>
        <Text size="sm" textAlign="center">
          Don't have account?
        </Text>
        <Button
          color="blue.200"
          onClick={() => {
            Router.push("/signup");
          }}>
          Sign Up
        </Button>
      </Stack>
    );
  };

  return (
    <Flex
      minHeight="100vh"
      paddingY="0.5rem"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      w={["100%", 400, 560]}
      mx="auto">
      <Head>
        <title>Coding Test: Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {renderContent()}
      {error && (
        <Box w="100%" textAlign="center" mt={3}>
          <Text size="sm" color="red.500">
            {error}
          </Text>
        </Box>
      )}
    </Flex>
  );
};

export default SignIn;
