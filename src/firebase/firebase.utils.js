import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBRggqRJKX1-eqI1IqNt8YeI3lUW1LrPzs",
    authDomain: "e-commerce-a5a5f.firebaseapp.com",
    databaseURL: "https://e-commerce-a5a5f.firebaseio.com",
    projectId: "e-commerce-a5a5f",
    storageBucket: "e-commerce-a5a5f.appspot.com",
    messagingSenderId: "699282268826",
    appId: "1:699282268826:web:a49bf5b72b544978c6f523",
    measurementId: "G-R7WC6HHT6E"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    // console.log(userAuth);
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user', error.message);
        }
    }
    // console.log(snapShot);
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;