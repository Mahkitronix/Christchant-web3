import { ApolloClient, InMemoryCache } from '@apollo/client'

export const createApolloClient = () => {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/api/_',
    cache: new InMemoryCache(),
  })
}

export default createApolloClient
