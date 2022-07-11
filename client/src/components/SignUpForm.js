import React, { useState } from "react";
import "./loginform.scss";
import "bootstrap/dist/css/bootstrap.css";

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
    console.log(e.target.value);
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
      <div
        class="modal modal-signin position-static d-block bg-light py-5"
        tabindex="-1"
        role="dialog"
        id="modalSignin"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content rounded-4 shadow">
            <div class="modal-header p-5 pb-4 border-bottom-0">
              <h5 class="modal-title"></h5>
              <h2 class="fw-bold mb-0">Sign up for free</h2>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body p-5 pt-0">
              <form class="" onSubmit={handleSubmit}>
                <div class="form-floating mb-3">
                  <input
                    name="username"
                    type="username"
                    class="form-control rounded-3"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={onChange}
                  />
                  <label for="floatingInput">Username</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    name="password"
                    type="password"
                    class="form-control rounded-3"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={onChange}
                  />
                  <label for="floatingPassword">Password</label>
                </div>
                <button
                  class="w-100 mb-2 btn btn-lg rounded-3 btn-dark"
                  type="submit"
                >
                  {isLoading ? "Loading..." : "Sign up"}
                </button>
                <small class="text-muted">
                  By clicking Sign up, you agree to the terms of use.
                </small>
                <h2 class="fs-6 fw-bold mt-2 mb-2">
                  Already have an account? &nbsp;
                  <button
                    class="w-8 mb-2 btn btn-sm rounded-3 btn-dark"
                    onClick={() => setShowLogin(true)}
                  >
                    Sign in
                  </button>
                </h2>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

{
  /* <div id="login_in_bg">
        <div className="loginbox">
          <h3 id="log_in_up_text">Please Sign Up</h3>
          <form id="log_in_form" onSubmit={handleSubmit}>
            <p>Username</p>
            <input
              type="username"
              name="username"
              placeholder="Enter your username"
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
      </div> */
}
