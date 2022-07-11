import React, { useState } from "react";
import "./authmodal.scss";

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

  const [formDataLogin, setFormDataLogin] = useState({
    username: "",
    password: "",
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

  console.log(confirmPassword);

  function handleClick() {
    setShowModal(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // if (password !== confirmPassword) {
    //   setErrors("Passwords need to match!");
    // } else
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

            // setShowLogin(true);
          });
        } else {
          r.json().then((err) => {
            setErrors(err.errors);
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
            navigate("/profile");
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
        <button class="w-100 mb-2 btn btn-lg rounded-3 btn-dark" type="submit">
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
