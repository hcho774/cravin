import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((users) => console.log(users));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>hello world</h1>
      </header>
    </div>
  );
}

export default App;
