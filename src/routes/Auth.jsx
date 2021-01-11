import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../css/Auth.css";

function Auth({ history }) {
  return (
    <div className="auth">
      <div className="auth_container">
        <h1>Yaja tree</h1>
        <Button
          className="auth_signUp"
          onClick={() => history.push("/signup")}
          variant="contained"
        >
          SIGN UP
        </Button>
        <div className="auth_loginContainer">
          <p>Already has account? </p>
          <Link className="auth_login" to="/login">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Auth;
