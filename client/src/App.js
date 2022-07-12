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
  const [genderedUsers, setGenderedUsers] = useState(null);
  const [answers, setAnswers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/answers")
      .then((res) => res.json())
      .then((answers) => setAnswers(answers));
  }, []);

  useEffect(() => {
    fetch("/questions")
      .then((res) => res.json())
      .then((question) => {
        setQuestions(question[0]);
      });
  }, []);

  const getUser = () =>
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });

  useEffect(() => {
    getUser();
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
          {/* <Route
            exact
            path="/login"
            element={
              <Login
                setUser={setUser}
                navigate={navigate}
                // setShowLogin={setShowLogin}
                // showLogin={showLogin}
              />
            }
          /> */}
          <Route
            exact
            path="/chat"
            element={
              <Dashboard user={user} setUser={setUser} navigate={navigate} />
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
              />
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <Profile user={user} setUser={setUser} navigate={navigate} />
            }
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
