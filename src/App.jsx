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
import LayoutMenu from './layouts/LayoutMenu';
import LayoutFooter from './layouts/LayoutFooter';
import ResetPassword from './pages/resetPassword/ResetPassword';
import Register from './pages/register/Register';
import VerifyAccount from './pages/VerifyAccount/VerifyAccount';
import SMSMessages from './pages/SMSMessages/SMSMessages';
import EditProfile from './pages/profile/EditProfile';
import Archive from './pages/profile/Archive';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const routes = useRoutes([
    {
      path: '/ft',
      element: <LayoutFooter />,
      children: [
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        },
        {
          path: 'reset-password',
          element: < ResetPassword />
        }
      ]
    },
    {
      path: '/verify-account',
      element: <VerifyAccount />
    },
    {
      path: '/sms-messages',
      element: <SMSMessages />
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
          path: 'profile',
          element: <Profile />
        },
        {
          path: 'edit-profile',
          element: <EditProfile />
        },
        {
          path: 'archive-profile',
          element: <Archive />
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

  return (
    <>
      <ToastContainer />
      {routes}
    </>
  );

}

export default App;