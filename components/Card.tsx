import React from "react";

import { Box, Text, Heading, Flex, Image, AspectRatio } from "@chakra-ui/react";

const Card = ({ slug, title, image, brief }) => {
  return (
    <Box
      mx={2}
      my={5}
      maxHeight="136px"
      flexBasis={["90%", "380px"]}
      boxSizing="border-box"
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden">
      <Flex as="a" href={`/blogs/${slug}`}>
        {image && (
          <AspectRatio flexBasis={["40%", "165px"]} flexShrink={0} ratio={4 / 3}>
            <Image src={image} alt={slug} objectFit="cover" />
          </AspectRatio>
        )}
        <Box p={4}>
          <Heading isTruncated as="h4" size="md">
            {title}
          </Heading>
          <Text isTruncated mt={1} fontSize="sm" color="gray.300">
            2021-11-01 9:00AM
          </Text>
          <Text isTruncated mt={2} fontSize="md">
            {brief}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Card;
