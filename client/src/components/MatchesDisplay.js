import React, { useState, useEffect } from "react";
import "./matchedsDisplay.scss";

const MatchesDisplay = ({
  matches,
  setClickedUser,
  matchedProfiles,
  setRequestWatingMsg,
  requestWatingMsg,
}) => {
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
