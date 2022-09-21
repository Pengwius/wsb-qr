// import clientPromise from "../../lib/mongodb";
// import { withIronSessionApiRoute } from 'iron-session/next'
// import { sessionOptions } from 'lib/session'

// async function handler(req, res) {
//   const { method } = req

//   const user = req.session.user

//   if (!user || user.isLoggedIn === false) {
//     res.status(401).end()
//     return
//   }


// /* const client = await clientPromise;
//   const db = client.db("wsbqr");

//   const movies = await db
//     .collection("users")
//     .insertOne({ email: req.body["email"] });

//   const session = await getSession(req, res);
//   session.isLogged = true;
//   console.log(session.isLogged); */

//   res.status(200).json({ points: 0 });
// }

// export default withIronSessionApiRoute(handler, sessionOptions)
