import { CenterMenuItems } from '@/components/layouts/center/CenterMenuItems'
import CenterLayout from '@/components/layouts/center/CenterLayout'
import { WithUserAuthPage } from '@/middleware/WithUserAuthPage'
import ViewDetails from '@/components/songs/manage-artist/ViewDetails'

const pageTitle = 'View Artists'

const ManageArtists = () => {
  const breadcrumbs = [
    {
      link: 'songs/manage-artists',
      label: 'Manage Artists',
    },
    {
      link: 'songs/manage-artists/view',
      label: 'View Artists',
    },
  ]
  return (
    <CenterLayout
      pageTitle={pageTitle}
      withPageTitle={false}
      menuItems={CenterMenuItems}
      breadcrumbs={breadcrumbs}
    >
      <ViewDetails />
    </CenterLayout>
  )
}
export default WithUserAuthPage(ManageArtists)
