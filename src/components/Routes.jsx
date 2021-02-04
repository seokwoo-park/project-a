import React, { useState } from "react";
import Auth from "../RoutesContainer/components/Auth.jsx";
import Login from "../RoutesContainer/components/LogIn.jsx";
import SignUp from "../RoutesContainer/components/SignUp.jsx";
import Home from "../RoutesContainer/components/Home.jsx";
import UserPage from '../RoutesContainer/components/UserPage.jsx'
import { Switch, Route } from "react-router-dom";

export const isLoadingContext = React.createContext();

function Routes() {
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingvalue = { isLoading, setIsLoading };

  return (
    <div>
      <isLoadingContext.Provider value={isLoadingvalue}>
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/mypage" component={UserPage}/>
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
      </isLoadingContext.Provider>
    </div>
  );
}

export default Routes;
