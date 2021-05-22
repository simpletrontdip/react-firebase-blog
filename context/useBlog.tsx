import { getBlogDetailCollection, subscribeCollectionChanges } from "api/blogs";
import { useEffect, useState } from "react";
import { BlogType } from "types/blog";

type BlogStateType = {
  blog: BlogType | any | null;
  loading: boolean;
  error: string | null;
};

const useFirebaseBlog = ({ slug }) => {
  const [blogState, setBlogState] = useState<BlogStateType>({
    blog: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!slug) {
      return;
    }

    setBlogState((state) => ({
      ...state,
      loading: true,
    }));

    return subscribeCollectionChanges(
      getBlogDetailCollection(slug),
      (doc) => {
        setBlogState({
          blog: doc.exists ? doc.data() : null,
          loading: false,
          error: doc.exists ? null : "This blog does not exist",
        });
      },
      (error) => {
        setBlogState(({ blog }) => ({
          blog,
          loading: false,
          error: error.message,
        }));
      }
    );
  }, [slug]);

  return blogState;
};

export default useFirebaseBlog;
