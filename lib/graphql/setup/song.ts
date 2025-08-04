import { gql } from '@apollo/client'

const queries = {
  GET_SONGS: gql`
    query getSongs(
      $offset: Int!
      $limit: Int!
      $searchPattern: String!
      $sortBy: String
      $sortOrder: String
    ) {
      getSongs(
        offset: $offset
        limit: $limit
        searchPattern: $searchPattern
        sortBy: $sortBy
        sortOrder: $sortOrder
      ) {
        totalCount
        songs {
          id
          title
          titleSlug
          lwc
          lwcIntro
          status
        }
      }
    }
  `,
  GET_SONG_BY_ID: gql`
    query GetSongDetails($id: ID!) {
      song(id: $id) {
        id
        title
        titleSlug
        lwc
        lwcIntro
        status
      }
    }
  `,
}

const mutations = {}

const SongGraph = {
  queries,
  mutations,
}

export default SongGraph
