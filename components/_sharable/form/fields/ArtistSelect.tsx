import { useQuery } from '@apollo/client'
import { artistGraph } from '@/lib/graphql/setup'
import { isEmpty, debounce } from 'lodash'
import FormWrapper from '../FormWrapper'
import { useState, useCallback } from 'react'

export default function ArtistSelect({ size, error, label, register }: any) {
  const { data: artistData, refetch } = useQuery(
    artistGraph.queries.GET_ARTISTS,
    {
      variables: {
        offset: 0,
        limit: 10,
        searchPattern: '%%',
        sortBy: 'name',
        sortOrder: 'ASC',
      },
    }
  )

  const artists = !isEmpty(artistData?.getArtists?.artists)
    ? artistData?.getArtists?.artists.map((artist: any) => ({
        value: artist.id,
        label: artist.name,
      }))
    : []

  const [searchQuery, setSearchQuery] = useState('')
  const [isListVisible, setIsListVisible] = useState(false)

  // Debounce the refetch function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedRefetch = useCallback(
    debounce((searchPattern) => {
      refetch({
        offset: 0,
        limit: 10,
        searchPattern: `%${searchPattern}%`,
        sortBy: 'name',
        sortOrder: 'ASC',
      })
    }, 300),
    []
  )

  // Update search query and trigger refetch
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    debouncedRefetch(query)
    setIsListVisible(true)
  }

  // Handle selection from the list
  const handleArtistSelect = (label: string) => {
    setSearchQuery(label)
    setIsListVisible(false)
  }

  const filteredArtists = artists.filter((artist: any) =>
    artist.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sizeClasses = {
    sm: 'p-1 text-sm',
    md: 'p-2 text-base',
    lg: 'p-3 text-lg',
  } as any

  return (
    <FormWrapper label={<div className="flex items-center">{label}</div>}>
      <div>
        <select
          className={`block w-full appearance-none rounded-md border transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${sizeClasses[size]} ${error ? 'border-red-500' : 'border-gray-300'} bg-white`}
          {...register('artistId')}
          id={'artistId'}
          name={'artistId'}
          onClick={() => setIsListVisible(true)}
        >
          {filteredArtists.map((option: any) => (
            <>
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            </>
          ))}
        </select>
        {!isListVisible && (
          <input
            type="text"
            placeholder="Search artists..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsListVisible(true)}
            className={`block w-full rounded-md border transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${sizeClasses[size]} ${error ? 'border-red-500' : 'border-gray-300'}`}
          />
        )}
        <div className="relative">
          {isListVisible && (
            <>
              <input
                type="text"
                placeholder="Search artists..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={`block w-full rounded-md border transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${sizeClasses[size]} ${error ? 'border-red-500' : 'border-gray-300'}`}
              />
              <ul className="absolute z-10 max-h-60 w-full overflow-y-auto rounded-md border bg-white shadow-lg">
                {filteredArtists.map((option: any) => (
                  <li
                    key={option.value}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                    onClick={() => handleArtistSelect(option.label)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </FormWrapper>
  )
}
