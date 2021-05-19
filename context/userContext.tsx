import memoizeOne from "memoize-one";
import { useState, useEffect, createContext, useContext } from "react";
import firebase from "../firebase/clientApp";

const FirebaseUserContext = createContext({});
const useFirebaseUser = () => useContext(FirebaseUserContext);

const signIn = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

const signOut = () => {
  return firebase.auth().signOut();
};

const signUp = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

const oAuthSignIn = (provider) => {
  return firebase.auth().signInWithPopup(provider);
};

const buildAuthState = memoizeOne((authState) => ({
  ...authState,
  oAuthSignIn,
  signIn,
  signOut,
  signUp,
}));

const FirebaseUserContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    loading: false,
  });

  useEffect(() => {
    const unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        const { uid, displayName, email, photoURL } = user;
        setAuthState({
          user: { uid, displayName, email, photoURL },
          loading: false,
        });
      } else {
        setAuthState({
          user: null,
          loading: false,
        });
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, []);

  return <FirebaseUserContext.Provider value={buildAuthState(authState)}>{children}</FirebaseUserContext.Provider>;
};

export default FirebaseUserContextProvider;
export { useFirebaseUser, FirebaseUserContext };
