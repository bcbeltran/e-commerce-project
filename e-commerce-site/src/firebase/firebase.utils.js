import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const config = {
	apiKey: "AIzaSyDUxub8j2-At8q6tfJls8ueByz0Qg1pN6w",
	authDomain: "e-commerce-site-20973.firebaseapp.com",
	projectId: "e-commerce-site-20973",
	storageBucket: "e-commerce-site-20973.appspot.com",
	messagingSenderId: "347437877489",
	appId: "1:347437877489:web:7b857b7f76136b36ef4150",
	measurementId: "G-XN749Z0YB9",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = db.doc(`users/${userAuth.uid}`);
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
            });
        } catch (error) {
            console.log('error creating user ', error.message);
        }
    }

    return userRef;
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(config);

// Use these for db & auth
const auth = firebase.auth();
const db = firebase.firestore(firebaseApp);


export const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export { firebase, auth, db };