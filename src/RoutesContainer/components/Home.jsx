import React from "react";
import Main from "../../MainContainer/Main.jsx";
import AppBar from "../../MainContainer/components/AppBar.jsx";
import "../css/Home.css";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";

function Home() {
  const [cookies] = useCookies();
  if (!cookies.x_auth) return <Redirect to="/" />;
  return (
    <div className="home">
      <AppBar />
      <Main />
    </div>
  );
}

export default Home;
