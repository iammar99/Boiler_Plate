import React from "react";
import { Link } from "react-router-dom";
// --------------------- Logo image ---------------------
import logo from "../../Assets/logo.png"
import { useAuthContext } from "Context/AuthContext";
// --------------------- Message ---------------------
import { message } from "antd";





export default function TopNav() {

  const { user, setUser, isAuth, setIsAuth } = useAuthContext()

  // ------------------- Logout -------------------
  const handleLogout = (e) => {
    e.preventDefault()
    setIsAuth(false)
    setUser({})
    localStorage.removeItem("User")
    localStorage.setItem("Token", "false")
    message.success('logged Out successful')
  }

  return (
    <>
      <header>
        <div className="container-fluid">
          <div className="row">
            <div className="col p-0">
              <div className="nav d-flex justify-content-between align-items-center">
                <img src={logo} alt="" />
                <div className="links-container d-none d-md-flex justify-content-between align-items-center me-3">
                  <Link className="mx-2" to={"/"}>Home</Link>
                  <Link className="mx-2" to={"/dashboard/tournament"}>Tournaments</Link>
                  {
                    isAuth
                      ?
                      <>
                      
                        <button className="Btn" onClick={handleLogout}>
                          <div className="sign">
                            <svg viewBox="0 0 512 512">
                              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                            </svg>
                          </div>
                          <div className="text">Logout</div>
                        </button>
                      </>
                      :
                      <button className="login">
                        <Link className="mx-2 " to={"/auth"}>Login</Link>
                      </button>
                  }
                </div>
                <div className="responsive me-3 d-block d-md-none">
                  <label className="event-wrapper">
                    <input type="checkbox" defaultChecked="false" className="event-wrapper-inp" />
                    <div className="bar">
                      <span className="top bar-list" />
                      <span className="middle bar-list" />
                      <span className="bottom bar-list" />
                    </div>
                    <section className="menu-container">
                      <div className="menu-list">
                        <Link to={"/"}>Home</Link>
                      </div>
                      <div className="menu-list">
                        <Link to={"/dashboard/tournament"}>Tournaments</Link>
                      </div>
                      <div style={{ color: "crimson" }} className="menu-list">
                        {
                          isAuth
                            ?
                            <Link className="text-danger" >Logout</Link>
                            :
                            <Link className="text-success" to={"/auth"}>Login</Link>
                        }
                      </div>
                    </section>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

      </header>
    </>
  )
}
