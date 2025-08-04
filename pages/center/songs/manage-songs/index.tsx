import { CenterMenuItems } from '@/components/layouts/center/CenterMenuItems'
import CenterLayout from '@/components/layouts/center/CenterLayout'
import { WithUserAuthPage } from '@/middleware/WithUserAuthPage'
import DataTable from '@/components/_sharable/tables/DataTable'
import { artistGraph } from '@/lib/graphql/setup'
import { useQuery } from '@apollo/client'
import {
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link,
  Button,
} from '@heroui/react'
import {
  IconBrandApple,
  IconBrandSpotify,
  IconBrandYoutube,
  IconDots,
  IconEye,
  IconPencil,
  IconPlus,
  IconTrash,
  IconX,
  IconCheck,
  IconClock,
  IconFileText,
} from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { ARTIST_STATUS } from '@/utils/constants/Artist'
import { useArtist } from '@/hooks/useArtist'
import toast from 'react-hot-toast'
import ActionModal from '@/components/_sharable/modals/ActionModal'
import Image from 'next/image'
import UiAvatarLetter from '@/components/_sharable/avatars/UiAvatarLetter'

const ManageArtists = () => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [artistIdToDelete, setArtistIdToDelete] = useState<string | null>(null)

  const [pagination] = useState({
    offset: 0,
    limit: 10,
    searchPattern: '%%',
  })

  const variables: any = {
    offset: pagination.offset,
    limit: pagination.limit,
    searchPattern: pagination.searchPattern,
  }

  const { deleteArtist } = useArtist()

  const { loading, data, refetch } = useQuery(artistGraph.queries.GET_ARTISTS, {
    variables,
  })

  const [isLoading, setIsLoading] = useState(loading)

  const handleRefetch = async (data: any) => {
    try {
      setIsLoading(true)
      await refetch(data)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  const artistData = data?.getArtists?.artists ?? []
  const totalCount = data?.getArtists?.totalCount ?? 0

  const loadingState = isLoading ? 'loading' : 'idle'

  const columns = [
    {
      name: 'Image',
      uid: 'image',
      align: 'start',
      width: 100,
    },
    {
      name: 'Name',
      uid: 'name',
      align: 'start',
      width: 200,
      withSort: true,
    },
    {
      name: 'Website',
      uid: 'website',
      align: 'start',
      width: 400,
      withSort: true,
    },
    {
      name: 'Youtube',
      uid: 'youtube',
      align: 'start',
      width: 100,
    },
    {
      name: 'Youtube Music',
      uid: 'youtubeMusic',
      align: 'start',
      width: 100,
    },
    {
      name: 'Spotify',
      uid: 'spotify',
      align: 'start',
      width: 100,
    },
    {
      name: 'Apple Music',
      uid: 'appleMusic',
      align: 'start',
      width: 100,
    },
    {
      name: 'Status',
      uid: 'status',
      align: 'start',
      width: 100,
    },
    {
      name: 'Actions',
      uid: 'actions',
      align: 'start',
      width: 100,
    },
  ]

  // Ensure ARTIST_STATUS_LABELS is correctly defined
  const statusIcons: Record<string, JSX.Element> = {
    [ARTIST_STATUS.PUBLISHED]: <IconCheck size={16} className="text-success" />,
    [ARTIST_STATUS.PENDING]: <IconClock size={16} className="text-warning" />,
    [ARTIST_STATUS.DRAFT]: <IconFileText size={16} />,
    [ARTIST_STATUS.REJECTED]: <IconX size={16} className="text-danger" />,
  }

  const handleDeleteArtist = async (artistId: string) => {
    setArtistIdToDelete(artistId)
    setIsModalOpen(true)
  }

  const confirmDeleteArtist = async () => {
    if (artistIdToDelete) {
      try {
        setIsDeleting(true)
        await deleteArtist(artistIdToDelete)
        await handleRefetch({
          offset: pagination.offset,
          limit: pagination.limit,
          searchPattern: pagination.searchPattern,
        })
        setArtistIdToDelete(null)
        setIsModalOpen(false)
        toast.success('Artist deleted successfully')
      } catch {
        toast.error('Failed to delete artist')
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <>
      <CenterLayout
        pageTitle={'Manage Artists'}
        menuItems={CenterMenuItems}
        breadcrumbs={[
          {
            label: 'Manage Artists',
          },
        ]}
      >
        <DataTable
          data={artistData}
          columns={columns}
          refetch={handleRefetch}
          total={totalCount}
        >
          <div className="flex items-center justify-between px-2 py-4">
            <div>
              <Link href="/center/songs/manage-artists/add-artist">
                <Button className="btn btn-primary">
                  <IconPlus size={16} className="mr-2" /> Add Artist
                </Button>
              </Link>
            </div>
          </div>
          <TableBody
            items={artistData}
            loadingContent={<Spinner />}
            loadingState={loadingState}
            emptyContent={'No rows to display.'}
            className="h-[296px]"
          >
            {(item: any) => (
              <TableRow key={Number(item?.id)}>
                <TableCell>
                  {item?.image ? (
                    <Image
                      src={item?.image || ''}
                      alt={item?.name}
                      width={50}
                      height={50}
                      className="size-50 rounded-lg object-cover"
                    />
                  ) : (
                    <UiAvatarLetter name={item?.name} />
                  )}
                </TableCell>
                <TableCell>{item?.name}</TableCell>
                <TableCell>
                  {item?.website ? (
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.website}
                    </a>
                  ) : null}
                </TableCell>
                <TableCell>
                  {item?.youtube ? (
                    <a
                      href={item.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconBrandYoutube size={16} />
                    </a>
                  ) : null}
                </TableCell>

                <TableCell>
                  {item?.youtubeMusic ? (
                    <a
                      href={item.youtubeMusic}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconBrandYoutube size={16} />
                    </a>
                  ) : null}
                </TableCell>

                <TableCell>
                  {item?.spotify ? (
                    <a
                      href={item.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconBrandSpotify size={16} />
                    </a>
                  ) : null}
                </TableCell>

                <TableCell>
                  {item?.appleMusic ? (
                    <a
                      href={item?.appleMusic}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconBrandApple size={16} />
                    </a>
                  ) : null}
                </TableCell>

                <TableCell>
                  {statusIcons[item?.status as keyof typeof ARTIST_STATUS] ||
                    ''}
                </TableCell>

                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <IconDots
                        className="rotate-90 cursor-pointer"
                        size={16}
                      />
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        key={`${item?.id}-view`}
                        href={`/center/songs/manage-artists/${item?.id}/view`}
                      >
                        <div className="flex items-center">
                          <IconEye size={16} />
                          <span className="ml-2">View</span>
                        </div>
                      </DropdownItem>
                      <DropdownItem
                        key={`${item?.id}-edit`}
                        href={`/center/songs/manage-artists/${item?.id}/edit`}
                      >
                        <div className="flex items-center">
                          <IconPencil size={16} />
                          <span className="ml-2">Edit</span>
                        </div>
                      </DropdownItem>
                      {item?.status === ARTIST_STATUS.DRAFT ||
                      item?.status === ARTIST_STATUS.REJECTED ? (
                        <DropdownItem
                          key={`${item.id}-delete`}
                          className="text-danger"
                          onPress={() => {
                            handleDeleteArtist(item.id)
                          }}
                          color="danger"
                        >
                          <div className="flex items-center">
                            <IconTrash size={16} />
                            <span className="ml-2">Delete</span>
                          </div>
                        </DropdownItem>
                      ) : null}
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </DataTable>
      </CenterLayout>
      {isModalOpen && (
        <ActionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmDeleteArtist}
          title="Are you sure?"
          message="Deleting this artist will permanently remove it from the system. This action cannot be undone."
          isSubmitting={isDeleting}
        />
      )}
    </>
  )
}
export default WithUserAuthPage(ManageArtists)
