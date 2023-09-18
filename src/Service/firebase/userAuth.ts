import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithRedirect,
    getRedirectResult,
    updateProfile, getAuth
} from "firebase/auth"
import auth from "../../Firebase"



const provider:GoogleAuthProvider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export const createUser = (email:string,password:string,userName:string) => {
    return createUserWithEmailAndPassword(auth,email,password)
    //         .then(()=>signInWithEmailAndPassword(auth,email,password)
    //             .then(() => updateProfile(<User>auth.currentUser, {displayName:userName}))
    // )
}
export const authStateChanged = ():any=> {
    onAuthStateChanged(auth, (currentUser:object | null):object | null => {
        return currentUser
    })
}
export const signIn = (email:string,password:string) => {
    return signInWithEmailAndPassword(auth,email,password)
}

export const logOut = () => {
    return signOut(auth)
}

export const authWithGoogle = ()=>{
    signInWithRedirect(auth, provider);
    // const redirectResults = getRedirectResult(auth)
    //     .then((result) => {
    //         // This gives you a Google Access Token. You can use it to access Google APIs.
    //         const credential = GoogleAuthProvider.credentialFromResult(result);
    //         const token = credential.accessToken;
    //
    //         // The signed-in user info.
    //         const user = result.user;
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

//TODO fix this part
// useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
//         console.log(currentUser)
//     })
//     return () => unsubscribe()
// }, [])