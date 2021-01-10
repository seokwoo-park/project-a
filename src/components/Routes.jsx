import Auth from '../routes/Auth.jsx';
import Login from '../routes/LogIn.jsx';
import SignUp from '../routes/SignUp.jsx';
import Home from '../routes/Home.jsx';
import React from 'react';
import {BrowserRouter as Router, Link,Route,Switch,useHistory} from 'react-router-dom';

function Routes() {


    
    return (
        <div>
            <Router>
                <Switch>
                     <Route exact path="/">
                        <Auth/>
                    </Route> 
                    
                    <Route exact path="/home">
                        <Home/>
                    </Route>


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
