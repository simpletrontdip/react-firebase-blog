import { getAllBlogs, subscribeBlogChanges } from "api/blogs";
import { useEffect, useState } from "react";
import { BlogType } from "types/blog";

type BlogsStateType = {
  blogs: Array<BlogType | any> | null;
  loading: boolean;
  error: string | null;
};

const useFirebaseBlogs = ({ isSynced = true, limit = 10, offset }) => {
  const [blogsState, setBlogsState] = useState<BlogsStateType>({
    blogs: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    setBlogsState((state) => ({
      ...state,
      loading: true,
    }));

    // call the api
    getAllBlogs(limit, offset)
      .then((snapshot) => {
        setBlogsState({
          blogs: snapshot.docs.map((d) => d.data()),
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        setBlogsState(({ blogs }) => ({
          blogs,
          loading: false,
          error: error.message,
        }));
      });

    // unsubscriber will be returned
    return isSynced
      ? subscribeBlogChanges((snapshot) => {
          setBlogsState({
            blogs: snapshot.docs.map((d) => d.data()),
            loading: false,
            error: null,
          });
        })
      : null;
  }, [limit, offset]);

  return blogsState;
};

export default useFirebaseBlogs;
