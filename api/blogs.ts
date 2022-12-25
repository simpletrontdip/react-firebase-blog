import admin from "../firebase/clientApp";

const getBlogDetailCollection = (slug) => {
  const db = admin.firestore();
  const blogCollection = db.collection("blogs");

  return blogCollection.doc(slug);
};

const getBlogDetail = (slug) => getBlogDetailCollection(slug).get();

const getAllBlogsCollection = (limit = 20, offset = null) => {
  const db = admin.firestore();
  const blogCollection = db.collection("blogs");

  const collection = blogCollection.orderBy("lastModified", "desc").limit(limit);
  if (offset) {
    return collection.startAfter(offset);
  }

  return collection;
};

const getAllBlogs = (limit, offset) =>
  getAllBlogsCollection(limit, offset)
    .get()

const saveBlog = ({ slug, title, content, image = null, brief = null }) => {
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

const deleteBlog = (slug) => {
  const db = admin.firestore();
  const blogCollection = db.collection("blogs");

  return blogCollection.doc(slug).delete();
};

const subscribeCollectionChanges = (collection, onCallback, onError) => {
  // this will return a unsubscriber
  return collection.onSnapshot(onCallback, onError);
};

export {
  getBlogDetail,
  getBlogDetailCollection,
  getAllBlogs,
  getAllBlogsCollection,
  saveBlog,
  deleteBlog,
  subscribeCollectionChanges,
};
