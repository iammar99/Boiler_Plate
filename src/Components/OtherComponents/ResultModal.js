import React, { useState, useEffect } from "react";

const ResultModal = ({ matchId, closeModal, declareWin }) => {
  const [teamAData, setTeamAData] = useState({ score: "", wickets: "", overs: "", nrr: "" });
  const [teamBData, setTeamBData] = useState({ score: "", wickets: "", overs: "", nrr: "" });


  const convertOversToDecimal = (overs) => {
    if (!overs || overs === "") return 0;

    const oversNum = parseFloat(overs);
    const fullOvers = Math.floor(oversNum);
    const balls = (oversNum - fullOvers) * 10;

    return fullOvers + (balls / 6);
  };


  const calculateNRR = (runsScored, oversFaced, runsConceded, oversBowled) => {
    if (!oversFaced || !oversBowled || oversFaced === 0 || oversBowled === 0) return 0;

    const ownRunRate = runsScored / convertOversToDecimal(oversFaced);
    const oppositionRunRate = runsConceded / convertOversToDecimal(oversBowled);

    return parseFloat((ownRunRate - oppositionRunRate).toFixed(3));
  };


  useEffect(() => {
    if (
      teamAData.score !== "" &&
      teamAData.overs !== "" &&
      teamBData.score !== "" &&
      teamBData.overs !== ""
    ) {

      const teamANRR = calculateNRR(
        parseFloat(teamAData.score),
        teamAData.overs,
        parseFloat(teamBData.score),
        teamBData.overs
      );

      // Calculate Team B's NRR
      const teamBNRR = calculateNRR(
        parseFloat(teamBData.score),
        teamBData.overs,
        parseFloat(teamAData.score),
        teamAData.overs
      );

      // Update state with calculated NRR values
      setTeamAData(prev => ({ ...prev, nrr: teamANRR.toString() }));
      setTeamBData(prev => ({ ...prev, nrr: teamBNRR.toString() }));
    }
  }, [teamAData.score, teamAData.overs, teamBData.score, teamBData.overs]);

  const handleWin = (winner) => {
    console.log(winner)
    declareWin(matchId, winner, {
      teamA: teamAData,
      teamB: teamBData
    });
    closeModal();
  };

  function extractTeamsFromMatchId(matchId) {
    if (matchId.includes('_vs_')) {
      let teams = matchId.split('_vs_');
      teams[1] = teams[1].replace(/_final|_semifinal\d*/g, '');
  
      return { teamA: teams[0], teamB: teams[1] };
    }
    return { teamA: null, teamB: null };
  }
  

  const { teamA, teamB } = extractTeamsFromMatchId(matchId);

  const isDataValid =
    teamAData.score !== "" &&
    teamAData.wickets !== "" &&
    teamAData.overs !== "" &&
    teamBData.score !== "" &&
    teamBData.wickets !== "" &&
    teamBData.overs !== "";

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="my-4">Declare the Winner</h2>
        <div className="d-flex justify-content-evenly">
          <div className="teamA">
            <h3 className="text-center">{teamA}</h3>
            <div className="score">
              <div className="d-flex justify-content-evenly" style={{ "width": "100%" }}>
                {/* ---------------- Score / Wickets ----------------  */}
                <div className="d-flex flex-column align-items-center">
                  <input
                    type="number"
                    name="teamA-Score"
                    className="score"
                    value={teamAData.score}
                    onChange={(e) =>
                      setTeamAData({ ...teamAData, score: e.target.value })
                    }
                  />
                  <label>Score</label>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <input
                    type="number"
                    name="teamA-Wickets"
                    className="wickets"
                    value={teamAData.wickets}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 10)) {
                        setTeamAData({ ...teamAData, wickets: value });
                      }
                    }}
                  />
                  <label>Wickets</label>
                </div>
              </div>
              {/* ---------------- Overs for Team A ----------------  */}
              <div className="d-flex flex-column align-items-center">
                <input
                  type="number"
                  name="teamA-overs"
                  className="overs"
                  step="0.1"
                  min="0"
                  value={teamAData.overs}
                  onChange={(e) => {
                    const value = e.target.value;
                    setTeamAData({ ...teamAData, overs: value });
                  }}
                />
                <label>Overs</label>
              </div>
              {/* ---------------- NRR Display ----------------  */}
              {teamAData.nrr && teamAData.nrr !== "0" && (
                <div className="mt-2 text-center">
                  <span className="badge bg-info">NRR: {parseFloat(teamAData.nrr) > 0 ? '+' : ''}{teamAData.nrr}</span>
                </div>
              )}
            </div>
            <button onClick={() => {
              if (parseFloat(teamAData.score) > parseFloat(teamBData.score)) {
                handleWin("teamA")
              }
            }} disabled={!isDataValid}>
              {teamA} Wins
            </button>
          </div>

          <div className="teamB">
            <h3 className="text-center">{teamB}</h3>
            <div className="score">
              {/* ---------------- Score / Wickets ----------------  */}
              <div className="d-flex justify-content-evenly" style={{ "width": "100%" }}>
                <div className="d-flex flex-column align-items-center">
                  <input
                    type="number"
                    name="teamB-Score"
                    className="score"
                    value={teamBData.score}
                    onChange={(e) =>
                      setTeamBData({ ...teamBData, score: e.target.value })
                    }
                  />
                  <label>Score</label>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <input
                    type="number"
                    name="teamB-Wickets"
                    className="wickets"
                    value={teamBData.wickets}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 10)) {
                        setTeamBData({ ...teamBData, wickets: value });
                      }
                    }}
                  />
                  <label>Wickets</label>
                </div>
              </div>
              {/* ---------------- Overs for Team B ----------------  */}
              <div className="d-flex flex-column align-items-center">
                <input
                  type="number"
                  name="teamB-overs"
                  className="overs"
                  step="0.1"
                  min="0"
                  value={teamBData.overs}
                  onChange={(e) => {
                    const value = e.target.value;
                    setTeamBData({ ...teamBData, overs: value });
                  }}
                />
                <label>Overs</label>
              </div>
              {/* ---------------- NRR Display ----------------  */}
              {teamBData.nrr && teamBData.nrr !== "0" && (
                <div className="mt-2 text-center">
                  <span className="badge bg-info">NRR: {parseFloat(teamBData.nrr) > 0 ? '+' : ''}{teamBData.nrr}</span>
                </div>
              )}
            </div>
            <button onClick={() => {
              if (parseFloat(teamBData.score) > parseFloat(teamAData.score)) {
                handleWin("teamB")
              }
            }} disabled={!isDataValid}>
              {teamB} Wins
            </button>
          </div>
        </div>
        <button className="mt-3" onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

export default ResultModal;