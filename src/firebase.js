import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDLJc6N_Og_dvRVjigRWfVunaoHseJpBt0",
    authDomain: "oldschoolrunescape-e0e7d.firebaseapp.com",
    databaseURL: "https://oldschoolrunescape-e0e7d.firebaseio.com",
    projectId: "oldschoolrunescape-e0e7d",
    storageBucket: "oldschoolrunescape-e0e7d.appspot.com",
    messagingSenderId: "152332715579",
    appId: "1:152332715579:web:64e72ab98a4e1deb90be1e",
    measurementId: "G-R05XXGQESS"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email, displayName, photoURL } = user;
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid);
  };
  const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };