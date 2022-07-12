import React, { useState, useEffect } from "react";
import Question from "../../components/Question";
import NavBar from "../../components/NavBar";
import Card from "../../components/Card";
import "./home.scss";
import AuthModal from "../../components/AuthModal";

const Home = ({ q, user, setUser, navigate }) => {
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  // const answerDisplay = answers.map((answer) => {
  //   return (
  //     <Card
  //       answer={answer}
  //       key={answer.user_id}
  //       handleAnswerDelete={handleAnswerDelete}
  //       user={user}
  //     />
  //   );
  // });

  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        navigate("/");
      }
    });
  }

  // function handleAnswerDelete(id) {
  //   console.log(id);
  //   fetch(`/answers/${id}`, {
  //     method: "DELETE",
  //   }).then((r) => {
  //     if (r.ok) {
  //       setAnswers(answers.filter((answer) => answer.id !== id));
  //     }
  //   });
  // }

  function handleClick() {
    setShowModal(true);
    setShowLogin(true);
  }

  return (
    <>
      <div className="overlay">
        <NavBar
          user={user}
          setUser={setUser}
          minimal={false}
          navigate={navigate}
          showModal={showModal}
          setShowLogin={setShowLogin}
          setShowModal={setShowModal}
        />
        <div className="home">
          <h1 className="primary_title">Meet Unknown</h1>
          <button
            className="primary_button"
            onClick={user ? handleLogout : handleClick}
          >
            {user ? "Singout" : "Create Account"}
          </button>
          {showModal && (
            <AuthModal
              setShowModal={setShowModal}
              setUser={setUser}
              setShowLogin={setShowLogin}
              navigate={navigate}
              showLogin={showLogin}
            />
          )}
        </div>
      </div>

      {/* <div className="home">
      <div className="homecontainer">
        <NavBar user={user} setUser={setUser} navigate={navigate} />
        <div className="questions">
          <Question
            user={user}
            setAnswers={setAnswers}
            answers={answers}
            q={q}
          />
        </div>
        <div className="cards">{answerDisplay}</div>
      </div>
    </div>
    </> */}
    </>
  );
};

export default Home;
