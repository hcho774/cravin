import "./App.css";
import React, { useEffect, useState } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";
import Profile from "./pages/profile/Profile";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function App() {
  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((users) => console.log(users));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/chat" element={<Chat />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
