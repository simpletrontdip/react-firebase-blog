import Head from "next/head";
import { Flex, Input } from "@chakra-ui/react";
import DynamicText from "../components/DynamicText";
import { useRef } from "react";

const Home = () => {
  const textRef = useRef(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    textRef.current.changeValue(e.target.value);
  };

  return (
    <Flex minHeight="100vh" paddingY="0.5rem" flexDirection="column" justifyContent="center" alignItems="center">
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex paddingX="5rem" flexDirection="column" justifyContent="center" alignItems="center">
        <DynamicText ref={textRef} />
        <Input onChange={onChange} />
      </Flex>
    </Flex>
  );
};

export default Home;
