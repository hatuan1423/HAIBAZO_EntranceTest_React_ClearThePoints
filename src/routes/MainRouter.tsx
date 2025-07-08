import { MENU } from 'defines'
import { HomePage } from 'pages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

export const MainRouter = () => {
  const router = createBrowserRouter([
    {
      path: MENU.HOME,
      element: <HomePage />
    }
  ])

  return <RouterProvider router={router} />
}
