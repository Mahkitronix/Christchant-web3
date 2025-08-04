import { CenterMenuItems } from '@/components/layouts/center/CenterMenuItems'
import { WithUserAuthPage } from '@/middleware/WithUserAuthPage'
import CenterLayout from '@/components/layouts/center/CenterLayout'

const pageTitle = 'Profile'

const breadcrumbs = [
  {
    link: 'center/account/profile',
    label: pageTitle,
  },
]

const Profile = () => {
  return (
    <CenterLayout
      pageTitle={pageTitle}
      withPageTitle={true}
      menuItems={CenterMenuItems}
      breadcrumbs={breadcrumbs}
    >
      <div className="py-4">{/* <ArtistForm /> */}</div>
    </CenterLayout>
  )
}
export default WithUserAuthPage(Profile)
