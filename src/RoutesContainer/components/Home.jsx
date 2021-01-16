import React from "react";
import Main from "../../MainContainer/Main.jsx";
import AppBar from "../../MainContainer/components/AppBar.jsx";
import '../css/Home.css';

function Home() {
  return (
    <div className="home">
      <AppBar/>
      <Main />
    </div>
  );
}

export default Home;
