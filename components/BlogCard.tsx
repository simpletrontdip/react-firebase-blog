import React from "react";
import { FiExternalLink } from "react-icons/fi";

import { Box, Text, Heading, Flex, Image, AspectRatio, Icon } from "@chakra-ui/react";
import Link from "next/link";

const formatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
});

const BlockCard = ({ slug, title, image, brief, lastModified, onClick }) => {
  return (
    <Box
      mx={2}
      my={5}
      maxHeight="136px"
      flexBasis={["90%", "380px"]}
      boxSizing="border-box"
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      onClick={onClick}>
      <Flex>
        {image && (
          <AspectRatio flexBasis={["40%", "165px"]} flexShrink={0} ratio={4 / 3}>
            <Image src={image} alt={slug} objectFit="cover" />
          </AspectRatio>
        )}
        <Box p={4} flex="1" overflow="hidden">
          <Flex alignItems="center">
            <Heading isTruncated size="md" cursor="pointer">
              {title}
            </Heading>
            <Link href={`/blogs/${slug}`}>
              <Icon
                onClick={() => {
                  // ignore event buble up
                }}
                ml="auto"
                cursor="pointer"
                as={FiExternalLink}
              />
            </Link>
          </Flex>
          {lastModified && (
            <Text isTruncated mt={1} fontSize="sm" color="gray.400">
              {formatter.format(lastModified.toDate())}
            </Text>
          )}
          <Text isTruncated mt={2} fontSize="sm">
            {brief}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default BlockCard;
