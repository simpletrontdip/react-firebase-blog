import Head from "next/head";
import { Avatar, Button, Flex } from "@chakra-ui/react";

const Blog = ({ user, logout }) => {
  return (
    <Flex minHeight="100vh" paddingY="0.5rem" flexDirection="column" justifyContent="center" alignItems="center">
      <Head>
        <title>Coding Test: Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex paddingX="5rem" justifyContent="flex-end" alignItems="center" justifySelf="flex-start">
        <Avatar name={user.displayName} src={user.photoURL} />
        <Button onClick={logout}>Logout</Button>
      </Flex>
      <Flex paddingX="5rem" flexDirection="column" justifyContent="center" alignItems="center">
        Blogs
      </Flex>
    </Flex>
  );
};

export default Blog;
