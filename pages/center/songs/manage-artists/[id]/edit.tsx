import ArtistForm from '@/components/songs/manage-artist/form/ArtistForm'
import { CenterMenuItems } from '@/components/layouts/center/CenterMenuItems'
import { WithUserAuthPage } from '@/middleware/WithUserAuthPage'
import CenterLayout from '@/components/layouts/center/CenterLayout'
import { artistBreadCrumbs } from '@/components/songs/BreadCrumbs'

const pageTitle = 'Edit Artist'

const breadcrumbs = [
  ...artistBreadCrumbs,
  {
    link: '',
    label: pageTitle,
  },
]

const ManageArtists = () => {
  return (
    <CenterLayout
      pageTitle={pageTitle}
      withPageTitle={true}
      menuItems={CenterMenuItems}
      breadcrumbs={breadcrumbs}
      backLink={'/center/songs/manage-artists'}
    >
      <div className="py-4">
        <ArtistForm isEditMode={true} />
      </div>
    </CenterLayout>
  )
}
export default WithUserAuthPage(ManageArtists)
