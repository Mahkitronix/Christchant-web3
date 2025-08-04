import { gql } from '@apollo/client'

const queries = {
  GET_ARTISTS: gql`
    query getArtists(
      $offset: Int!
      $limit: Int!
      $searchPattern: String!
      $sortBy: String
      $sortOrder: String
    ) {
      getArtists(
        offset: $offset
        limit: $limit
        searchPattern: $searchPattern
        sortBy: $sortBy
        sortOrder: $sortOrder
      ) {
        totalCount
        artists {
          id
          name
          image
          nameSlug
          website
          youtube
          youtubeMusic
          spotify
          appleMusic
          status
        }
      }
    }
  `,
  GET_ARTIST_BY_ID: gql`
    query GetArtistDetails($id: ID!) {
      artist(id: $id) {
        id
        name
        nameSlug
        website
        youtube
        youtubeMusic
        spotify
        appleMusic
        status
        image
      }
    }
  `,
}

const mutations = {}

const ArtistGraph = {
  queries,
  mutations,
}

export default ArtistGraph
