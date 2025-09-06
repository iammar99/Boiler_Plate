import React from 'react'
import { Link } from 'react-router-dom'


export default function Forgot() {
  return (
    <main className='auth-pages'>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <form className="forgot-form">
              <>
                <h1 className="form-heading" style={{ "fontSize": "50px" }}>
                  Forgot Password
                </h1>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    autoComplete='off'
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="butns">
                  <button type="submit" className="btn">
                    Submit
                  </button>
                  <div className="links">
                    <Link to={"/auth/register"}>Not a User</Link>
                  </div>
                </div>
              </>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
