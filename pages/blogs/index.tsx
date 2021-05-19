import Head from "next/head";
import { Flex, Heading, Box, Image, Badge } from "@chakra-ui/react";
import Card from "components/Card";

const blogs = [
  {
    slug: "blog1",
    title: "Blog 1",
    image: "https://bit.ly/naruto-sage",
    content: "Ahahah",
  },
  {
    slug: "blog2",
    title: "Blog 2",
    image: null,
    content: "Ahahah",
  },
  {
    slug: "blog3",
    title: "Blog 3",
    image: null,
    content: "What is this?",
  },
];

const property = {
  imageUrl: "https://bit.ly/2Z4KKcF",
  imageAlt: "Rear view of modern home with pool",
  beds: 3,
  baths: 2,
  title: "Modern home in city center in the heart of historic Los Angeles",
  formattedPrice: "$1,900.00",
  reviewCount: 34,
  rating: 4,
};

const Blog = () => {
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
        <Flex w={["auto", "100%", 800]} flexFlow="row wrap" justifyContent="space-around">
          {blogs.map((blog) => (
            <Card {...blog} />
          ))}
        </Flex>
      </Flex>
    </>
  );
};

export default Blog;
