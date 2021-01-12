import React from 'react';
import '../css/AppBar.css';
import { useCookies } from "react-cookie";

function AppBar({history}) {
    const [, , removeCookie] = useCookies(["x_auth"]);
    const onClickHandler = () => {
      removeCookie("x_auth");
      history.push("/");
    };
    return (
        <div className="appBar">
            <div className="appBar_container">
                <h1>Yaja tree</h1>
                <h1>User Info</h1>
                <div className="appBar_menu">
                    <p>Home</p>
                    <p>My page</p>
                    <button onClick={onClickHandler}>LOGOUT</button>
                </div>
            </div>
        </div>
    )
}

export default AppBar
