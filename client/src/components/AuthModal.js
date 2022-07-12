import React, { useState } from "react";
import "./authmodal.scss";

const form = {
  username: "",
  first_name: "",
  dob_day: "",
  dob_month: "",
  dob_year: "",
  show_gender: false,
  password: "",
  gender_identity: "",
  gender_interest: "",
  img: "",
  matches: 0,
};

const AuthModal = ({
  setShowModal,
  setUser,
  setShowLogin,
  showLogin,
  navigate,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    password: "",
    gender_identity: "",
    gender_interest: "",
    img: "",
    matches: 0,
  });

  function onChange(e) {
    if (showLogin) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else {
      if (e.target.name === "username") {
        setUsername(e.target.value);
      } else {
        setPassword(e.target.value);
      }
    }
  }

  console.log(formData);
  function handleClick() {
    setShowModal(false);
  }

  // if (password !== confirmPassword) {
  //   setErrors("Passwords need to match!");
  //   setIsConfirmed(false);
  // }

  function handleSubmit(e) {
    e.preventDefault();

    if (showLogin) {
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
            navigate("/profile");
            // setShowLogin(true);
          });
        } else {
          r.json().then((err) => {
            setErrors(err.errors);
            console.log(err);
          });
        }
      });
      setFormData(form);
    } else {
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
            if (user.gender_identity) {
              navigate("/question");
            } else {
              navigate("/profile");
            }
          });
        } else {
          r.json().then((err) => {
            setErrors(err.errors);
          });
        }
      });
    }
  }

  return (
    <div className="auth_modal">
      <div className="close-icon" onClick={handleClick}>
        ⓧ
      </div>
      <h2>{showLogin ? "CREATE ACCOUNT" : "LOG IN"}</h2>
      <p>
        By clicking Log In, you agree to our terms. Learn how we process your
        data in our Privacy Policy and Cookie Policy.
      </p>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="username"
          id="username"
          name="username"
          placeholder="username"
          required={true}
          onChange={onChange}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required={true}
          onChange={onChange}
        />
        {showLogin && (
          <input
            type="password"
            id="password-check"
            name="password-check"
            placeholder="confirm password"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        {/* <input className="secondary-button" type="submit" /> */}
        <button
          class="w-100 mb-2 btn btn-lg rounded-3 btn-dark"
          type="submit"
          disabled={isConfirmed ? "" : "no"}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
        {/* <h2 class="fs-6 fw-bold mt-2 mb-2">
          Already have an account? &nbsp;
          <button
            class="w-8 mb-2 btn btn-sm rounded-3 btn-dark"
            onClick={() => setShowLogin(false)}
          >
            Log in
          </button>
        </h2> */}
        <hr />
        <h2>GET THE APP</h2>
      </form>
      <em>{errors}</em>
    </div>
  );
};

export default AuthModal;
