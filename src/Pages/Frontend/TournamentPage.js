import { useEffect, useState , useRef } from 'react';
import { useParams } from 'react-router-dom';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { firestore } from 'Config/firebase';
import BallLoader from 'Components/OtherComponents/BallLoader';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import "../../../node_modules/react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import MatchBox from 'Components/OtherComponents/MatchBox';
import ResultModal from 'Components/OtherComponents/ResultModal';
import { Fireworks } from 'fireworks-js'



export default function TournamentPage() {
  // --------------------------- Tournament data ---------------------------
  const [tournament, setTournament] = useState({});

  // --------------------------- Navbar handling ---------------------------
  const [standing, setStanding] = useState(true);

  // --------------------------- Tournament Teams ---------------------------
  const [team, setTeam] = useState([]);

  // --------------------------- Tournament Matches ---------------------------
  const [matches, setMatches] = useState([]);

  // --------------------------- loading ---------------------------
  const [loading, setLoading] = useState(false);

  // --------------------------- Modal ---------------------------
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMatchId, setCurrentMatchId] = useState(null);

  const { id } = useParams();

  // --------------------------- Function to get tournaments ---------------------------
  const fetchData = async () => {
    setLoading(true);
    try {
      const docRef = doc(firestore, "tournaments", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setTournament(data);
        setTeam(data.team || []);
        setMatches(data.matches);
      } else {
        console.log("No such document!");
        setTournament(null);
        setTeam([]);
      }
    } catch (error) {
      console.error("Error fetching tournament:", error);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------- Function to Handle Standing / Matches ---------------------------
  const handleStanding = (e) => {
    e.preventDefault();
    setStanding(true);
  };

  const handleMatches = (e) => {
    e.preventDefault();
    setStanding(false);
  };

  // --------------------------- Function to Handle Result ---------------------------
  const handleResult = (matchId) => {
    setCurrentMatchId(matchId);
    console.log(matchId)
    setModalVisible(true);
  };


  // --------------------------- Function to Create and Check playoffs  ---------------------------

  const checkAndCreatePlayoffs = async (updatedMatches) => {
    // ✅ Check if all matches are completed and none has result "TBD"
    const allMatchesPlayed = updatedMatches.every(match =>
      match.result !== null &&
      match.result !== "TBD" &&
      !match.stage // only group matches, not semis or finals
    );

    if (allMatchesPlayed && !updatedMatches.some(m => m.stage === "Semi Final")) {
      // Sort teams by wins and NRR if needed
      const sortedTeams = [...team].sort((a, b) => {
        if (b.win !== a.win) return b.win - a.win;
        return b.runRate - a.runRate; // if wins same, check run rate
      });
      const top4 = sortedTeams.slice(0, 4);

      const semiFinals = [
        {
          matchId: `${top4[0].name}_vs_${top4[3].name}_semifinal1`,
          teamA: top4[0].name,
          teamB: top4[3].name,
          result: "TBD",
          stage: "Semi Final"
        },
        {
          matchId: `${top4[1].name}_vs_${top4[2].name}_semifinal2`,
          teamA: top4[1].name,
          teamB: top4[2].name,
          result: "TBD",
          stage: "Semi Final"
        }
      ];

      const updatedMatchesWithPlayoffs = [...updatedMatches, ...semiFinals];

      setMatches(updatedMatchesWithPlayoffs);

      await setDoc(doc(firestore, "tournaments", id), {
        ...tournament,
        matches: updatedMatchesWithPlayoffs,
        team
      });

      console.log("✅ Playoffs created successfully!");
    } else {
      console.log("❌ All matches are not yet completed. Playoffs not created.");
    }
  };

  // --------------------------- Function to Create and Check Final  ---------------------------

  const checkAndCreateFinal = async (updatedMatches) => {
    // Sirf semi-final matches nikaal lo
    const semiFinals = updatedMatches.filter(match => match.stage === "Semi Final");

    // Check agar 2 semi-finals hain aur dono ka result aa gaya hai
    const allSemiFinalsCompleted = semiFinals.length === 2 && semiFinals.every(match => match.result && match.result !== "TBD");

    if (allSemiFinalsCompleted && !updatedMatches.some(m => m.stage === "Final")) {
      // Winners nikaalo
      const winners = semiFinals.map(match => {
        const [teamAResult, teamBResult] = match.result.split(' wins');
        return teamAResult.trim(); // sirf team name lena hai
      });

      const finalMatch = {
        matchId: `${winners[0]}_vs_${winners[1]}_final`,
        teamA: winners[0],
        teamB: winners[1],
        result: "TBD",
        stage: "Final"
      };

      const updatedMatchesWithFinal = [...updatedMatches, finalMatch];

      setMatches(updatedMatchesWithFinal);

      // await setDoc(doc(firestore, "tournaments", id), {
      //   ...tournament,
      //   matches: updatedMatchesWithFinal,
      //   team
      // });

      console.log("🏆 Final match created successfully!");
    } else {
      console.log("❌ Semi finals not yet completed or final already exists.");
    }
  };




  // --------------------------- Function to Declare Winner ---------------------------


  const declareWin = async (matchId, winnerKey, scoreData) => {
    const { teamA, teamB } = scoreData;
  
    // Update matches
    const updatedMatches = matches.map((match) => {
      if (match.matchId === matchId) {
        return {
          ...match,
          result: winnerKey === "teamA" ? match.teamA + " wins" : match.teamB + " wins",
          score: {
            [match.teamA]: teamA,
            [match.teamB]: teamB
          }
        };
      }
      return match;
    });
  
    // Extract team names
    function extractTeamsFromMatchId(matchId) {
      if (matchId.includes('_vs_')) {
        let teams = matchId.split('_vs_');
        teams[1] = teams[1].replace(/_final|_semifinal\d*/g, '');
        return { teamAname: teams[0], teamBname: teams[1] };
      }
      return { teamAname: null, teamBname: null };
    }
  
    const { teamAname, teamBname } = extractTeamsFromMatchId(matchId);
  
    // Update teams
    const updatedTeams = team.map((t) => {
      if (t.name === teamAname || t.name === teamBname) {
        const isTeamA = t.name === teamAname;
        const nrr = isTeamA ? teamA.nrr : teamB.nrr;
  
        return {
          ...t,
          win: t.win + (winnerKey === (isTeamA ? "teamA" : "teamB") ? 1 : 0),
          lose: t.lose + (winnerKey !== (isTeamA ? "teamA" : "teamB") ? 1 : 0),
          runRate: parseFloat((parseFloat(t.runRate) + parseFloat(nrr ?? 0)).toFixed(3))
        };
        return t;
      }
    });
  
    // Local update first
    setMatches(updatedMatches);
    setTeam(updatedTeams);
  
    // ✅ Check if this was the FINAL match
    const isFinalMatch = matchId.includes("_final");
  
    if (isFinalMatch) {
      // Launch fireworks!
      const container = document.getElementById('matches-container');
      if (container) {
        fireworksRef.current = new Fireworks(container, {
          rocketsPoint: { min: 50, max: 50 },
          hue: { min: 0, max: 360 },
          delay: { min: 15, max: 30 },
          speed: 2,
          acceleration: 1.05,
          friction: 0.95,
          gravity: 1.5,
          particles: 50,
          trace: 3,
          explosion: 5,
        });
        fireworksRef.current.start();
  
        // Auto-stop after 5 seconds (optional)
        setTimeout(() => {
          if (fireworksRef.current) {
            fireworksRef.current.stop();
          }
        }, 5000);
      }
    }
  
    // Check playoffs & final (existing logic)
    checkAndCreatePlayoffs(updatedMatches);
    checkAndCreateFinal(updatedMatches);
  };



  // --------------------------- Function to Close Modal ---------------------------
  const closeModal = () => {
    setModalVisible(false);
    setCurrentMatchId(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fireworksRef = useRef(null);

  useEffect(() => {
    if (!standing) {
      const initFireworks = () => {
        const container = document.getElementById('matches-container');
        if (container && !fireworksRef.current) {
          fireworksRef.current = new Fireworks(container, {
            // options
          });
          fireworksRef.current.start();
        }
      };
  
      const timer = setTimeout(initFireworks, 1000); // 100ms delay
      return () => clearTimeout(timer);
    }
  
    return () => {
      if (fireworksRef.current) {
        fireworksRef.current.stop();
        fireworksRef.current = null;
      }
    };
  }, [standing]);
  

  return (
    <main>
      <h1 className="text-center my-5">{tournament.tournamentName}</h1>
      <div className="navbar-container">
        <div className="standing" onClick={handleStanding}>Standings</div>
        <div className="matches" onClick={handleMatches}>Matches</div>
      </div>

      {standing ? (
        <div className="standing-container" style={{ width: "90%", margin: "auto" }}>
          {loading ? (
            <BallLoader />
          ) : (
            <>
              <Table className="tournamentPage my-5">
                <Thead>
                  <Tr>
                    <Th>#</Th>
                    <Th>Name</Th>
                    <Th>Win</Th>
                    <Th>Lose</Th>
                    <Th>Run Rate</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {[...team]
                    .sort((a, b) => {
                      if (b.win !== a.win) return b.win - a.win;
                      return b.runRate - a.runRate;
                    })
                    .map((item, index) => (
                      <Tr key={index} style={{ fontSize: "15px" }}>
                        <Td>{index + 1}.</Td>
                        <Td>{item.name}</Td>
                        <Td>{item.win}</Td>
                        <Td>{item.lose}</Td>
                        <Td>{item.runRate}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </>
          )}
        </div>
      ) : (
        <div className="matches-container" id='matches-container'>
          <table className="table table-striped table-bordered">
            <tbody className="my-3">
              {matches.map((match, index) => (
                <MatchBox
                  key={index}
                  teamA={match.teamA}
                  teamB={match.teamB}
                  result={match.result}
                  matchId={match.matchId}
                  score={match.result != "TBD" ? match.score : null}
                  stage={match.stage}
                  handleClick={() => {
                    if (match.result == "TBD") handleResult(match.matchId);
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalVisible && (
        <ResultModal
          matchId={currentMatchId}
          closeModal={closeModal}
          declareWin={declareWin}
        />
      )}
    </main>
  );
}
