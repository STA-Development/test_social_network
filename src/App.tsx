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
import auth from "./Firebase";
import {userAuth, userLogOut} from "./Redux/Store/auth/authSlice";
import PrivateRoutes from "./Components/PrivateRoutes";





const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage message={null} />
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
    element: <PrivateRoutes elements={<PostControll />}/>
  },
  {
    path:"Profile",
    element: <PrivateRoutes elements={<Profile />}/>
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
        dispatch(userLogOut())
      }
    })
  },[])

  return (
      <RouterProvider router={router}/>
  );
}

export default App;
