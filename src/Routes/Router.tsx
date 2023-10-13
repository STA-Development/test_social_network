import {createBrowserRouter} from "react-router-dom";
import Root from "./root";
import ErrorPage from "../Pages/Error";
import Feaders from "../Pages/Feaders";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import PrivateRoutes from "../Components/PrivateRoutes";
import PostControll from "../Pages/PostControll";
import Profile from "../Pages/Profile";
import React from "react";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage message={null} />,
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