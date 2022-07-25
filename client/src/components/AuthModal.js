import React, { useState } from "react";
import "./authmodal.scss";
//inital form data to clear user inputs in form
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

const AuthModal = ({ setShowModal, setUser, showLogin, navigate }) => {
  //username useState initial value of ""
  const [username, setUsername] = useState("");
  //password useState initial value of ""
  const [password, setPassword] = useState("");
  //errormessage useState initial value of []
  const [errors, setErrors] = useState([]);
  //password confimred useState initial value of null
  const [confirmPassword, setConfirmPassword] = useState(null);
  //loading useState initial value of false
  const [isLoading, setIsLoading] = useState(false);
  //
  // const [isConfirmed, setIsConfirmed] = useState(true);
  //formData useState initial value of empty form
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
  //handle changes user inputs in form
  function onChange(e) {
    //if showLogin modal is true
    if (showLogin) {
      //update formData with user inputs
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else {
      //else username and password only
      if (e.target.name === "username") {
        setUsername(e.target.value);
      } else {
        setPassword(e.target.value);
      }
    }
  }

  //handle click to set showModal to false
  function handleClick() {
    setShowModal(false);
  }
  //handle login and sign up form submit
  function handleSubmit(e) {
    //preventing page from refreshing
    e.preventDefault();
    // if showLogin is true which means user does not have an account and user put password and confirmPassword correctly
    if (showLogin && formData.password === confirmPassword) {
      //set errors to []
      setErrors([]);
      //set isloading to true
      setIsLoading(true);
      //create user with form Data in backend using fetch POST method
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((r) => {
        //set isLoading to false since request made
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => {
            //set current user to signedup user
            setUser(user);
            //navigate to profile page
            navigate("/profile");
          });
        } else {
          r.json().then((err) => {
            //set errors message if request did go through
            setErrors(err.errors);
          });
        }
      });
      //reseting signup form inputs
      setFormData(form);
    } else if (!showLogin) {
      //else if user does have account and tries to login
      //set isLoading to true
      setIsLoading(true);
      //Login with username and password using fetch POST method which will create a session in the backend and authenticate the user
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }).then((r) => {
        //set isLoading to false
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => {
            //if request went through successfully then
            //set user with currently logged in user
            setUser(user);
            //check if user has already filled out their account profile or not
            if (!user.gender_identity && user.answer) {
              //if user has already filled out profile and answered the question then navigate to chat page directly
              navigate("/chat");
            } else if (!user.answer) {
              //elst if user has filed out profile but has not answered the question then navigate to question page
              navigate("/question");
            }
          });
        } else {
          r.json().then((err) => {
            // if not successful then set errorr message
            setErrors(err.errors);
          });
        }
      });
    } else {
      //if user did not put password and confirm password correctly then set errorr message
      setErrors("Please confirm your password");
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
        <button
          className="w-100 mb-2 btn btn-lg rounded-3 btn-dark"
          type="submit"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>

        <hr />
        <h2>GET THE APP</h2>
      </form>
      <em>{errors}</em>
    </div>
  );
};

export default AuthModal;
