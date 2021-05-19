import Head from "next/head";
import Router from "next/router";

import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import { Input, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { useFirebaseUser } from "context/userContext";

import { useState } from "react";

const SignUp = () => {
  const { user, loading, signUp } = useFirebaseUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
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
          Sign Up
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
        <Input
          value={passwordConfirm}
          isInvalid={passwordConfirm && password !== passwordConfirm}
          type="password"
          placeholder="Confirm Password"
          onChange={(event) => {
            setPasswordConfirm(event.target.value);
          }}
        />
        <Button
          color="white"
          bgColor="blue.300"
          disabled={!email || !password || passwordConfirm !== password}
          onClick={() => {
            signUp(email, password).catch((error) => setError(error.message));
          }}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
        <Text size="sm" textAlign="center">
          Already have account?
        </Text>
        <Button
          color="blue.200"
          onClick={() => {
            Router.push("/signin");
          }}>
          Sign In
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
      w={[400, 600, 800]}
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

export default SignUp;