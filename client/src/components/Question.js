import React from "react";
import "./question.scss";
const Question = () => {
  return (
    <div className="question">
      <form action="">
        <h2>Today's questions</h2>
        <p>Do you prefer pizza to wings?</p>
        <button>yes</button>
        <button>no</button>
        <br />
        <input type="text" />
        <button>submit</button>
      </form>
    </div>
  );
};

export default Question;
