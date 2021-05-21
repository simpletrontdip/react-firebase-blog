import { getBlogDetail, subscribeBlogChanges } from "api/blogs";
import { useEffect, useState } from "react";
import { BlogType } from "types/blog";

type BlogStateType = {
  blog: BlogType | any | null;
  loading: boolean;
  error: string | null;
};

const blogDetailSelector = (slug) => (collection) => collection && collection.doc(slug);

const useFirebaseBlog = ({ isSynced = true, slug }) => {
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

    // call the api
    getBlogDetail(slug)
      .then((doc) => {
        setBlogState({
          blog: doc.exists ? doc.data() : null,
          loading: false,
          error: doc.exists ? null : "This blog does not exist",
        });
      })
      .catch((error) => {
        setBlogState(({ blog }) => ({
          blog,
          loading: false,
          error: error.message,
        }));
      });

    return isSynced
      ? subscribeBlogChanges((doc) => {
          setBlogState({
            blog: doc.exists ? doc.data() : null,
            loading: false,
            error: doc.exists ? null : "This blog does not exist",
          });
        }, blogDetailSelector(slug))
      : null;
  }, [slug]);

  return blogState;
};

export default useFirebaseBlog;
