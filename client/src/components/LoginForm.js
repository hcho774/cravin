import React from "react";

const LoginForm = () => {
  return (
    <div>
      <div>
        <form action="">
          <p>Username</p>
          <input
            type="username"
            name="username"
            placeholder="Enter your username"
          />
          <input
            type="password"
            name="passwored"
            placeholder="Enter your password"
          />
          <button>submit</button>
          <p>
            Don't have an account? &nbsp;
            <button>Sign Up</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
