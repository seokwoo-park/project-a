import React, { useEffect } from "react";
import Cookies from "js-cookie";
import "../App.css";
import Routes from "./Routes.jsx";

function App({ history }) {
  useEffect(() => {
    const IsCookie = Cookies.get("x_auth");
    if (IsCookie !== undefined) {
      console.log("토큰확인완료");
      //수정할부분..
      history.push("/home");
    }
  }, [history]);

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
