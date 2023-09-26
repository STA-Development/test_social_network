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
import axios from "axios";





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
  const user = useAppSelector(state => state.auth )
  const dispatch = useAppDispatch()
  useEffect(()=> {
    auth.onAuthStateChanged(authUser => {
      if(authUser){
        authUser.getIdTokenResult().then(result=> {
          const token = result.token
          const request: Promise<void> = axios.get("http://localhost:3000/userAuth/verifyUser",{
            headers:{
              Authorization: `Bearer ${token}`
            }
          }).then(response => {
            const data = response.data
            dispatch(userAuth({
              uId: data.user_id,
              email: data.email,
              name: data.name,
              picture: data.picture
            }))
          }).catch(e => console.log(e.message))

        }).catch(error => console.error("something wrong: " + error.message));
      }
      else{
        dispatch(userLogOut())
      }
    })
  },[])

  return (
      <RouterProvider router={router} />
  );
}

export default App;
