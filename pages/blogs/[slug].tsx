import React from "react";

import { Box, Heading } from "@chakra-ui/react";

const escapeHtmlContent = (content) => content;

const BlogDetail = ({ blog: { title, content } }) => {
  return (
    <Box>
      <Heading as="h1" size="md">
        {title}
      </Heading>
      <Box dangerouslySetInnerHTML={{ __html: escapeHtmlContent(content) }}></Box>
    </Box>
  );
};

export default BlogDetail;
