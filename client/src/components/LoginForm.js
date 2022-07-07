import React, { useState } from "react";
import "./loginform.scss";

const LoginForm = ({ setUser, navigate, setShowLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          navigate("/");
        });
      } else {
        r.json().then((err) => {
          setErrors(err.errors);
        });
      }
    });
  }

  return (
    <div id="log_in">
      <div id="log_in_bg">
        <div className="loginbox">
          <h3 id="log_in_up_text">Log In</h3>
          <form id="log_in_form" onSubmit={handleSubmit}>
            <p>Username</p>
            <input
              type="username"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              name="passwored"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button variant="fill" color="primary" type="submit">
              {isLoading ? "Loading..." : "Login"}
            </button>
            <p>
              Don't have an account? &nbsp;
              <button color="secondary" onClick={() => setShowLogin(false)}>
                Sign Up
              </button>
            </p>
            <br />
            <em>{errors}</em>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
