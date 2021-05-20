import Head from "next/head";
import { Flex, Box, Heading, Text, Spinner } from "@chakra-ui/react";

import Card from "components/Card";
import useFirebaseBlogs from "context/useBlogs";

const Blog = () => {
  const { blogs, loading, error } = useFirebaseBlogs({ limit: 10, offset: null });

  return (
    <>
      <Head>
        <title>Coding Test: Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        mx="auto"
        padding={2}
        boxSizing="border-box"
        flexDirection="column"
        justifyContent="center"
        alignItems="center">
        <Heading m={2}>Blogs</Heading>
        {error && (
          <Box w="100%" textAlign="center" mt={3}>
            <Text size="sm" color="red.500">
              {error}
            </Text>
          </Box>
        )}
        <Flex w={["auto", "100%", 800]} flexFlow="row wrap" justifyContent="space-around">
          {loading && !blogs && (
            <Box width="100%" textAlign="center">
              <Spinner label="loading..." />
            </Box>
          )}
          {blogs && blogs.map((blog) => <Card key={blog.slug} {...blog} />)}
        </Flex>
      </Flex>
    </>
  );
};

export default Blog;
