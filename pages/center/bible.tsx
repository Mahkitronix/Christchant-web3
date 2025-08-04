import { CenterMenuItems } from '@/components/layouts/center/CenterMenuItems'
import CenterLayout from '@/components/layouts/center/CenterLayout'
import { WithUserAuthPage } from '@/middleware/WithUserAuthPage'
import { bibleBreadCrumbs } from '@/components/songs/BreadCrumbs'

const pageTitle = 'Bible'

const breadcrumbs = [
  ...bibleBreadCrumbs,
  {
    link: 'songs/view',
    label: pageTitle,
  },
]

const BiblePage = () => {
  const dashboardTitle = 'Bible'

  return (
    <CenterLayout
      pageTitle={dashboardTitle}
      menuItems={CenterMenuItems}
      breadcrumbs={breadcrumbs}
    >
      <div className="py-4">
        <div className="container mx-auto px-4 py-8"></div>
      </div>
    </CenterLayout>
  )
}

export default WithUserAuthPage(BiblePage)
