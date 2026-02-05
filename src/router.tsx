import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultErrorComponent: () => <p>Error</p>,
    defaultNotFoundComponent: () => <p>Not Found</p>,
    scrollRestoration: true,
  })
  return router
}