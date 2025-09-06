import React from 'react'
import { Link } from 'react-router-dom'

export default function LowerFooter() {

  const year = new Date().getFullYear()
  return (
   <footer>
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col p-0">
          <p className='text-center my-auto'>&copy; {year} | All rights reserved by <Link target='blank' to={"https://ch-ammar.vercel.app/"}>Ammar</Link></p>
        </div>
      </div>
    </div>
   </footer>
  )
}
