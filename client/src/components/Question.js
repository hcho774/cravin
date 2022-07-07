import React, { useState } from "react";
import "./question.scss";

const form = {
  user_id: 0,
  questions_id: 0,
  answer: null,
  pitch: "",
};
const Question = ({ question }) => {
  const { questions } = question;

  const [checked, setChecked] = useState(false);
  function handleChange(e) {
    setChecked(!checked);
    console.log(e.target.value);
  }

  return (
    <div className="question">
      <form action="">
        <h2>Today's questions</h2>
        <p>{questions}</p>
        <label>
          <input type="checkbox" value="true" onChange={handleChange} />
          yes
        </label>
        <label>
          <input type="checkbox" value="false" onChange={handleChange} />
          no
        </label>

        <br />
        <input type="text" onChange={handleChange} />
        <button>submit</button>
      </form>
    </div>
  );
};

export default Question;
