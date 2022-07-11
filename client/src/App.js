import React, { useEffect, useState } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";
import Profile from "./pages/profile/Profile";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [q, setQuestions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/questions")
      .then((res) => res.json())
      .then((question) => {
        console.log(question);
        setQuestions(question[0]);
      });
  }, []);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user)
    return <Home user={user} setUser={setUser} navigate={navigate} q={q} />;

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home user={user} setUser={setUser} navigate={navigate} q={q} />
            }
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
            element={<Chat user={user} setUser={setUser} navigate={navigate} />}
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
