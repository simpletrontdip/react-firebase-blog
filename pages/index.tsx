import firebase from "firebase/app";
import "firebase/auth";

import { FirebaseAuthProvider, FirebaseAuthConsumer } from "@react-firebase/auth";

import { config } from "../config";

import Home from "./home";
import Login from "./login";

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

const App = () => {
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) =>
          isSignedIn ? (
            <Home
              user={user}
              logout={() => {
                firebase.auth().signOut();
              }}
            />
          ) : (
            <Login
              login={() => {
                firebase.auth().signInWithPopup(googleAuthProvider);
              }}
            />
          )
        }
      </FirebaseAuthConsumer>
    </FirebaseAuthProvider>
  );
};

export default App;
