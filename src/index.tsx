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
import ErrorPage from "./Pages/Error";
import Feaders from './Pages/Feaders';
import SignIn from "./Pages/SignIn";
import PostControll from "./Pages/PostControll";
import SignUp from "./Pages/SignUp";
import { Provider } from 'react-redux'
import store from "./Redux/store"




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
    }
]);



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);


