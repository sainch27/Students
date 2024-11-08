import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './layout/Layout.jsx'
import MainPage from './pages/mainPage/mainPage.jsx'; 
import StudentsList from './pages/students/StudentsList.jsx';
import StudentsAdd from './pages/students/StudentsAdd.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <MainPage/>
      },
      {
        path: "/students",
        element: <StudentsList/>
      },
      {
        path: "/students/add",
        element: <StudentsAdd/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
