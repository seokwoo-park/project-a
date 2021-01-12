import React from "react";
import { withRouter } from "react-router-dom";
import { useCookies } from "react-cookie";

function Main({ history }) {
  const [, , removeCookie] = useCookies(["x_auth"]);
  const onClickHandler = () => {
    removeCookie("x_auth");
    history.push("/");
  };

  return (
    <div>
      tedsafdfsdfst
      <button onClick={onClickHandler}>LOGOUT</button>
    </div>
  );
}

export default withRouter(Main);
