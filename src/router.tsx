import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClient } from '@tanstack/react-query'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'


export function getRouter() {
    const queryClient = new QueryClient()
  
  const router = createRouter({
    routeTree,
    context: { queryClient},
    defaultPreload: 'intent',
    defaultErrorComponent: () => <p>Error</p>,
    defaultNotFoundComponent: () => <p>Not Found</p>,
    scrollRestoration: true,
  })

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  })
  return router
}