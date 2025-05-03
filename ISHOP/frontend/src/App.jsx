import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import WebsiteLayout from './website/pages/WebsiteLayout'
import Home from './website/pages/Home'
import AdminLayout from './admin/pages/AdminLayout'
import Dashboard from './admin/pages/DashBoard'
import ViewCategory from './admin/pages/category/ViewCategory'
import AddCategory from './admin/pages/category/AddCategory'
import Contact from './website/pages/Contact'

export default function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <WebsiteLayout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/contact",
          element: <Contact />
        }
      ]
    }
    ,
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin",
          element: <Dashboard />
        },
        {
          path: "category",
          element: <ViewCategory />
        },
        {
          path: "category/add",
          element: <AddCategory />
        }
      ]
    }
  ])
  return (
    <RouterProvider router={routers} />
  )
}
