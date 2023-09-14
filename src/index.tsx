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
    }
]);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <RouterProvider router={router}/>
);


