import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Flex,
  Box,
  Button,
  Heading,
  Text,
  Spinner,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";

import { MdAddCircleOutline } from "react-icons/md";

import BlogCard from "components/BlogCard";
import BlogDetail from "components/BlogDetail";
import useFirebaseBlogs from "context/useBlogs";
import { useFirebaseUser } from "context/userContext";

const Blog = () => {
  const { user } = useFirebaseUser();
  const { blogs, loading, error } = useFirebaseBlogs({
    limit: 10,
    offset: null,
  });
  const [activeBlog, setActiveBlog] = useState(null);

  return (
    <>
      <Head>
        <title>Firebase blog: Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex w={["100%", "100%", 800]} margin="auto" px={[4, 4, 2]} py={2} alignItems="center">
        <Heading flex="1">Blogs</Heading>
        {user && user.isAdmin && (
          <Link href="/dashboard">
            <Button color="teal" variant="outline" fontSize="md">
              <Icon as={MdAddCircleOutline} mr={1} /> New
            </Button>
          </Link>
        )}
      </Flex>
      {error && (
        <Box w="100%" textAlign="center" mt={3}>
          <Text size="sm" color="red.500">
            {error}
          </Text>
        </Box>
      )}
      <Flex flex="1" w={["100%", "100%", 800]} margin="auto" flexFlow="row wrap" justifyContent="space-around">
        {loading && !blogs && (
          <Box width="100%" textAlign="center">
            <Spinner label="loading..." />
          </Box>
        )}
        {blogs &&
          blogs.map((blog) => (
            <BlogCard
              key={blog.slug}
              {...blog}
              onClick={() => {
                setActiveBlog(blog);
              }}
            />
          ))}
      </Flex>
      {activeBlog && (
        <Modal
          size="2xl"
          isOpen={!!activeBlog}
          onClose={() => {
            setActiveBlog(null);
          }}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <BlogDetail inModal {...activeBlog} />
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  setActiveBlog(null);
                }}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Blog;
