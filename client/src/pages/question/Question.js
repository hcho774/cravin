import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import "./question.scss";

const Question = ({
  q,
  user,
  setUser,
  navigate,
  setAnswers,
  answers,
  getQuestion,
}) => {
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState("");

  const form = {
    user_id: user.id,
    questions_id: q.id,
    answer: null,
    pitch: "Pitch your thoughts to the world!",
  };

  const [formData, setFormData] = useState({
    user_id: user.id,
    question_id: q.id,
    answer: null,
    pitch: "Pitch your thoughts to the world!",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const existingAnswer = answers?.find((answer) => {
    return answer.user_id === user.id;
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!existingAnswer) {
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
            setSuccess("You have successfully answered this question.");
            setFormData(form);
            getQuestion();
            navigate("/chat");
          });
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
    } else {
      fetch(`/answers/${existingAnswer.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answer: formData.answer,
          pitch: formData.pitch,
        }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((answer) => {
            const filteredAnswer = answers.filter((ans) => {
              return ans.user_id !== user.id;
            });

            setAnswers(answer);
            setSuccess("You have successfully updated your answer.");
            setFormData(form);
            getQuestion();
            navigate("/chat");
          });
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
    }
  }

  return (
    <div className="question">
      <NavBar
        user={user}
        setUser={setUser}
        minimal={true}
        navigate={navigate}
        showModal={false}
        setShowLogin={false}
        setShowModal={() => {}}
        showChat={true}
      />
      <div className="container">
        <h1 className="display-4">Today's question</h1>
        <p className="lead">{q.questions}</p>

        <form action="" onSubmit={handleSubmit} className="for">
          <input
            type="radio"
            className="btn-check"
            name="answer"
            id="option1"
            value="true"
            autoComplete="off"
            onChange={handleChange}
            // disabled={checked ? "yes" : ""}
          />
          <label className="btn btn-secondary" id="answer" htmlFor="option1">
            Yes
          </label>

          <input
            type="radio"
            className="btn-check"
            name="answer"
            id="option2"
            value="false"
            autoComplete="off"
            onChange={handleChange}
          />
          <label className="btn btn-secondary" id="answer" htmlFor="option2">
            No
          </label>
          <div className="input-group mt-3 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder={form.pitch}
              aria-label="Pitch your thoughts to the world!"
              aria-describedby="button-addon2"
              name="pitch"
              onChange={handleChange}
            />
            <button
              className="btn btn-outline-secondary"
              type="submit"
              id="button-addon2"
            >
              Submit
            </button>
          </div>
        </form>
        <em>{errors}</em>
        <em>{success}</em>
      </div>
    </div>
  );
};

export default Question;
