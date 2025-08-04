import { SONG_STATUS, SONG_STATUS_LABELS } from '@/utils/constants/Song'
import {
  FormActionButton,
  TextInput,
  SelectInput,
  ArtistSelect,
  TextArea,
  Form,
} from '@/components/_sharable/form'
import { songSchema, SongFormData } from '@/validations/center/song'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSong } from '@/hooks/useSong'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { songGraph } from '@/lib/graphql/setup'
import { useEffect } from 'react'

interface Props {
  isEditMode?: boolean
}

export default function SongForm({ isEditMode = false }: Props) {
  const router = useRouter()

  const { addSong, updateSong } = useSong()

  const {
    data: songData,
    loading,
    error,
  } = useQuery(songGraph.queries.GET_SONG_BY_ID, {
    variables: { id: router.query.id },
    skip: !isEditMode || !router.query.id,
  })

  const song = songData?.song

  const {
    register,
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SongFormData>({
    resolver: zodResolver(songSchema),
    defaultValues: {},
  })

  useEffect(() => {
    if (!loading && song) {
      reset({
        title: song.title || '',
        artistId: song.artistId || '',
        status: song.status || '',
      })
    }
  }, [song, loading, reset])

  async function onSubmit(values: SongFormData) {
    try {
      if (isEditMode) {
        await updateSong(router.query.id as string, values)
      } else {
        await addSong(values)
      }
      return router.push('/center/songs/manage-songs')
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
    return <div>Error fetching song data: {error.message}</div>
  }

  const statusOptions = Object.values(SONG_STATUS).map((status) => ({
    value: status,
    label: status,
  }))

  return (
    <>
      {loading && <div>Loading...</div>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-4">
          <TextInput
            name="title"
            label="Title"
            placeholder="Enter song's title"
            error={errors.title?.message}
            size="md"
            control={control}
            isRequired={true}
          />
          {song?.status !== SONG_STATUS.PUBLISHED && (
            <SelectInput
              name="status"
              label="Status"
              placeholder="Enter song's status"
              info="Pending means the song needs to be reviewed. Draft means the song is not published yet."
              isRequired={false}
              error={errors.status?.message}
              control={control}
              options={
                isEditMode
                  ? statusOptions
                  : [
                      {
                        value: SONG_STATUS.PENDING,
                        label: SONG_STATUS_LABELS[SONG_STATUS.PENDING],
                      },
                      {
                        value: SONG_STATUS.DRAFT,
                        label: SONG_STATUS_LABELS[SONG_STATUS.DRAFT],
                      },
                    ]
              }
            />
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <TextInput
            control={control}
            name="lwc"
            label="Lyrics and Chords"
            placeholder="Enter song's lyrics and chords"
            isRequired={true}
            error={errors.lwc?.message}
            size="md"
          />
          <ArtistSelect
            register={register}
            name="artistId"
            label="Select Artist"
            placeholder="Enter song's artist"
            info="All artists that active status will be shown here"
            isRequired={true}
            error={errors.artistId?.message}
            size="md"
            control={control}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <TextArea
            control={control}
            name="lwcIntro"
            label="Lyrics and Chords Intro"
            placeholder="Enter song's lyrics and chords intro"
            isRequired={true}
            error={errors.lwcIntro?.message}
            className="mb-12"
            size="md"
          />
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
            loadingText="Adding song..."
            disabled={isSubmitting}
          />
        </div>
      </Form>
    </>
  )
}
