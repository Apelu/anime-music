// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAVH5_0gE2WlqPj3wcx0llLgzSSgP1plO8",
    authDomain: "anime-3cc03.firebaseapp.com",
    projectId: "anime-3cc03",
    storageBucket: "anime-3cc03.appspot.com",
    messagingSenderId: "47520427373",
    appId: "1:47520427373:web:6fb202518d4e6b3a463e64",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);

export function handleSignIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            // Signed in
            const user = userCredential.user;
            console.log({ user });
            // ...
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log({ errorCode, errorMessage });
        });
}
