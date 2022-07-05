import React from "react";

const SignUpForm = () => {
  return (
    <div>
      <div>
        <form action="">
          <p>First Name</p>
          <input
            type="first_name"
            name="first_name"
            placeholder="Enter your first name"
          />
          <p>Last Name</p>
          <input
            type="last_name"
            name="last_name"
            placeholder="Enter your last name"
          />
          <p>Email</p>
          <input type="email" name="email" placeholder="Enter your email" />
          <p>Password</p>
          <input
            type="password"
            name="password"
            placeholder="Enter your password that"
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

export default SignUpForm;
