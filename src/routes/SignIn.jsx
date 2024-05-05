import React from "react";
import SignInForm from "../components/SignInForm";

function SignIn() {
  return (
    <div className="signin-page">
        <div className="signin-container">
          <h1>SUNBUDDY</h1>
          <h2>Logga in som Administratör</h2>
          <SignInForm />
        </div>
    </div>
  );
}

export default SignIn;
