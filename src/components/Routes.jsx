import React from "react";
import Auth from "../routes/Auth.jsx";
import Login from "../routes/LogIn.jsx";
import SignUp from "../routes/SignUp.jsx";
import Home from "../routes/Home.jsx";
import { Switch, Route, Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";

function Routes() {
  const [cookies] = useCookies(["x_auth"]);

  return (
    <div>
      {cookies.x_auth !== undefined ? (
        <Redirect to="/home" />
      ) : (
        <Redirect to="/" />
      )}
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route
          render={({ location }) => {
            return (
              <>
                <h1>404 ERROR</h1>
                <p>Not found URL : {location.pathname}</p>
              </>
            );
          }}
        />
      </Switch>
    </div>
  );
}

export default Routes;
