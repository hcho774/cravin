import React, { useState } from "react";
import "./loginform.scss";
import "bootstrap/dist/css/bootstrap.css";

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
      <div
        class="modal modal-signin position-static d-block bg-light py-5"
        tabindex="-1"
        role="dialog"
        id="modalSignin"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content rounded-4 shadow">
            <div class="modal-header p-5 pb-4 border-bottom-0">
              {/* <h5 class="modal-title">Cravin</h5> */}
              <h2 class="fw-bold mb-0">Please sign in</h2>
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
                    type="username"
                    class="form-control rounded-3"
                    id="floatingInput"
                    placeholder="Enter your username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label for="floatingInput">Username</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control rounded-3"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label for="floatingPassword">Password</label>
                </div>
                <button
                  class="w-100 mb-2 btn btn-lg rounded-3 btn-dark"
                  type="submit"
                >
                  {isLoading ? "Loading..." : "Sign in"}
                </button>
                {/* <small class="text-muted">
                  By clicking Sign up, you agree to the terms of use.
                </small> */}
                <hr class="my-4" />
                <h2 class="fs-5 fw-bold mb-3">
                  Don't have an account? &nbsp;
                  <button
                    class="w-8 mb-2 btn btn-sm rounded-3 btn-dark"
                    onClick={() => setShowLogin(false)}
                  >
                    Sign Up
                  </button>
                </h2>

                {/* <p>
                  Don't have an account? &nbsp;
                  <button color="secondary" onClick={() => setShowLogin(false)}>
                    Sign Up
                  </button>
                </p> */}
                <br />
                <em>{errors}</em>

                {/* <button
              class="w-100 py-2 mb-2 btn btn-outline-dark rounded-3"
              type="submit"
            >
              <svg class="bi me-1" width="16" height="16">
                <use xlink:href="#twitter"></use>
              </svg>
              Sign up with Twitter
            </button>
            <button
              class="w-100 py-2 mb-2 btn btn-outline-primary rounded-3"
              type="submit"
            >
              <svg class="bi me-1" width="16" height="16">
                <use xlink:href="#facebook"></use>
              </svg>
              Sign up with Facebook
            </button>
            <button
              class="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3"
              type="submit"
            >
              <svg class="bi me-1" width="16" height="16">
                <use xlink:href="#github"></use>
              </svg>
              Sign up with GitHub
            </button> */}
              </form>
            </div>
          </div>
          {/* <div id="log_in_bg">
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
      </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
