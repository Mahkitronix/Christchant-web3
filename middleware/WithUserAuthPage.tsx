import { useUserAuth } from '@/hooks/useUserAuth'
import { useRouter } from 'next/router'
import { ComponentType, useEffect } from 'react'

interface WithUserAuthOptions {
  requireVerified?: boolean
  requireActive?: boolean
  redirectTo?: string
}

export function WithUserAuthPage<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithUserAuthOptions = {}
) {
  return function WithUserAuthPage(props: P) {
    const router = useRouter()
    const {
      requireVerified = true,
      requireActive = true,
      redirectTo = '/center/login',
    } = options

    const { auth: { user, isAuthenticated } } = useUserAuth({
      requireVerified,
      requireActive,
    })

    // Check admin entity requirement after we have the user
    const shouldRedirect = !isAuthenticated

    useEffect(() => {
      if (shouldRedirect && router.pathname !== redirectTo) {
        router.replace(redirectTo)
      }
    }, [shouldRedirect, router, redirectTo])

    // Show loading state while checking authentication
    if (shouldRedirect) {
      return (
        <div className="flex h-screen items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      )
    }

    // Only render the component if authenticated
    if (isAuthenticated) {
      return <WrappedComponent {...props} user={user} />
    }

    // Return null while redirecting
    return null
  }
}
