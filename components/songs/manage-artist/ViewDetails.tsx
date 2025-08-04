import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { IconArrowLeft } from '@tabler/icons-react'
import Skeleton from '@/components/_sharable/skeletons/index'
import { artistGraph } from '@/lib/graphql/setup'
import Image from 'next/image'

export default function ViewDetails() {
  const router = useRouter()
  const { id } = router.query

  const { loading, error, data } = useQuery(
    artistGraph.queries.GET_ARTIST_BY_ID,
    {
      variables: { id },
      skip: !id,
    }
  )

  if (loading) return <Skeleton className="my-7" />
  if (error) return <div>Error fetching artist details: {error.message}</div>

  const artist = data?.artist

  if (!artist) {
    return <div className="my-7">No artist found for this ID.</div>
  }

  return (
    <div className={`rounded-lg py-4`}>
      <button
        onClick={() => router.push('/center/songs/manage-artists')}
        className="mb-4 flex items-center text-blue-500 hover:underline"
      >
        <IconArrowLeft size={16} className="mr-2" /> Back
      </button>

      {/* Artist Image */}
      <div className="mb-4">
        <Image
          src={artist?.image || ''} // Fallback image
          alt={artist?.name}
          width={200}
          height={200}
          className="size-200 rounded-lg object-cover"
        />
      </div>

      <h1 className="mb-2 text-2xl font-bold">{artist.name}</h1>
      <p className="mb-4">{artist.website}</p>
      <div className="flex flex-col space-y-2">
        {artist.youtube && (
          <a
            href={artist.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            YouTube
          </a>
        )}
        {artist.spotify && (
          <a
            href={artist.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Spotify
          </a>
        )}
        {artist.appleMusic && (
          <a
            href={artist.appleMusic}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Apple Music
          </a>
        )}
        {artist.youtubeMusic && (
          <a
            href={artist.youtubeMusic}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            YouTube Music
          </a>
        )}
      </div>
    </div>
  )
}
