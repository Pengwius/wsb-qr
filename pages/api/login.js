/*
import { Octokit } from 'octokit'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { User } from '../../user'


export default async function handler(
  req, res) {
  const { method } = req

  const db = client.db("wsbqr");

  const user = await db
    .collection("users")
    .insertOne({ email: req.body["email"] });

  res.redirect("/home");
} */

import { User } from './user'
import clientPromise from "../../lib/mongodb";
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
const randtoken = require('rand-token');

async function loginRoute(req, res) {
  const client = await clientPromise;
  const db = client.db("wsbqr");

  const user = await db
    .collection("users")
    .findOne({ email: req.body["email"] });

  if (user === null) {
    await db
      .collection("users")
      .insertOne({ email: req.body["email"], age: req.body["age"], points: 0});

    const token = randtoken.generate(40);
    await db
      .collection("users")
      .updateOne({ email: req.body["email"] }, { $set: { token: token } });

    console.log("http://localhost:3000/api/loginToken?email=" + req.body["email"] + "?token=" + token);

    res.redirect("/check-email")
  } else {
    if(user.age !== req.body["age"]) {
      res.redirect("/")
      return
    }

    const token = randtoken.generate(40);
    await db
      .collection("users")
      .updateOne({ email: req.body["email"] }, { $set: { token: token } });
    
    console.log("http://localhost:3000/api/loginToken?email=" + req.body["email"] + "?token=" + token);

    res.redirect("/check-email")

    // const useGetPoints = await db
    //   .collection("users")
    //   .findOne({ email: req.body["email"] });

    // const userSession = { isLoggedIn: true, email : req.body["email"], points: useGetPoints.points }
    // req.session.user = userSession
    // await req.session.save()
    // res.redirect("/home")
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)
