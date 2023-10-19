import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import Root from './root';
import ErrorPage from '../Pages/Error';
import Readers from '../Pages/Readers';
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import PrivateRoutes from '../Components/PrivateRoutes';
import PostControl from '../Pages/PostControl';
import Profile from '../Pages/Profile';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage message={null} />,
  },
  {
    path: 'Readers',
    element: <Readers />,
  },
  {
    path: 'signIn',
    element: <SignIn />,
  },
  {
    path: 'signUp',
    element: <SignUp />,
  },
  {
    path: 'posts',
    element: <PrivateRoutes elements={<PostControl />} />,
  },
  {
    path: 'Profile',
    element: <PrivateRoutes elements={<Profile />} />,
  },
]);
export default appRouter;
