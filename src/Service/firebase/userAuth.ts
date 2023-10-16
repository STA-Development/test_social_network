import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from "firebase/auth"
import auth from "../../Firebase"



const provider:GoogleAuthProvider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');


export const createUser = async (email:string,password:string,userName:string) => {
    return createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user) {
                return updateProfile(user, { displayName: userName, photoURL:'/butman.png' })
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
            throw new Error (error.message)
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
   const signIn =  await signInWithPopup(auth, provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if(credential){
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                return user
            }
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
    return signIn
}

