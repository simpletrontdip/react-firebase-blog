import React from "react";

import { Box, Text, Heading, Flex, Image, AspectRatio } from "@chakra-ui/react";

function Card({ slug, title, image, content }) {
  return (
    <Box
      mx={2}
      my={5}
      flexBasis={["90%", "360px"]}
      boxSizing="border-box"
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden">
      <Flex as="a" href={`/blogs/${slug}`}>
        {image && (
          <AspectRatio w="160px" ratio={4 / 3}>
            <Image src={image} alt={slug} />
          </AspectRatio>
        )}
        <Box p={5}>
          <Heading as="h4" size="md">
            {title}
          </Heading>
          <Text mt={1} fontSize="sm" color="gray.300">
            2021-11-01 9:00AM
          </Text>
          <Text mt={2} fontSize="md">
            {content}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default Card;
