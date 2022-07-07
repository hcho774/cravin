import React, { useState } from "react";
import "./card.scss";
const Card = ({ answer }) => {
  const { id, pitch, user_id } = answer;

  return (
    <div className="card">
      <div className="left">
        <span className="title">{user_id}</span>
        <span className="link">{pitch}</span>
        <button>page</button>
        {/* <span className="link">13</span> */}
      </div>

      <div className="right">
        <div className="percentage positive">
          {/* <KeyboardArrowUpIcon />
          {diff} % */}
        </div>
        {/* Test */}
      </div>
    </div>
  );
};

export default Card;
