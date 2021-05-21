import React from "react";
import Head from "next/head";
import Link from "next/link";

import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import useFirebaseBlog from "context/useBlog";
import BlogDetail from "components/BlogDetail";
import { useRouter } from "next/router";

const BlogPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { blog, loading, error } = useFirebaseBlog({ slug });
  return (
    <>
      <Head>
        <title>Coding Test: Blog Detail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction="column" w={["auto", "100%", 720]} p={2} mx="auto">
        {error && (
          <Box w="100%" textAlign="center" mt={3}>
            <Text size="sm" color="red.500">
              {error}
            </Text>
          </Box>
        )}
        {loading && !blog && (
          <Box width="100%" textAlign="center">
            <Spinner label="loading..." />
          </Box>
        )}
        {blog && <BlogDetail {...blog} />}
        {!loading && (
          <Link href="/blogs">
            <Button w="100%" mx="auto" mt={5} mb={1} textAlign="center">
              Back
            </Button>
          </Link>
        )}
      </Flex>
    </>
  );
};

export default BlogPage;
