import Navbar from '../navbar'
import useUser from 'lib/useUser'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { User } from 'pages/api/user'

export default function Home({user}) {
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      <Navbar />
      <div className="home">
        <h1>Your points: {user.points}</h1>
      </div>
    </>
  )
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user

  if (user === undefined) {
    res.setHeader('location', '/login')
    res.statusCode = 302
    res.end()
    return {
      props: {
        user: { isLoggedIn: false, email: '', points: 0 },
      },
    }
  }

  return {
    props: { user: req.session.user },
  }
},
sessionOptions)
