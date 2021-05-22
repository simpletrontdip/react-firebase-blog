import React from "react";
import Link from "next/link";
import Router from "next/router";
import { Avatar, Button, Flex, Heading, Text } from "@chakra-ui/react";

import { useFirebaseUser } from "context/userContext";

const Header = () => {
  const { user, signOut } = useFirebaseUser();
  return (
    <Flex justify="space-between" alignItems="center" borderBottom="1px" borderColor="gray.200" p={3}>
      <Heading as="h3" size="lg" m={1}>
        UI Coding test
      </Heading>
      <Flex alignSelf="flex-end" alignItems="center">
        <Heading as="h3" size="md" m={1}>
          {user ? (
            <>
              <Button variant="link" m={1} color="teal.500">
                <Link href="/">Home</Link>
              </Button>
              <Button variant="link" m={1} color="teal.500">
                <Link href="/blogs">Blogs</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="link" m={1} color="teal.500">
                <Link href="/signup">Sign Up</Link>
              </Button>
              <Button variant="link" m={1} color="teal.500">
                <Link href="/signin">Sign In</Link>
              </Button>
            </>
          )}
        </Heading>
        {user && (
          <>
            <Avatar size="sm" name={user.displayName} src={user.photoURL} />
            {user.isAdmin && <Text fontWeight="semibold">(Admin)</Text>}
            <Button
              ml={1}
              variant="outline"
              color="red.500"
              onClick={() =>
                signOut().then(() => {
                  Router.push("/signin");
                })
              }>
              Logout
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
