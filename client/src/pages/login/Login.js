import React, { useState } from "react";
import LoginForm from "../../components/LoginForm";
import SignUpForm from "../../components/SignUpForm";

const Login = ({ setUser, navigate }) => {
  const [showLogin, setShowLogin] = useState(true);

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
