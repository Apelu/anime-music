import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getFirestore } from "firebase/firestore";
import { app } from "./firebaseConfig";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);
export const myLiveWallpapersRef = collection(db, "MyLiveWallpapers");
export const linkedSeriesRef = doc(collection(db, "LinkedSeries"), "Main");

export function performEmailPasswordSignIn(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            // Signed in
            const user = userCredential.user;
            console.log({ user });
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log({ errorCode, errorMessage });
            alert(
                JSON.stringify({
                    subject: "Firestore Sign In",
                    errorCode,
                    errorMessage,
                })
            );
        });
}
