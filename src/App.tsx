import React, {useEffect} from 'react';
import {
  RouterProvider,
} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./Hooks/hook";
import auth from "./Firebase";
import {userAuth, userLogOut, userToken} from "./Redux/Store/auth/authSlice";
import axios from "axios";
import {appRouter} from "./Routes/Router";


function App() {
  const dispatch = useAppDispatch()
  useEffect(()=> {
    auth.onAuthStateChanged(authUser => {
      if(authUser){
        console.log(authUser);
        authUser.getIdTokenResult().then(result=> {
          console.log(result);
          const token:string = result.token
          dispatch(userToken(token))
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
      <RouterProvider router={appRouter} />
  );
}

export default App;
