import React from "react";
import { Flex } from "@chakra-ui/react";

const Content = ({ children }) => (
  <Flex flex="1" direction="column" color="gray.800">
    {children}
  </Flex>
);

export default Content;
