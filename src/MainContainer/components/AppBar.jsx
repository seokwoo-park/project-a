import React from "react";
import { ReactComponent as MainLogo } from "../images/main-logo.svg";
import "../css/AppBar.css";

function AppBar() {
  return (
    <header className="appbar">
      <div className="header-container">
        <h1>YAJA</h1>
        <MainLogo />
        <div className="search-form">
          <input type="text" placeholder="search.." />
          <div className="search_logo"></div>
        </div>
      </div>
    </header>
  );
}

export default AppBar;
