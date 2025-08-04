import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    userType: String
  }

  type Artist {
    id: ID
    name: String
    nameSlug: String
    website: String
    youtube: String
    youtubeMusic: String
    spotify: String
    appleMusic: String
    status: String
    image: String
  }

  type ArtistResponse {
    totalCount: Int
    artists: [Artist]
  }

  type Query {
    users(userType: String): [User]
    user(id: ID): User
    getArtists(
      offset: Int
      limit: Int
      searchPattern: String
      sortBy: String
      sortOrder: String
    ): ArtistResponse
    artist(id: ID!): Artist
  }

  type Mutation {
    addArtist(name: String!): Artist
    updateArtist(id: ID!, name: String!): Artist
    deleteArtist(id: ID!): Artist
  }
`
