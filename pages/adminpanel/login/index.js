export function AdminPanelLogin() {
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      <div className="login">
        <h1>Login to admin panel</h1>
        <form action="/api/adminpanel-login" method="post">
          <input type="text" placeholder="Username" name="username" />
          <input type="password" placeholder="Password" name="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  )
}

export default AdminPanelLogin;
