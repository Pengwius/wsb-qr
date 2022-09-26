import clientPromise from "../../lib/mongodb";
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'

async function handler(req, res) {
  const { method } = req

  const token = req.body.token
  const email = req.body.email

  const client = await clientPromise;
  const db = client.db("wsbqr");

  const user = await db
    .collection("users")
    .findOne({ email: email, token: token });

  if (user=== null) {
    res.status(400).end()
    return
  } else {
    const useGetPoints = await db
      .collection("users")
      .findOne({ email: req.body["email"] });

    const userSession = { isLoggedIn: true, email : req.body["email"], points: useGetPoints.points || 0 }
    req.session.user = userSession
    await req.session.save()
    res.redirect("/home")
  }
}

export default withIronSessionApiRoute(handler, sessionOptions)

