import React, { useState, useEffect } from "react";
import "./matchedsDisplay.scss";
const MatchesDisplay = ({ matches, setClickedUser }) => {
  const [matchedProfiles, setMatchedProfiles] = useState(null);

  const getMatches = () =>
    fetch(`/matcheduser/${matches}`).then((r) => {
      if (r.ok) {
        r.json().then((user) => setMatchedProfiles(user));
      }
    });

  useEffect(() => {
    getMatches();
  }, [matches]);

  return (
    <div className="matches-display">
      <div
        className="match-card"
        onClick={() => setClickedUser(matchedProfiles)}
      >
        <div className="img-container">
          <img
            src={matchedProfiles?.img}
            // alt={matchedProfiles?first_name + " profile"}
          />
        </div>
        <h3>{matchedProfiles?.first_name}</h3>
      </div>
    </div>
  );
};

export default MatchesDisplay;
