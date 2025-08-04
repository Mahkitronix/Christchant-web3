import { ApolloServer } from 'apollo-server-micro'
import { typeDefs } from '@/lib/graphql/schema'
import { NextApiRequest, NextApiResponse } from 'next'
import resolvers from '@/lib/graphql/resolvers'
import Cors from 'cors'

const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
  origin: process.env.NEXT_PUBLIC_MOBILE_URL,
})

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (
    req: NextApiRequest,
    res: NextApiResponse,
    callback: (result: any) => void
  ) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        reject(result)
      } else {
        resolve(result)
      }
    })
  })
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
})

let apolloServerHandler: InstanceType<typeof apolloServer>['createHandler']

async function getApolloServerHandler() {
  if (!apolloServerHandler) {
    await apolloServer.start()
    apolloServerHandler = apolloServer.createHandler({ path: '/api/_' })
  }
  return apolloServerHandler
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors)

  try {
    const apolloHandler = await getApolloServerHandler()
    apolloHandler(req, res)
  } catch (error) {
    console.error('Error processing request:', error)
    if (!res.headersSent) {
      res.statusCode = 500
      res.end('Internal Server Error')
    }
  }
}
