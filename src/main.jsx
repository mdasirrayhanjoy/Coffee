import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './components/Home.jsx'
import UpdateCoffee from './components/UpdateCoffee.jsx'
import MainLayout from './layouts/MainLayout.jsx'


import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import AddCottee from './components/AddCottee.jsx'
import CoffeeDetiles from './components/CoffeeDetiles.jsx'
import Login from './Login.jsx'
import SignIn from './SignIn.jsx'
import AuthProvider from './AuthProvider.jsx'
import Users from './Users.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        loader: () => fetch('http://localhost:3000/coffees'),
        Component: Home,
      },
      {
        path: "/update-coffee/:id",
        loader: ({ params }) => fetch(`http://localhost:3000/coffees/${params.id}`),
        Component: UpdateCoffee,
      },
      {
        path: "/coffee-details/:id",
        loader: ({ params }) => fetch(`http://localhost:3000/coffees/${params.id}`),
        Component: CoffeeDetiles,
      },
      {
        path: "/add-coffee",
        Component: AddCottee,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/sign-in",
        Component: SignIn,
      },
      {
        path: "/users",
        loader: () => fetch('http://localhost:3000/users'),
        Component: Users,
      },
    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
