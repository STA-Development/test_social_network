import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import {BrowserRouter as Router, Routes, Route} from  'react-router-dom'
import Root from './Routes/root'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "./Components/Error";
import Feaders from './Components/Feaders';
import SignIn from "./Components/SignIn";
import PostControll from "./Components/PostControll";
import SignUp from "./Components/SignUp";




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
        element: <SignIn />
    },
    {
        path: "signUp",
        element: <SignUp />
    },
    {
        path: "posts",
        element: <PostControll />
    }
]);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <RouterProvider router={router}/>
);


