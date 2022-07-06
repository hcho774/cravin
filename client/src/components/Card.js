import React, { useState } from "react";
import "./card.scss";
const Card = ({ test }) => {
  return (
    <div className="card">
      <div className="left">
        <span className="title">test</span>
        <span className="counter">test</span>
        <span className="link">test</span>
      </div>

      <div className="right">
        <div className="percentage positive">
          {/* <KeyboardArrowUpIcon />
          {diff} % */}
        </div>
        Test
      </div>
    </div>
  );
};

export default Card;
