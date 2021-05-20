import admin from "../firebase/clientApp";

const getBlogDetail = async (slug) => {
  const db = admin.firestore();
  const blogCollection = db.collection("blogs");

  return blogCollection.where("slug", "==", slug).get();
};

const getAllBlogs = async (limit = 10, offset = null) => {
  const db = admin.firestore();
  const blogCollection = db.collection("blogs");

  return blogCollection.orderBy("slug").startAfter(offset).limit(limit).get();
};

const saveBlog = async ({ slug, title, content, image, brief }) => {
  const db = admin.firestore();
  const blogCollection = db.collection("blogs");
  return blogCollection.doc(slug).set({
    title,
    content,
    image,
    brief,
  });
};

const deleteBlog = async (slug) => {
  const db = admin.firestore();
  const blogCollection = db.collection("blogs");

  return blogCollection.doc(slug).delete();
};

const subscribeBlogChanges = (callback) => {
  const db = admin.firestore();
  const blogCollection = db.collection("blogs");

  // this will return a unsubscriber
  return blogCollection.onSnapshot(callback);
};

export { getBlogDetail, getAllBlogs, saveBlog, deleteBlog, subscribeBlogChanges };
