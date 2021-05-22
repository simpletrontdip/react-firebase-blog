import { getAllBlogsCollection, subscribeCollectionChanges } from "api/blogs";
import { useEffect, useState } from "react";
import { BlogType } from "types/blog";

type BlogsStateType = {
  blogs: Array<BlogType | any> | null;
  loading: boolean;
  error: string | null;
};

const useFirebaseBlogs = ({ limit = 10, offset }) => {
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

    // unsubscriber will be returned
    return subscribeCollectionChanges(
      getAllBlogsCollection(limit, offset),
      (snapshot) => {
        setBlogsState({
          blogs: snapshot.docs.map((d) => d.data()),
          loading: false,
          error: null,
        });
      },
      (error) => {
        setBlogsState(({ blogs }) => ({
          blogs,
          loading: false,
          error: error.message,
        }));
      }
    );
  }, [limit, offset]);

  return blogsState;
};

export default useFirebaseBlogs;
