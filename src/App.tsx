import React, {useEffect} from 'react';
import Root from './Routes/root'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./Pages/Error";
import Feaders from './Pages/Feaders';
import SignIn from "./Pages/SignIn";
import PostControll from "./Pages/PostControll";
import SignUp from "./Pages/SignUp";
import {useAppDispatch, useAppSelector} from "./Hooks/hook";
import Profile from "./Pages/Profile";
import {authStateChanged, logOut} from "./Service/firebase/userAuth";
import auth from "./Firebase";
import {userAuth} from "./Redux/Store/auth/authSlice";





const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
    path: "feaders",
    element: <Feaders />
  },
  {
    path: "signIn",
    element: <SignIn />,
  },
  {
    path: "signUp",
    element: <SignUp />
  },
  {
    path: "posts",
    element: <PostControll />
  },
  {
    path:"Profile",
    element: <Profile />
  }
]);


function App() {
  const user = useAppSelector(state => state.auth)

  const dispatch = useAppDispatch()
  useEffect(()=> {
    auth.onAuthStateChanged(authUser => {
      if(authUser){
        dispatch(userAuth({
          uId: authUser.uid,
          email: authUser.email,
          name: authUser.displayName
        }))
      }
      else{
        dispatch(userAuth({}))
      }
    })
    console.log(user)
  },[])

  return (
      <RouterProvider router={router}/>
  );
}

export default App;
