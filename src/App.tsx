import React from 'react';
import { RouterProvider } from 'react-router-dom';

import appRouter from './Routes/Router';
import useAuth from './Hooks/useAuth';

const App = (): JSX.Element => {
  useAuth();
  return <RouterProvider router={appRouter} />;
};

export default App;
