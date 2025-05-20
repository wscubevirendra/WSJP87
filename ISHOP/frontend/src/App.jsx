import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import WebsiteLayout from './website/pages/WebsiteLayout'
import Home from './website/pages/Home'
import AdminLayout from './admin/pages/AdminLayout'
import Dashboard from './admin/pages/DashBoard'
import ViewCategory from './admin/pages/category/ViewCategory'
import AddCategory from './admin/pages/category/AddCategory'
import Contact from './website/pages/Contact'
import EditCategory from './admin/pages/category/EditCategory'
import ViewColor from './admin/pages/color/ViewColor'
import AddColor from './admin/pages/color/AddColor'
import AddProduct from './admin/pages/product/AddProduct'
import ViewProduct from './admin/pages/product/ViewProduct'
import MultipleImage from './admin/pages/product/MultipleImage'
import Login from './admin/pages/login'

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
        },
        {
          path: "category/edit/:categoryId",
          element: <EditCategory />
        },
        {
          path: "color",
          element: <ViewColor />
        },
        {
          path: "color/add",
          element: <AddColor />
        },
        {
          path: "product",
          element: <ViewProduct />
        },
        {
          path: "product/add",
          element: <AddProduct />
        }, {
          path: "product/multiple/:productId",
          element: <MultipleImage />
        }
      ]
    },
    {
      path: "/admin/login",
      element: <Login />
    }
  ])
  return (
    <RouterProvider router={routers} />
  )
}
