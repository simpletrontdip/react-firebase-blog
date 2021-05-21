import admin from "../firebase/clientApp";

const getBlogDetail = async (slug) => {
  const db = admin.firestore();
  const blogCollection = db.collection("blogs");

  return blogCollection.doc(slug).get();
};

const getAllBlogs = async (limit = 10, offset = null) => {
  const db = admin.firestore();
  const blogCollection = db.collection("blogs");

  return blogCollection.orderBy("lastModified", "desc").startAfter(offset).limit(limit).get();
};

const saveBlog = async ({ slug, title, content, image = null, brief = null }) => {
  const db = admin.firestore();
  const blogCollection = db.collection("blogs");
  return blogCollection.doc(slug).set({
    title,
    slug,
    content,
    image,
    brief,
    lastModified: new Date(),
  });
};

const deleteBlog = async (slug) => {
  const db = admin.firestore();
  const blogCollection = db.collection("blogs");

  return blogCollection.doc(slug).delete();
};

const subscribeBlogChanges = (callback, selector = null) => {
  const db = admin.firestore();
  const blogCollection = db.collection("blogs");

  // apply some selector to current collection
  const collection = selector ? selector(blogCollection) : blogCollection;

  // this will return a unsubscriber
  return collection.onSnapshot(callback);
};

export { getBlogDetail, getAllBlogs, saveBlog, deleteBlog, subscribeBlogChanges };
