import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

export default function AdminPanel({userAdmin}) {

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      <div>
        <form action="/api/adminpanel/generate-qr" method="post">
          <input type="number" placeholder="Liczba kodów" name="qr-amount" />
          <button type="submit">Generuj</button>
        </form>
      </div>
      <div>
        <h1>Lista kodów</h1>
        {userAdmin.qrcodes.map((qr) => (
          <div>
            <QRCode
            size={2048}
            style={{ height: "auto", maxWidth: "100%", width: "100%", paddingBottom: "-1000000px" }}
            value={"http://localhost:3000/api/scan-qr/?id=" + qr._id + "?token=" + qr.token}
            viewBox={`0 0 8192 8192`}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const userAdmin = req.session.userAdmin

  if (userAdmin === undefined) {
    res.setHeader('location', '/adminpanel/login')
    res.statusCode = 302
    res.end()
    return {
      props: {
        userAdmin: { isLoggedIn: false, qrcodes: [] },
      },
    }
  }

  return {
    props: { userAdmin: req.session.userAdmin },
  }
},
sessionOptions)