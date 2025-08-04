import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

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
        return reject(result)
      }
      return resolve(result)
    })
  })
}

// Initialize the cors middleware
const cors = Cors({
  methods: ['POST', 'PUT', 'DELETE', 'OPTIONS'],
  origin: 'http://localhost:3000',
  credentials: true,
})

export async function corsMiddleware(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors)
}

export default function withCors(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Content-Type, Authorization'
        )
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        res.status(200).json({ message: 'OK' })
        return
      }
      if (
        req.method !== 'POST' &&
        req.method !== 'PUT' &&
        req.method !== 'DELETE'
      ) {
        return res.status(405).json({ message: 'Method not allowed' })
      }

      await corsMiddleware(req, res)
      return handler(req, res)
    } catch (error) {
      console.error('CORS Error:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}
