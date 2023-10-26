import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../Firebase';
import { ToastNotifyError } from '../../Helpers';

const provider: GoogleAuthProvider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export const createUser = async (
  email: string,
  password: string,
  userName: string,
) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      if (user) {
        return updateProfile(user, {
          displayName: userName,
          photoURL: '/butman.png',
        })
          .then(() => user)
          .catch((error) => {
            ToastNotifyError(error.message);
          });
      }
      ToastNotifyError('something went wrong');
      return null;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
export const authStateChanged = (): any => {
  onAuthStateChanged(auth, (currentUser: object | null): object | null => {
    return currentUser;
  });
};
export const signIn = async (email: string, password: string) => {
  const user = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

export const logOut = () => {
  return signOut(auth);
};

export const authWithGoogle = async () => {
  const GoogleSignIn = await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        // The signed-in user info.
        const { user } = result;
        return user;
      }
      return null;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorMessage = error.message;
      ToastNotifyError(errorMessage);
    });
  return GoogleSignIn;
};
