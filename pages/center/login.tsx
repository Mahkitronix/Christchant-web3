import { CenterLoginForm } from '@/components/auth'
import { useUserAuth } from '@/hooks/useUserAuth'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React from 'react'

const AdminLoginPage: React.FC = () => {
  const router = useRouter()
  const { redirect } = router.query as { redirect?: string }
  useUserAuth({
    redirectTo: '/center/dashboard',
    userType: ['superAdmin'],
    requireVerified: true,
    requireActive: true,
  })

  return (
    <>
      <Head>
        <title>Admin Center | {process.env.APP_NAME}</title>
      </Head>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-[400px]">
          <div className="mb-4 rounded-lg pb-8 pt-6">
            <CenterLoginForm redirect={redirect} />

            <p className="mt-8 text-center text-xs text-gray-500">
              &copy;{new Date().getFullYear()} {process.env.APP_NAME}. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLoginPage
