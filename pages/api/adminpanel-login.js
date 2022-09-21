import clientPromise from "../../lib/mongodb";
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'

export async function handler(
  req, res) {

  if (req.body["username"] == process.env.ADMIN_LOGIN && req.body["password"] == process.env.ADMIN_PASSWORD) {
    const client = await clientPromise;
    const db = client.db("wsbqr");

    const qrcodes = await db
      .collection("qr-codes")
      .find({})
      .toArray();

    console.log(qrcodes)

    const userSession = { isLoggedIn: true, qrcodes: qrcodes }
    req.session.userAdmin = userSession
    await req.session.save()
    res.redirect("/adminpanel");
  } else {
    res.redirect("/adminpanel/login");
  }
}

export default withIronSessionApiRoute(handler, sessionOptions)
