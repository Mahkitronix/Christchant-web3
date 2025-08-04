import { NextApiRequest, NextApiResponse } from 'next'
// import {CenterAuthService} from '@/utils/services/center-auth.service'

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // await CenterAuthService.clearToken()

      res.status(200).json({ message: 'Logout successful' })
    } catch {
      res.status(500).json({ message: 'Logout failed' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
