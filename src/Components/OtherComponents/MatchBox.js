// MatchBox.js
import React from "react";

const MatchBox = ({ teamA, teamB, result, handleClick, matchId, stage,  score }) => {

  const teamAScore = result !== "TBD" && score && score[teamA] ? score[teamA] : null;
  const teamBScore = result !== "TBD" && score && score[teamB] ? score[teamB] : null;


  return (
    <>
      <div className="match-box mx-4" onClick={handleClick}>
        <div className="match">
          <div className="team">
            {/* <img src={teamA.logo} alt={teamA.name} className="team-logo" /> */}
            <span className="team-name">{teamA}</span>
            {result !== "TBD" && teamAScore ?
              <span className="team-score"> {teamAScore.score}/{teamAScore.wickets}</span>
              : ""
            }
          </div>
          <span className="vs-text">vs</span>
          <div className="team">
            {/* <img src={teamB.logo} alt={teamB.name} className="team-logo" /> */}
            <span className="team-name">{teamB}</span>
            {result !== "TBD" && teamBScore ?
              <span className="team-score"> {teamBScore.score}/{teamBScore.wickets}</span>
              : ""
            }
          </div>
        </div>
        <div className="stage p-0 text-start">
          {
            stage
            ?
            stage
            :
            "Group Stage"

          }
        </div>
        <div className="result m-0">
          {result}
        </div>
      </div>
    </>
  );
};

export default MatchBox;