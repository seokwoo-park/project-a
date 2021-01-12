import React from "react";
import { withRouter } from "react-router-dom";

function Main({ history }) {


  return (
    <div className="main">
      <h1>Main Page</h1>
    </div>
  );
}

export default withRouter(Main);
