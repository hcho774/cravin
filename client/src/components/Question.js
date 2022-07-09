import React, { useState } from "react";
import "./question.scss";

const form = {
  user_id: 0,
  questions_id: 0,
  answer: null,
  pitch: "",
};
const Question = ({ question, user, setAnswers, answers }) => {
  const { id, questions } = question;
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState("");
  const [formData, setFormData] = useState({
    user_id: user.id,
    question_id: id,
    answer: null,
    pitch: "",
  });

  console.log(question);

  function handleChange(e) {
    console.log(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  console.log(id);

  console.log(formData);

  function handleSubmit(e) {
    console.log(e);
    e.preventDefault();
    fetch(`/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((answer) => {
          setAnswers([...answers, answer]);
          setSuccess(true);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div className="question">
      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">Today's question</h1>
        <p class="lead">{questions}</p>

        <form action="" onSubmit={handleSubmit}>
          <input
            type="radio"
            class="btn-check"
            name="answer"
            id="option1"
            value="true"
            autocomplete="off"
            onChange={handleChange}
            // disabled={checked ? "yes" : ""}
          />
          <label class="btn btn-secondary" for="option1">
            Yes
          </label>

          <input
            type="radio"
            class="btn-check"
            name="answer"
            id="option2"
            value="false"
            autocomplete="off"
            onChange={handleChange}
          />
          <label class="btn btn-secondary" for="option2">
            No
          </label>
          <div class="input-group w-50 mt-3 mb-3 ">
            <input
              type="text"
              class="form-control"
              placeholder="Pitch your thoughts to the world!"
              aria-label="Pitch your thoughts to the world!"
              aria-describedby="button-addon2"
              name="pitch"
              onChange={handleChange}
            />
            <button
              class="btn btn-outline-secondary"
              type="submit"
              id="button-addon2"
            >
              Button
            </button>
          </div>
          {/* <label>
            <input
              type="radio"
              value="true"
              name="answer"
              onChange={handleChange}

              // disabled={checked ? "yes" : ""}
            />
            yes
          </label>
          <label>
            <input
              type="radio"
              value="false"
              name="answer"
              onChange={handleChange}
              // disabled={checked ? "" : "no"}
            />
            no
          </label> */}
          <br />

          {/* <input type="text" name="pitch" onChange={handleChange} />
          <button type="button" class="btn btn-outline-dark">
            Submit
          </button> */}
        </form>
        <em>{errors}</em>
      </div>
    </div>
  );
};

export default Question;
