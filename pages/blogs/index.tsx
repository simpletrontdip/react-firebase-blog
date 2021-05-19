import Head from "next/head";
import { Flex } from "@chakra-ui/react";

const Blog = () => {
  return (
    <Flex minHeight="100vh" paddingY="0.5rem" flexDirection="column" justifyContent="center" alignItems="center">
      <Head>
        <title>Coding Test: Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex paddingX="5rem" flexDirection="column" justifyContent="center" alignItems="center">
        Blogs
      </Flex>
    </Flex>
  );
};

export default Blog;
