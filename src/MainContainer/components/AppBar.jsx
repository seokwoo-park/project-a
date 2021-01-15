import React from "react";
import LogoComponent from "./LogoComponent";
import "../css/AppBar.css";

function AppBar() {
  return (
    <header className="appbar">
      <div className="header-container">
        <h1>YAJA</h1>
        <LogoComponent />
        <div className="search-form">
          <input type="text" placeholder="search.." />
          <div className="search_logo"></div>
        </div>
      </div>
    </header>
  );
}

export default AppBar;
