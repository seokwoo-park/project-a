import Home from '../routes/Home.js';
import Auth from '../routes/Auth.js';
import Login from '../routes/LogIn.js';
import SignUp from '../routes/SignUp.js';
import React from 'react';
import {BrowserRouter as Router, Link,Route,Switch} from 'react-router-dom';

function Routes({isLoggedIn}) {
    return (
        <div>
            <Router>
                <Switch>
                    {/* 로그인이 됐으면 home으로 아니면 auth(대문) */}
                    {isLoggedIn ? 
                    <Route exact path="/home">
                        <Home/> 
                    </Route>
                    : <Route exact path="/">
                        <Auth/>
                    </Route> }


                    <Route exact path="/login">
                        <Login/>
                    </Route>

                    <Route exact path="/signup"> 
                        <SignUp/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default Routes
