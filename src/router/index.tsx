import { createBrowserRouter, Navigate } from 'react-router-dom';

import { IssueView, ListViewCopy } from '../issues/views';
import { GitApp } from '../GitApp';

export const router = createBrowserRouter([
  {
    path: '/issues',
    element: <GitApp />,
    children: [
        { path: 'list', element: <ListViewCopy />,  },
        { path: 'issue/:id', element: <IssueView /> },
        { path: '*', element: <Navigate to="list" /> },
    ]
  },
  {
    path: '/',
    element: <Navigate to="issues/list" />
  },
  {
    path: '*',
    element: <h1>Not found</h1>,
  },
]);

