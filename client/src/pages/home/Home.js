import React from "react";
import Question from "../../components/Question";
import NavBar from "../../components/NavBar";
import Card from "../../components/Card";
import "./home.scss";

const Home = ({ question, answers, user, setUser, navigate }) => {
  console.log(answers);

  const answerDisplay = answers.map((answer) => {
    return <Card answer={answer} key={answer.user_id} />;
  });

  return (
    <div className="home">
      <div className="homecontainer">
        <NavBar user={user} setUser={setUser} navigate={navigate} />
        <div className="questions">
          <Question question={question} />
        </div>
        <div className="cards">{answerDisplay}</div>
      </div>
    </div>
  );
};

export default Home;
