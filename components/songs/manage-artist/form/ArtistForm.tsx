import {
  FormActionButton,
  TextInput,
  SelectInput,
} from '@/components/_sharable/form'
import { artistSchema, ArtistFormData } from '@/validations/center/artist'
import { zodResolver } from '@hookform/resolvers/zod'
import { useArtist } from '@/hooks/useArtist'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { artistGraph } from '@/lib/graphql/setup'
import { useEffect } from 'react'
import { ARTIST_STATUS, ARTIST_STATUS_LABELS } from '@/utils/constants/Artist'
import { useForm } from 'react-hook-form'

interface Props {
  isEditMode?: boolean
}

export default function ArtistForm({ isEditMode = false }: Props) {
  const router = useRouter()

  const { addArtist, updateArtist } = useArtist()

  const { data, loading, error } = useQuery(
    artistGraph.queries.GET_ARTIST_BY_ID,
    {
      variables: { id: router.query.id },
      skip: !isEditMode || !router.query.id,
    }
  )

  const artist = data?.artist

  // Inside the ArtistForm component
  const {
    handleSubmit,
    setError,
    reset, // Include reset function
    formState: { errors, isSubmitting },
    control,
  } = useForm<ArtistFormData>({
    resolver: zodResolver(artistSchema),
    defaultValues: {}, // Initialize with empty values
  })

  // Use effect to reset form values when artist data is loaded
  useEffect(() => {
    if (!loading && artist) {
      reset({
        name: artist.name || '',
        website: artist.website || '',
        youtube: artist.youtube || '',
        youtubeMusic: artist.youtubeMusic || '',
        spotify: artist.spotify || '',
        appleMusic: artist.appleMusic || '',
        image: artist.image || '',
        status: artist.status || '',
      })
    }
  }, [artist, loading, reset])

  // Memoized default values can be removed as we are using reset now
  async function onSubmit(values: ArtistFormData) {
    try {
      if (isEditMode) {
        await updateArtist(router.query.id as string, values)
      } else {
        await addArtist(values)
      }
      return router.push('/center/songs/manage-artists')
    } catch (res: any) {
      const errors = res?.errors || []
      errors.forEach(({ field, message }: { field: any; message: string }) => {
        if (['name'].includes(field)) {
          setError(field, { type: 'manual', message })
        } else {
          setError('root', {
            type: 'serverError',
            message: message || 'Invalid credentials',
          })
        }
      })
    }
  }

  if (error) {
    return <div>Error fetching artist data: {error.message}</div>
  }

  const statusOptions = Object.values(ARTIST_STATUS).map((status) => ({
    value: status,
    label: status,
  }))

  return (
    <>
      {loading && <div>Loading...</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <TextInput
            control={control}
            name="name"
            label="Name"
            placeholder="Enter artist's name"
            isRequired={true}
            error={errors.name?.message}
          />

          <TextInput
            control={control}
            name="website"
            label="Website"
            placeholder="Enter artist's website"
            isRequired={false}
            error={errors.website?.message}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <TextInput
            name="youtube"
            label="Youtube"
            placeholder="Enter artist's youtube"
            isRequired={false}
            error={errors.youtube?.message}
            control={control}
          />

          <TextInput
            name="youtubeMusic"
            label="Youtube Music"
            placeholder="Enter artist's youtube music"
            isRequired={false}
            error={errors.youtubeMusic?.message}
            control={control}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <TextInput
            name="spotify"
            label="Spotify"
            placeholder="Enter artist's spotify"
            isRequired={false}
            error={errors.spotify?.message}
            control={control}
          />

          <TextInput
            name="appleMusic"
            label="Apple Music"
            placeholder="Enter artist's apple music"
            isRequired={false}
            error={errors.appleMusic?.message}
            control={control}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <TextInput
            name="image"
            label="Image url"
            placeholder="Enter artist's image url"
            isRequired={false}
            error={errors.image?.message}
            control={control}
          />

          {artist?.status !== ARTIST_STATUS.PUBLISHED && (
            <SelectInput
              name="status"
              label="Status"
              placeholder="Select artist's status"
              info="Pending means the artist needs to be reviewed. Draft means the artist is not published yet."
              isRequired={false}
              error={errors.status?.message}
              control={control}
              options={
                isEditMode
                  ? statusOptions
                  : [
                      {
                        value: ARTIST_STATUS.PENDING,
                        label: ARTIST_STATUS_LABELS[ARTIST_STATUS.PENDING],
                      },
                      {
                        value: ARTIST_STATUS.DRAFT,
                        label: ARTIST_STATUS_LABELS[ARTIST_STATUS.DRAFT],
                      },
                    ]
              }
            />
          )}
        </div>

        {errors.root?.serverError?.message && (
          <div className="text-md text-red-500">
            {errors.root.serverError.message}
          </div>
        )}
        <div className="grid grid-cols-3 gap-4">
          <FormActionButton
            text="Submit"
            htmlType="submit"
            className="mt-2 w-full"
            isLoading={isSubmitting}
            loadingText={isEditMode ? 'Updating artist...' : 'Adding artist...'}
            disabled={isSubmitting}
          />
        </div>
      </form>
    </>
  )
}
