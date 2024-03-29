import { createBrowserRouter } from 'react-router-dom'

import { Home } from './pages/home'
import { NotFound } from './pages/erro'
import { Favoritos } from './pages/favoritos'

import { Layout } from './components/layout'
import { Filme } from './pages/filme'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '*',
        element: <NotFound />
      },
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'favoritos',
        element: <Favoritos />
      },
      {
        path: 'filme/:id',
        element: <Filme />
      }
    ]
  }
])

export { router }
