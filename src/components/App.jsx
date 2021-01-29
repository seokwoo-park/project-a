import React from "react";
import "../App.css";
import Routes from "./Routes.jsx";
import { CookiesProvider } from "react-cookie";
function App() {
  return (
    <CookiesProvider>
      <Routes />
    </CookiesProvider>
  );
}

export default App;
