import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    getRedirectResult,
    updateProfile, getAuth
} from "firebase/auth"
import auth from "../../Firebase"



const provider:GoogleAuthProvider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');




export const createUser = async (email:string,password:string,userName:string) => {
    return createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user) {
                return updateProfile(user, { displayName: userName })
                    .then(() => user)
                    .catch((error) => {
                        console.error('Error updating profile:', error);
                    });
            } else {
                console.error('User not found after creation');
                return null;
            }
        })
        .catch((error) => {
            console.error('Error creating user:', error);
            return null;
        });
}
export const authStateChanged = ():any=> {
    onAuthStateChanged(auth, (currentUser:object | null):object | null => {
        return currentUser
    })
}
export const signIn = async (email:string,password:string) => {
    const user = await signInWithEmailAndPassword(auth,email,password)
    return user
}

export const logOut = () => {
    return signOut(auth)
}

export const authWithGoogle = async ()=>{
    await signInWithPopup(auth, provider);
    // const redirectResults = getRedirectResult(auth)
    //     .then((result) => {
    //         // This gives you a Google Access Token. You can use it to access Google APIs.
    //
    //         const credential = GoogleAuthProvider.credentialFromResult(result);
    //         const token = credential?.accessToken;
    //
    //         // The signed-in user info.
    //         const user = result?.user;
    //         // IdP data available using getAdditionalUserInfo(result)
    //         // ...
    //     }).catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.customData.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     // ...
    // });
    // console.log(redirectResults)
}

