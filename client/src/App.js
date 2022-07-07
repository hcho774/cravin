import React, { useEffect, useState } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";
import Profile from "./pages/profile/Profile";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [question, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState([]);

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

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login setUser={setUser} navigate={navigate} />;

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                question={question}
                answers={answers}
                user={user}
                setUser={setUser}
                navigate={navigate}
              />
            }
          />
          <Route
            exact
            path="/login"
            element={<Login setUser={setUser} navigate={navigate} />}
          />
          <Route exact path="/chat" element={<Chat />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
