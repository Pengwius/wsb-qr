import clientPromise from "../../lib/mongodb";
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'

async function handler(req, res) {
  const { method } = req

  const user = req.session.user

  if (!user || user.isLoggedIn === false) {
    res.status(401).end()
    return
  }

  const id = req.body._id
  const token = req.body.token

  const client = await clientPromise;
  const db = client.db("wsbqr");

  const qrcode = await db
    .collection("qr-codes")
    .findOne({ _id: id, token: token });

  if (qrcode === null) {
    res.status(400).end()
    return
  }


  const userDb = await db
    .collection("users")
    .findOne({ email: user.email });

  const usedQrCodes = userDb.usedQrCodes

  if (usedQrCodes.includes(id)) {
    res.status(400).end()
    return
  }

  const points = userDb.points + 1
  req.session.user.points += 1

  await db
    .collection("users")
    .updateOne({ email: user.email }, { $set: { points: points } });

  req.session.save()
  res.redirect("/home")
}

export default withIronSessionApiRoute(handler, sessionOptions)
