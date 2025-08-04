import { ApolloClient, InMemoryCache } from '@apollo/client'

export const createApolloClient = () => {
  return new ApolloClient({
    uri: 'http://localhost:3000/api/_',
    cache: new InMemoryCache(),
  })
}

export default createApolloClient
