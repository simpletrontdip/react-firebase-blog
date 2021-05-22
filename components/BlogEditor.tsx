import { useState } from "react";
import slugify from "slugify";
import Link from "next/link";
import dynamic from "next/dynamic";
import Router from "next/router";
import { Flex, Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { saveBlog } from "api/blogs";

const HtmlRte = dynamic(() => import("./HtmlRte"), {
  ssr: false,
});

const BlogEditor = (props) => {
  const blog = props.blog || {};
  const [title, setTitle] = useState(blog.title || "");
  const [brief, setBrief] = useState(blog.brief || "");
  const [content, setContent] = useState(blog.content || "");
  const [imageUrl, setImageUrl] = useState(blog.image || "");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const isNew = !blog.slug;

  const submitChange = () => {
    setSaving(true);
    saveBlog({
      slug: blog.slug || slugify(title.toLowerCase()),
      title,
      brief,
      content,
      image: imageUrl,
    })
      .then(() => {
        setSaving(false);
      })
      .then(() => {
        Router.push("/blogs");
      })
      .catch((error) => {
        setError(error.message);
        setSaving(false);
      });
  };

  return (
    <Box minHeight="320px">
      <Text mt={2} px={2} fontWeight="semibold" fontSize="2xl">
        {isNew ? "New blog" : "Edit blog"}
      </Text>
      <Stack mt={3} p={2} spacing={4} fontSize="sm">
        <Input
          fontSize="sm"
          value={title}
          placeholder="Title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <Input
          fontSize="sm"
          value={brief}
          placeholder="Brief"
          onChange={(event) => {
            setBrief(event.target.value);
          }}
        />
        <HtmlRte
          value={content}
          placeholder="Blog content, you can insert rich-text content here"
          onChange={setContent}
        />
        <Input
          fontSize="sm"
          value={imageUrl}
          placeholder="Image url"
          onChange={(event) => {
            setImageUrl(event.target.value);
          }}
        />
        <Flex justifyContent="flex-end">
          {error && (
            <Box w="100%" textAlign="center" mt={3}>
              <Text size="sm" color="red.500">
                {error}
              </Text>
            </Box>
          )}
          {!saving && (
            <Link href="/blogs">
              <Button textAlign="center">Back</Button>
            </Link>
          )}
          <Button
            ml={1}
            color="white"
            bgColor="blue.400"
            onClick={submitChange}
            disabled={!title || !content || !imageUrl}>
            Save
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default BlogEditor;
