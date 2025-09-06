import React, { useEffect, useState } from 'react'
// --------------------------- firebase ---------------------------
import { getDocs, collection, query, where } from 'firebase/firestore'
import { firestore } from 'Config/firebase'
// --------------------------- Navigation ---------------------------
import { useNavigate } from 'react-router-dom'
// ---------------- About Image ----------------
import aboutImg from "../../Assets/about.png"
import Card from 'Components/OtherComponents/Card'
import BallLoader from 'Components/OtherComponents/BallLoader'

export default function Home() {



  const navigate = useNavigate();

  // --------------------------- Tournament data ---------------------------
  const [tournament, setTournament] = useState([]);

  // --------------------------- Loading State ---------------------------
  const [loading, setLoading] = useState(false);


  // --------------------------- Function to get tournaments ---------------------------


  const fetchData = async () => {
    setLoading(true)
    const querySnapshot = await getDocs(collection(firestore, "tournaments"));
    setTournament(querySnapshot.docs.map((doc) => doc.data()));
    setLoading(false)
  }


  useEffect(() => {
    fetchData()
  }, [])



  // --------------------------- Function to view Tournaments ---------------------------

  const handleView = () => {
    navigate('/dashboard/tournament')
  }


  return (
    <main>

      {/* ------------------------------ About ------------------------------ */}
      <section className="about my-5" id='about'>
        <div className="container-fluid">
          <div className="row">
            <h1 className='text-center'>
              What is Arena Hub
            </h1>
            <div className="col-12 col-md-6 px-0 p-md-5 d-flex align-items-center">
              <div className="para d-flex align-items-center">
                <p className='my-5 text-center' style={{ "fontSize": "25px" }}>
                  Arena Hub is your ultimate solution for managing sports tournaments with ease and efficiency. Whether you're organizing a school cricket match, or an e-sports championship, TournaTrack simplifies every step — from scorekeeping and team management to live rankings and real-time match updates. Built with modern technology and a user-friendly interface, our platform ensures a smooth experience for organizers, players, and fans alike. Say goodbye to manual spreadsheets and hello to smart tournament management.
                </p>
              </div>
              <svg></svg>
            </div>
            <div className="col-12 col-md-6 px-0 d-flex align-items-center justify-content-center">
              <img src={aboutImg} alt="" style={{ "width": "50%" }} />
            </div>
          </div>
        </div>
      </section>



      {/* ------------------------------ Tournaments ------------------------------ */}
      <section className="tournaments my-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col p-0 px-5">
              <h1 className='text-center'>
                Ongoing Tournaments
              </h1>
            </div>
          </div>
          <div className="row my-5" style={{ "display": "flex", "flexDirection": "column" }}>
            {
              loading
                ?
                <>
                  <BallLoader />
                </>
                :
                <>
                  {
                    tournament.length > 0
                      ?
                      tournament.map((item, index) => {
                        return (
                          <div className="col-12 col-md-6 col-lg-4 my-5" key={index}>
                            <Card status={item.status} name={item.tournamentName} mode={item.mode} number={item.team.length} />
                          </div>
                        )
                      })
                      :
                      <>
                      </>
                  }
                </>
            }
            <button className='viewBtn' onClick={handleView}>View More</button>
          </div>
        </div>
      </section>


    </main>
  )
}
