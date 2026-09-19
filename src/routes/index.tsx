import { createBrowserRouter } from 'react-router-dom';
import Intro from '../pages/Intro';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Placeholder from '../pages/Placeholder';
import { ProtectedRoute } from './ProtectedRoute';
import { AppShell } from '../components/layout/AppShell';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Intro />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          { path: '/dashboard', element: <Dashboard /> },
          { path: '/investigations', element: <Placeholder title="Investigations" /> },
          { path: '/evidence', element: <Placeholder title="Evidence" /> },
          { path: '/reconstruction', element: <Placeholder title="Attack Reconstruction" /> },
          { path: '/timeline', element: <Placeholder title="Timeline" /> },
          { path: '/impact', element: <Placeholder title="Impact Analysis" /> },
          { path: '/rarf', element: <Placeholder title="RARF Viewer" /> },
          { path: '/reports', element: <Placeholder title="Reports" /> },
          { path: '/settings', element: <Placeholder title="Settings" /> },
          { path: '/profile', element: <Placeholder title="Analyst Profile" /> },
        ]
      }
    ]
  }
]);
