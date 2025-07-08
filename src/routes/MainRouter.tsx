import { HomePage } from 'pages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

export const MainRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    }
  ])

  return <RouterProvider router={router} />
}
