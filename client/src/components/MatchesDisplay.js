import React, { useState, useEffect } from "react";
import "./matchedsDisplay.scss";

import { useNavigate } from "react-router-dom";
const MatchesDisplay = ({ matches, setClickedUser }) => {
  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const [requestWatingMsg, setRequestWatingMsg] = useState("");
  const [errors, setErrors] = useState("");
  const requested = true;

  const navigate = useNavigate();

  const getMatches = () => {
    fetch(`/matcheduser/${matches}`).then((r) => {
      if (r.ok) {
        r.json().then((user) => setMatchedProfiles(user));
      } else {
        r.json().then((err) => {
          console.log(err.error);
          setErrors(err.error);
        });
      }
    });
  };
  // console.log(matchedProfiles);
  useEffect(() => {
    if (matches !== 0) {
      getMatches();
    } else {
      console.log("No matches found");
      navigate("/chat");
    }
  }, [matches]);

  return (
    <div className="matches-display">
      <div
        className="match-card"
        onClick={() => {
          matchedProfiles?.matches !== 0 || null
            ? setClickedUser(matchedProfiles)
            : setRequestWatingMsg(
                "Wating for Anonymous user to respond to user chat request.."
              );
        }}
      >
        <em>{requestWatingMsg}</em>
        <div className="img-container">
          <img
            src={
              matches == 0 || matches == null
                ? matchedProfiles?.img
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            }
            // alt={matchedProfiles?first_name + " profile"}
          />
        </div>
        <h3>
          {matches == 0 || matches == null
            ? matchedProfiles?.first_name
            : "Anonymous"}
        </h3>
      </div>
    </div>
  );
};

export default MatchesDisplay;
