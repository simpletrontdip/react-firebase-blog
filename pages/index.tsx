import { useRef } from "react";
import Head from "next/head";
import Router from "next/router";
import { Avatar, Button, Flex, Input, Spinner, Text } from "@chakra-ui/react";

import DynamicText from "components/DynamicText";
import { useFirebaseUser } from "context/userContext";

const Home = () => {
  const { user, loading, signOut } = useFirebaseUser();
  const textRef = useRef(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    textRef.current.changeValue(e.target.value);
  };

  const renderContent = () => {
    if (loading) {
      return <Spinner label="Loading..." />;
    }

    if (user) {
      return (
        <>
          <Flex paddingX="5rem" justifyContent="flex-end" alignItems="center" justifySelf="flex-start">
            <Avatar name={user.displayName} src={user.photoURL} />
            <Button onClick={signOut}>Logout</Button>
          </Flex>
          <Flex paddingX="5rem" flexDirection="column" justifyContent="center" alignItems="center">
            <DynamicText ref={textRef} />
            <Input onChange={onChange} />
          </Flex>
        </>
      );
    }
    setTimeout(() => {
      Router.push("/signin");
    }, 1500);
    return (
      <>
        <Text>You need to sign-in first</Text>
        <Spinner label="Redirecting..." />
      </>
    );
  };

  return (
    <Flex minHeight="100vh" paddingY="0.5rem" flexDirection="column" justifyContent="center" alignItems="center">
      <Head>
        <title>Coding Test: Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {renderContent()}
    </Flex>
  );
};

export default Home;
