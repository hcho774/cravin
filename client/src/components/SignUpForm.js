import React, { useState } from "react";
import "./loginform.scss";
const form = {
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  password: "",
  location: "",
  img: "",
  birth_date: "",
};

const SignUpForm = ({ setUser, setShowLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    location: "",
    img: "",
    birth_date: "",
  });

  function onChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  console.log(formData);
  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          console.log(user);
          setShowLogin(true);
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
      <div id="login_in_bg">
        <div className="loginbox">
          <h3 id="log_in_up_text">Please Sign Up</h3>
          <form id="log_in_form" onSubmit={handleSubmit}>
            {/* <p>First Name</p>
            <input
              type="first_name"
              name="first_name"
              placeholder="Enter your first name"
              value={formData.first_name}
              onChange={onChange}
            />
            <p>Last Name</p>
            <input
              type="last_name"
              name="last_name"
              placeholder="Enter your last name"
              value={formData.last_name}
              onChange={onChange}
            /> */}
            {/* <p>Email</p>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={onChange}
            /> */}
            <p>Username</p>
            <input
              type="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={onChange}
            />
            <p>Password</p>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={onChange}
            />
            <button variant="fill" color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit"}
            </button>
            <p>
              Already have an account? &nbsp;
              <button color="secondary" onClick={() => setShowLogin(true)}>
                Log In
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

export default SignUpForm;
