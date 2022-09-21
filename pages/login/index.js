import Navbar from '../navbar';

export function Login() {

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      <Navbar />
      <div className="login">
        <h1>Login</h1>
        <form action="/api/login" method="post">
          <input type="email" placeholder="Email" name="email" />
          <input type="number" placeholder="Age" name="age" />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  )
}

export default Login;
