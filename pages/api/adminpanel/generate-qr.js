import clientPromise from "../../../lib/mongodb";
const randtoken = require('rand-token');

export default async function handler(
  req, res) {
  const { method } = req

  const client = await clientPromise;
  const db = client.db("wsbqr");

  const amount = req.body["qr-amount"];

  for (let i = 0; i < amount; i++) {
    let token = randtoken.generate(25);
    console.log(token);
    const qrcode = await db
      .collection("qr-codes")
      .insertOne({ token: token });
  }

  res.status(200).json({ message: "Success" });
}
