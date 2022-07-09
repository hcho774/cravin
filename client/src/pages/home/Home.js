import React, { useState, useEffect } from "react";
import Question from "../../components/Question";
import NavBar from "../../components/NavBar";
import Card from "../../components/Card";
import "./home.scss";

const Home = ({ user, setUser, navigate }) => {
  const [question, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetch("/answers")
      .then((res) => res.json())
      .then((answers) => setAnswers(answers));
  }, []);

  useEffect(() => {
    fetch("/questions")
      .then((res) => res.json())
      .then((question) => setQuestions(question[0]));
  }, []);

  const answerDisplay = answers.map((answer) => {
    return (
      <Card
        answer={answer}
        key={answer.user_id}
        handleAnswerDelete={handleAnswerDelete}
        user={user}
      />
    );
  });

  function handleAnswerDelete(id) {
    console.log(id);
    fetch(`/answers/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setAnswers(answers.filter((answer) => answer.id !== id));
      }
    });
  }

  return (
    <div className="home">
      <div className="homecontainer">
        <NavBar user={user} setUser={setUser} navigate={navigate} />
        <div className="questions">
          <Question
            question={question}
            user={user}
            setAnswers={setAnswers}
            answers={answers}
          />
        </div>
        <div className="cards">{answerDisplay}</div>
      </div>
    </div>
  );
};

export default Home;
