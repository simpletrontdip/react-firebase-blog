import { useEffect, useRef } from "react";
import Head from "next/head";
import Router from "next/router";
import { Flex, Input, Spinner, Text } from "@chakra-ui/react";

import DynamicText from "components/DynamicText";
import { useFirebaseUser } from "context/userContext";

const Home = () => {
  const { user, loading, signOut } = useFirebaseUser();
  const textRef = useRef(null);

  useEffect(() => {
    let timeoutId = null;
    if (!user && !loading) {
      timeoutId = setTimeout(() => {
        Router.push("/signin");
      }, 500);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [user, loading]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    textRef.current.changeValue(e.target.value);
  };

  const renderContent = () => {
    if (loading) {
      return <Spinner label="Loading..." />;
    }

    if (user) {
      return (
        <Flex paddingX="5rem" flexDirection="column" justifyContent="center" alignItems="center">
          <DynamicText ref={textRef} />
          <Input onChange={onChange} />
        </Flex>
      );
    }

    return (
      <>
        <Text>You need to sign-in first</Text>
        <Spinner label="Redirecting..." />
      </>
    );
  };

  return (
    <Flex height="100%" paddingY="0.5rem" flexDirection="column" justifyContent="center" alignItems="center">
      <Head>
        <title>Coding Test: Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {renderContent()}
    </Flex>
  );
};

export default Home;
