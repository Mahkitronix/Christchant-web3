import ArtistForm from '@/components/songs/manage-artist/form/ArtistForm'
import { CenterMenuItems } from '@/components/layouts/center/CenterMenuItems'
import { WithUserAuthPage } from '@/middleware/WithUserAuthPage'
import CenterLayout from '@/components/layouts/center/CenterLayout'
import { artistBreadCrumbs } from '@/components/songs/BreadCrumbs'

const pageTitle = 'Add Artist'

const breadcrumbs = [
  ...artistBreadCrumbs,
  {
    link: '',
    label: pageTitle,
  },
]

const AddArtist = () => {
  return (
    <CenterLayout
      pageTitle={pageTitle}
      withPageTitle={true}
      menuItems={CenterMenuItems}
      breadcrumbs={breadcrumbs}
      backLink={'/center/songs/manage-artists'}
    >
      <div className="py-4">
        <ArtistForm />
      </div>
    </CenterLayout>
  )
}
export default WithUserAuthPage(AddArtist)
