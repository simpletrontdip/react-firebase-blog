import Head from "next/head";
import { useRef } from "react";
import { Avatar, Button, Flex, Input } from "@chakra-ui/react";

import DynamicText from "components/DynamicText";

const Home = ({ user, logout }) => {
  const textRef = useRef(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    textRef.current.changeValue(e.target.value);
  };

  return (
    <Flex minHeight="100vh" paddingY="0.5rem" flexDirection="column" justifyContent="center" alignItems="center">
      <Head>
        <title>Coding Test: Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex paddingX="5rem" justifyContent="flex-end" alignItems="center" justifySelf="flex-start">
        <Avatar name={user.displayName} src={user.photoURL} />
        <Button onClick={logout}>Logout</Button>
      </Flex>
      <Flex paddingX="5rem" flexDirection="column" justifyContent="center" alignItems="center">
        <DynamicText ref={textRef} />
        <Input onChange={onChange} />
      </Flex>
    </Flex>
  );
};

export default Home;
