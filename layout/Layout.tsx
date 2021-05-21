import React from "react";
import { Flex } from "@chakra-ui/react";

const Layout = ({ children }) => (
  <Flex height="100vh" direction="column" color="gray.800">
    {children}
  </Flex>
);

export default Layout;
