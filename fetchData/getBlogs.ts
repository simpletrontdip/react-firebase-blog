import admin from "../firebase/nodeApp";

export const getProfileData = async (limit) => {
  const db = admin.firestore();
  const blogCollection = db.collection("blogs");

  return blogCollection.get();
};
