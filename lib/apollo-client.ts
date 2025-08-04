import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { encrypt, decrypt } from '@/utils/encipher'

const httpLink = new HttpLink({
  uri: '/api/_',
  fetchOptions: {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  },
})

const client = new ApolloClient({
  uri: '/api/_',
  cache: new InMemoryCache(),
  link: httpLink,
})

const originalWriteQuery = client.cache.writeQuery.bind(client.cache)
const originalReadQuery = client.cache.readQuery.bind(client.cache)

client.cache.writeQuery = (options) => {
  const encryptedData = encrypt(JSON.stringify(options.data))
  return originalWriteQuery({
    ...options,
    data: JSON.parse(decrypt(encryptedData)),
  })
}
// 'sharable'

client.cache.readQuery = (options) => {
  const data = originalReadQuery(options)
  return JSON.parse(decrypt(JSON.stringify(data)))
}

export default client
