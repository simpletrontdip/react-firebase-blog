import Link from "next/link";
import { Box, Text, Button, Flex, Icon } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import RawHtmlContainer from "./RawHtmlContainer";
import { useFirebaseUser } from "context/userContext";
import {formatDate} from 'utils/date-format'

const BlogDetail = ({ inModal, slug, title, brief, lastModified, content }) => {
  const { user } = useFirebaseUser();
  return (
    <Box minHeight="320px">
      <Flex px={2} alignItems="center">
        <Text flex="1" mt={2} fontWeight="semibold" fontSize="2xl">
          {title}
        </Text>
        {!inModal && user && user.isAdmin && (
          <Link href={`/dashboard?slug=${slug}`}>
            <Button color="teal" variant="outline" fontSize="md">
              <Icon as={MdEdit} mr={1} /> Edit
            </Button>
          </Link>
        )}
      </Flex>
      {lastModified && (
        <Text px={2} isTruncated fontSize="xs" color="gray.400">
          {formatDate(lastModified)}
        </Text>
      )}
      <Text px={2} mt={1} fontSize="sm" color="gray.500" fontWeight="semibold">
        {brief}
      </Text>
      <Box mt={3} p={2} fontSize="sm">
        <RawHtmlContainer textAlign="justify" htmlContent={content} />
      </Box>
    </Box>
  );
};

export default BlogDetail;
