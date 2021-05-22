import { useEffect } from "react";
import Head from "next/head";
import Router, { useRouter } from "next/router";

import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import useFirebaseBlog from "context/useBlog";
import BlogEditor from "components/BlogEditor";
import { useFirebaseUser } from "context/userContext";

const Dashboard = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { blog, loading, error } = useFirebaseBlog({ slug });
  const { user, loading: userLoading } = useFirebaseUser();

  useEffect(() => {
    let timeoutId = null;

    if ((!user || !user.isAdmin) && !loading) {
      timeoutId = setTimeout(() => {
        Router.push(user ? "/" : "/signin");
      }, 1500);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [user, userLoading]);

  return (
    <>
      <Head>
        <title>Coding Test: Blog Editor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction="column" w={["100%", "100%", 720]} p={2} mx="auto">
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
        {(!slug || blog) && <BlogEditor blog={blog} />}
      </Flex>
    </>
  );
};

export default Dashboard;
