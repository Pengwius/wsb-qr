import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'
import { NextApiRequest, NextApiResponse } from 'next'

export type User = {
  isLoggedIn: boolean
  email: string
  points: number
}

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
      isLoggedIn: true,
      email: '',
      points: 100,
    })
  } else {
    res.json({
      isLoggedIn: false,
      email: '',
      points: 0
    })
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions)