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
  //set useState for success and error messages to check response from backend whether POST & PATCH go through successfully or not
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState("");
  //inital form data to reset the answer form inputs
  const form = {
    user_id: user.id,
    questions_id: q.id,
    answer: null,
    pitch: "Pitch your thoughts to the world!",
  };
  //useState that has formData set to initial values from user
  const [formData, setFormData] = useState({
    user_id: user.id,
    question_id: q.id,
    answer: null,
    pitch: "Pitch your thoughts to the world!",
  });
  //handle changes in user inputs for formData
  function handleChange(e) {
    //updating the formData with user input values
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  //check if user has already answered the quetion
  const existingAnswer = answers?.find((answer) => {
    return answer.user_id === user.id;
  });

  //handle answer form submit
  function handleSubmit(e) {
    //preventing page from refreshing
    e.preventDefault();
    // check if user has not answered the question then Create user answer(formData) in Backend using Fetch request (POST method)
    if (!existingAnswer) {
      fetch(`/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((r) => {
        if (r.ok) {
          //  //if the response is successful
          r.json().then((answer) => {
            setSuccess("You have successfully answered this question."); //set success message
            setFormData(form); //reset formData
            getQuestion(); //invoke get question function
            navigate("/chat"); // nevigate to /chat page
          });
        } else {
          r.json().then((err) => setErrors(err.errors)); // if request did not go through then set errors with error response
        }
      });
    } else {
      //if user has already answered the question then update the user answer in Backend using Fetch request (PATCH method)
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
          //if response is successfully updated
          r.json().then((answer) => {
            //set success message
            setSuccess("You have successfully updated your answer.");
            //reset the formData
            setFormData(form);
            //invoke get question function
            getQuestion();
            //navigate to chat page
            navigate("/chat");
          });
        } else {
          r.json().then((err) => setErrors(err.errors)); //// if request did not go through then set errors with error response
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
