import React, { useEffect, useState } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import Question from "./pages/question/Question";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [q, setQuestions] = useState([]);

  const [answers, setAnswers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/answers")
      .then((res) => res.json())
      .then((answers) => setAnswers(answers));
  }, []);

  const getQuestion = () => {
    fetch("/questions")
      .then((res) => res.json())
      .then((question) => {
        setQuestions(question[0]);
      });
  };

  useEffect(() => {
    getQuestion();
  }, []);

  const getUser = () =>
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });

  // const deleterooms = () => {
  //   fetch(`/deleterooms/`, { method: "DELETE" }).then((r) => {
  //     if (r.ok) {
  //       console.log("all rooms and messages have been deleted");
  //     }
  //   });
  // };

  // const resetmatches = () => {
  //   fetch("/resetmatches/", {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ matches: 0 }),
  //   }).then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => {
  //         getUser();
  //         console.log("matches has been resetted");
  //       });
  //     } else {
  //       r.json().then((err) => {
  //         // setErrors(err.errors);
  //       });
  //     }
  //   });
  // };

  useEffect(() => {
    getUser();

    // const interval = setInterval(() => {
    //   resetmatches();
    //   deleterooms();
    // }, 100000);

    // return () => clearInterval(interval);
  }, []);

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
