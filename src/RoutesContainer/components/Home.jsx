import React from "react";
import Main from "../../MainContainer/Main.jsx";
import AppBar from "../../MainContainer/components/AppBar.jsx";

function Home() {
  console.log("Home page");
  return (
    <div>
      <AppBar/>
      <Main />
    </div>
  );
}

export default Home;
