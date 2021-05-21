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

const Blog = () => {
  const { blogs, loading, error } = useFirebaseBlogs({
    limit: 10,
    offset: null,
  });
  const [activeBlog, setActiveBlog] = useState(null);

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
        <Flex width="100%" p={2} alignItems="center">
          <Heading flex="1">Blogs</Heading>
          <Link href="/dashboard">
            <Button color="teal" variant="outline" fontSize="md">
              <Icon as={MdAddCircleOutline} mr={1} /> New (Admin)
            </Button>
          </Link>
        </Flex>
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
      </Flex>
      {activeBlog && (
        <Modal
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
