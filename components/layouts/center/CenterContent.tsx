import { BreadcrumbItem, Breadcrumbs } from '@heroui/react'
import { IconArrowLeft, IconHome } from '@tabler/icons-react'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { isEmpty } from 'camote-utils'

interface CenterLayoutProps {
  pageTitle: string | null
  withPageTitle?: boolean
  children: ReactNode
  breadcrumbs: { link?: string; label: string }[]
  pageDescription?: string
  backLink?: string
  currentPage?: string
  handleRouteChange: (key: string) => void
}

export default function CenterContent({
  pageTitle,
  withPageTitle,
  pageDescription,
  children,
  breadcrumbs,
  currentPage,
  backLink,
  handleRouteChange,
}: CenterLayoutProps) {
  const router = useRouter()

  return (
    <main
      className={`scrollbar flex-1 transition-transform duration-200 ease-in-out`}
    >
      <div className="container mx-auto px-4 py-4">
        {breadcrumbs?.length > 0 && (
          <Breadcrumbs
            underline="active"
            onAction={(key: any) => handleRouteChange(key)}
          >
            <BreadcrumbItem
              key="dashboard"
              className="cursor-pointer"
              isCurrent={currentPage == 'dashboard'}
              startContent={<IconHome size={15} stroke={1.5} />}
            >
              Dashboard
            </BreadcrumbItem>
            {breadcrumbs?.map((item) => (
              <BreadcrumbItem
                key={item?.link}
                className={`${
                  isEmpty(item?.link) ? 'opacity-50' : 'cursor-pointer'
                }`}
              >
                {item.label}
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>
        )}
        {(withPageTitle || backLink) && (
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div>
                {backLink && (
                  <button
                    onClick={() => router.push(backLink)}
                    className="mb-4 flex items-center text-blue-500 hover:underline"
                  >
                    <IconArrowLeft size={16} className="mr-2" /> Back
                  </button>
                )}

                <h1 className="text-2xl font-bold">{pageTitle}</h1>
                {pageDescription && (
                  <p className="mt-2 text-gray-600">{pageDescription}</p>
                )}
              </div>
            </div>
          </div>
        )}
        {children}
      </div>
    </main>
  )
}
