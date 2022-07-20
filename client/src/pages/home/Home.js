import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import "./home.scss";
import AuthModal from "../../components/AuthModal";

const Home = ({ user, setUser, navigate }) => {
  //create useState for showing login modal
  const [showModal, setShowModal] = useState(false);
  //create useState for showing login
  const [showLogin, setShowLogin] = useState(true);
  // handling logout which clears user sessions in backend
  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        //setting user state to null to show login modal in home page
        setUser(null);
        //navite to home page which has login modal
        navigate("/");
      }
    });
  }
  //handling creating account which sets showModal and showLogin to true
  function handleClick() {
    setShowModal(true);
    setShowLogin(true);
  }

  return (
    <>
      <div className="overlay">
        <NavBar
          user={user}
          setUser={setUser}
          minimal={false}
          navigate={navigate}
          showModal={showModal}
          setShowLogin={setShowLogin}
          setShowModal={setShowModal}
        />
        <div className="home">
          <h1 className="primary_title">Meet Unknown</h1>
          <button
            className="primary_button"
            onClick={user ? handleLogout : handleClick} //if user exists then let onClick be handle logout if not handleclick
          >
            {user ? "Singout" : "Create Account"}
          </button>
          {showModal && (
            <AuthModal
              setShowModal={setShowModal}
              setUser={setUser}
              setShowLogin={setShowLogin}
              navigate={navigate}
              showLogin={showLogin}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
