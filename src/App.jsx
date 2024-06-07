/* eslint-disable */
import React from 'react'
import { useRoutes } from 'react-router-dom';

import Home from './pages/home/Home';
import Messages from './pages/messages/Messages';
import Notifications from './pages/notifications/Notifications';
import Profile from './pages/profile/Profile';
import Reel from './pages/reel/Reel';
import Threads from './pages/threads/Threads';

const App = () => {
  const routes = useRoutes([
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
    {
      path: '/*',
      element: <div>Not Found</div>
    }
  ]);

  return routes;
}

export default App;