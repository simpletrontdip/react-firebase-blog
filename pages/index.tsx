import { useEffect, useRef } from "react";
import Head from "next/head";
import Router from "next/router";
import { Flex, Input, Spinner, Text } from "@chakra-ui/react";

import DynamicText from "components/DynamicText";
import { useFirebaseUser } from "context/userContext";

const Home = () => {
  const { user, loading } = useFirebaseUser();
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
        <>
          <DynamicText ref={textRef} />
          <Input w={["90%", "90%", 640]} mt={2} placeholder="Type something..." onChange={onChange} />
        </>
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
    <>
      <Head>
        <title>Firebase blog: Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex flex="1" px={2} flexDirection="column" justifyContent="center" alignItems="center">
        {renderContent()}
      </Flex>
    </>
  );
};

export default Home;
