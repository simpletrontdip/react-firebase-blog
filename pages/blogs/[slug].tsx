import React from "react";
import Head from "next/head";
import Link from "next/link";

import { Button, Flex } from "@chakra-ui/react";
import BlogDetail from "components/BlogDetail";
import { getBlogDetail } from "api/blogs";

const BlogPage = ({ blog }) => {
  return (
    <>
      <Head>
        <title>{blog.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction="column" w={["100%", "100%", 720]} p={3} mx="auto">
        {blog && <BlogDetail {...blog} />}
        <Link href="/blogs">
          <Button w="100%" mx="auto" mt={5} mb={1} textAlign="center">
            Back
          </Button>
        </Link>
      </Flex>
    </>
  );
};

const getServerSideProps = async ({ params }) => {
  try {
    const doc = await getBlogDetail(params.slug);

    if (!doc.exists) {
      return {
        notFound: true,
      };
    }

    const blog = doc.data();
    const lastModified = blog.lastModified.toDate().toISOString();

    return {
      props: {
        blog: {
          ...blog,
          lastModified,
        },
      },
    };
  } catch (error) {
    return {
      error,
    };
  }
};

export default BlogPage;
export { getServerSideProps };
