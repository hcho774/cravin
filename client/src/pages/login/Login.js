import React, { useState } from "react";
import LoginForm from "../../components/LoginForm";
import SignUpForm from "../../components/SignUpForm";

const Login = ({ setUser, navigate, setShowLogin, showLogin }) => {
  return (
    <div>
      {showLogin ? (
        <>
          <LoginForm
            setUser={setUser}
            navigate={navigate}
            setShowLogin={setShowLogin}
          />
          {/* <Divider /> */}
        </>
      ) : (
        <>
          <SignUpForm setUser={setUser} setShowLogin={setShowLogin} />
          {/* <Divider /> */}
        </>
      )}
    </div>
  );
};

export default Login;
