import React, { useEffect, useState } from "react";
import Home from "./pages/home/Home";

import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import Question from "./pages/question/Question";
import { Routes, Route, useNavigate } from "react-router-dom";

function App({ cable }) {
  //create internal state called user for our component with an initial value of null
  const [user, setUser] = useState(null);
  //create useState for Question
  const [q, setQuestions] = useState([]);
  //create useState for User Answers
  const [answers, setAnswers] = useState([]);
  //useNavigate to navigate between routes
  const navigate = useNavigate();
  //getting User Answers from our database by using useEffect and Fetching
  useEffect(() => {
    fetch("/answers")
      .then((res) => res.json())

      .then((answers) => setAnswers(answers)); //set answers state to value of User Answers data from our data server
  }, []);

  //getting Question from our database by using useEffect and Fetching
  const getQuestion = () => {
    fetch("/questions")
      .then((res) => res.json())
      .then((question) => {
        setQuestions(question[0]); //set quetion state to value of question data from our data server
      });
  };

  useEffect(() => {
    // firing getQuestion function to get question and set question state to value of question data from our data server
    getQuestion();
  }, []);
  //getting user information from our database by using useEffect and Fetching
  const getUser = () =>
    //custom route /me checks if user is currently logged in
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user)); // if user is logged in then set user informtion to userstate
      }
    });

  //deleting entire chat rooms data table in backend
  const deleterooms = () => {
    fetch(`/deleterooms/`, { method: "DELETE" }).then((r) => {
      if (r.ok) {
        console.log("all rooms and messages have been deleted");
      }
    });
  };
  //reseting all matches that users have to 0
  const resetmatches = () => {
    fetch("/resetmatches/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matches: 0 }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          getUser();
          console.log("matches has been resetted");
        });
      } else {
        r.json().then((err) => {
          console.log(err);
        });
      }
    });
  };

  useEffect(() => {
    //firing getUser function to get user information and checks if user is logged in or not
    getUser();
    //deleting all chat rooms & messages associated with the chat rooms and resetting all matches users have to 0 every 24hours period by using setinterval
    const interval = setInterval(() => {
      resetmatches();
      deleterooms();
    }, 24000000);
    // clearInterval for Interval
    return () => clearInterval(interval);
  }, []);

  // checks if user is not logged in then redirect to Homepage that has login modal
  if (!user) return <Home user={user} setUser={setUser} navigate={navigate} />;

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route
            exact
            path="/"
            element={<Home user={user} setUser={setUser} navigate={navigate} />}
          />

          <Route
            exact
            path="/chat"
            element={
              <Dashboard
                cable={cable}
                user={user}
                setUser={setUser}
                navigate={navigate}
                q={q}
              />
            }
          />
          <Route
            exact
            path="/question"
            element={
              <Question
                user={user}
                setUser={setUser}
                navigate={navigate}
                q={q}
                answers={answers}
                setAnswers={setAnswers}
                getQuestion={getQuestion}
              />
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <Profile
                user={user}
                setUser={setUser}
                navigate={navigate}
                getUser={getUser}
              />
            }
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
