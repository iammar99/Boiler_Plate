import React, { useEffect, useState } from 'react'
import { message } from 'antd'
// --------------------------- firebase ---------------------------
import { setDoc, doc, getDocs, collection, query, where, deleteDoc } from 'firebase/firestore'
import { firestore } from 'Config/firebase'
// --------------------------- Navigation ---------------------------
import { useNavigate } from 'react-router-dom'
// --------------------------- Responsive table ---------------------------
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import "../../../node_modules/react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
// --------------------------- no Tournament animation ---------------------------
import NoTournament from 'Components/OtherComponents/NoTournament'
import BallLoader from 'Components/OtherComponents/BallLoader'

export default function Tournaments() {


    const navigate = useNavigate();

    // --------------------------- Tournament data ---------------------------
    const [tournament, setTournament] = useState([]);


    // --------------------------- Loading state ---------------------------
    const [loading, setLoading] = useState(false);

    // --------------------------- Function to get tournaments ---------------------------


    const fetchData = async () => {
        setLoading(true)
        const citiesRef = collection(firestore, "tournaments");

        const user = JSON.parse(localStorage.getItem("User"))
        const q = query(citiesRef, where("createrId", "==", user.id));
        const querySnapshot = await getDocs(q);
        setTournament(querySnapshot.docs.map((doc) => doc.data()));
        setLoading(false)
    }


    useEffect(() => {
        fetchData()
    }, [])


    // --------------------------- Function to delete Tournament ---------------------------


    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(firestore, "tournaments", id));
            const updated = tournament.filter((tournament) => tournament.id !== id);
            setTournament(updated)
            message.success("Tournament deleted successfully");

        } catch (error) {
            console.log(error)
        }
    }



    // --------------------------- Function to view Tournament creation ---------------------------

    const handleAdd = () => {
        navigate("/dashboard/create")
    }

    // --------------------------- Function to View Tournament ---------------------------


    const handleView = async (id) => {
        const Selectedtournament = tournament.find((tournament) => tournament.id === id);
        navigate(`/tournament/${Selectedtournament.id}`, { state: { Selectedtournament } });
    }





    return (
        <main>
            <h1 className="text-center my-4 fw-bold">
                Tournaments
            </h1>
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
                                <>
                                    <Table className='tournaments'>
                                        <Thead>
                                            <Tr>
                                                <Th>Tournament Name</Th>
                                                <Th>Tournament Teams</Th>
                                                <Th>Tournament Mode</Th>
                                                <Th>Tournament Status</Th>
                                                <Th>Tournament Controls</Th>
                                            </Tr>
                                        </Thead>
                                        {
                                            tournament.map((tournament, index) => {
                                                return (
                                                    <Tbody key={index} className='my-4'>
                                                        <Tr>
                                                            <Td>{tournament.tournamentName}</Td>
                                                            <Td>{tournament.team.length}</Td>
                                                            <Td>{tournament.mode}</Td>
                                                            <Td>{tournament.status}</Td>
                                                            <Td>
                                                                {/* ---------------- Delete -------------------- */}
                                                                <div className="download-view-container">
                                                                    <a className="delete-btn" onClick={() => { handleDelete(tournament.id) }}>Remove</a>
                                                                    <a className="view-btn" onClick={() => { handleView(tournament.id) }}>View</a>
                                                                </div>



                                                            </Td>
                                                        </Tr>
                                                    </Tbody>
                                                )
                                            })
                                        }
                                    </Table>
                                </>
                                :
                                <>
                                    <NoTournament />
                                </>
                        }
                    </>
            }
            <button className='viewBtn d-block mx-auto my-4' onClick={handleAdd}>
                Add Tournament
            </button>
        </main>
    )
}
