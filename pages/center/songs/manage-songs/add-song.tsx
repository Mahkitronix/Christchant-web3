import { CenterMenuItems } from '@/components/layouts/center/CenterMenuItems'
import CenterLayout from '@/components/layouts/center/CenterLayout'
import { WithUserAuthPage } from '@/middleware/WithUserAuthPage'
import SongForm from '@/components/songs/manage-song/form/SongForm'
import { songsBreadCrumbs } from '@/components/songs/BreadCrumbs'
const pageTitle = 'Add Song'

const breadcrumbs = [
  ...songsBreadCrumbs,
  {
    link: 'songs/manage-songs/view',
    label: 'Add Song',
  },
]

const ManageSongs = () => {
  return (
    <CenterLayout
      pageTitle={pageTitle}
      withPageTitle={false}
      menuItems={CenterMenuItems}
      breadcrumbs={breadcrumbs}
      backLink={'/center/songs/manage-songs'}
    >
      <div className="py-4">
        <SongForm />
      </div>
    </CenterLayout>
  )
}
export default WithUserAuthPage(ManageSongs)
