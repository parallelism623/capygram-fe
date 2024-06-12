/* eslint-disable */
import React from 'react'
import { useRoutes } from 'react-router-dom';

import Home from './pages/home/Home';
import Messages from './pages/messages/Messages';
import Notifications from './pages/notifications/Notifications';
import Profile from './pages/profile/Profile';
import Reel from './pages/reel/Reel';
import Threads from './pages/threads/Threads';
import Login from './pages/login/Login';
import Menu from './components/Menu/Menu';
import LayoutMenu from './layouts/LayoutMenu';
import RegisterInFo from './pages/register/information/RegisterInFo';
import RegisterBirthday from './pages/register/birthday/RegisterBirthday';

const App = () => {
  const routes = useRoutes([
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register-information',
      element: <RegisterInFo />
    },
    {
      path: '/register-birthday',
      element: <RegisterBirthday />
    },
    {
      path: '/',
      element: <LayoutMenu />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/messages',
          element: <Messages />
        },
        {
          path: '/notifications',
          element: <Notifications />
        },
        {
          path: '/profile',
          element: <Profile />
        },
        {
          path: '/reel',
          element: <Reel />
        },
        {
          path: '/threads',
          element: <Threads />
        },
      ]
    },
    {
      path: '/*',
      element: <div>Not Found</div>
    }

  ]);

  return routes;
}

export default App;