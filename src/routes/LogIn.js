import React, { useState } from 'react'

function LogIn() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    function onChangeHandler (e) {
        const {target : {name,value}} = e;
        if (name === "email"){
            setEmail(value);
        } else if (name === "password"){
            setPassword(value);
        }

        console.log("email",email, "password",password);
    }

    function onSubmitHandler (e) {
        e.preventDefault();
        console.log("Submitted")
    }

    return (
        <div>
            <h1>Log in</h1>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <p>Email</p>
                    <input onChange={onChangeHandler} required value={email} name="email" type="email" placeholder="Email"/>
                </div>
                <div>
                    <p>Password</p>
                    <input onChange={onChangeHandler} required value={password} name="password" type="password" placeholder="Password"/>
                </div>
                <input onSubmit={onSubmitHandler} type="submit" value="Log In"/>
            </form>
        </div>
    )
}

export default LogIn