import { Box, Text } from "@chakra-ui/react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
});

const escapeHtmlContent = (content) => content;

const BlogDetail = ({ title, lastModified, content }) => (
  <Box minHeight="320px">
    <Text mt={2} px={2} fontWeight="semibold" fontSize="2xl">
      {title}
    </Text>
    {lastModified && (
      <Text px={2} isTruncated fontSize="xs" color="gray.400">
        {formatter.format(lastModified.toDate())}
      </Text>
    )}
    <Box mt={3} p={2} fontSize="sm">
      <Box textAlign="justify" dangerouslySetInnerHTML={{ __html: escapeHtmlContent(content) }} />
    </Box>
  </Box>
);

export default BlogDetail;
