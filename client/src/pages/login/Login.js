import React, { useState } from "react";
import LoginForm from "../../components/LoginForm";
import SignUpForm from "../../components/SignUpForm";

const Login = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      {showLogin ? (
        <>
          <LoginForm
          // onLogin={onLogin}
          // navigate={navigate}
          // setShowLogin={setShowLogin}
          />
          {/* <Divider /> */}
        </>
      ) : (
        <>
          <SignUpForm
          // onLogin={onLogin}
          // navigate={navigate}
          // setShowLogin={setShowLogin}
          />
          {/* <Divider /> */}
        </>
      )}
    </div>
  );
};

export default Login;
