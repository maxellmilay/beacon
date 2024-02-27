import app from '@/db/firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { UserInterface } from '@/interface/authInterface';
import { Dispatch, SetStateAction } from 'react';

const provider = new GoogleAuthProvider();
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const handleSignIn = (setUser: Dispatch<SetStateAction<UserInterface>>) => {

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        
        if(user.displayName && user.email) {
            setUser({
                name: user.displayName,
                email: user.email
            })
        }

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
}

export const handleSignOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}

export default auth;

