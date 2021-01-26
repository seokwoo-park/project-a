import React from "react";
import Main from "../../MainContainer/Main.jsx";
import AppBar from "../../MainContainer/components/AppBar.jsx";
import "../css/Home.css";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import PostContext from "../../MainContainer/components/PostContext";

function Home() {
  const [cookies] = useCookies();
  if (!cookies.x_auth) return <Redirect to="/" />;
  return (
    <div className="home">
      <PostContext>
        <AppBar />
        <Main />
      </PostContext>
    </div>
  );
}

export default Home;
