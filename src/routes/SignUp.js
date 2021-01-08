import React, { useState } from 'react'

function SignUp() {

    const [userData,setUserData] = useState({nickName : "" , email : "" , password : ""});
    const [passwordCheck,setPasswordCheck] = useState("");

    function onChangeHandler (e){
        e.preventDefault();
        const { target : {name , value}, } = e;

        if (name === "nickname") {
            setUserData({...userData,nickName : value})
        } else if (name === "email"){
            setUserData({...userData,email : value})
        } else if (name === "password") {
            setUserData({...userData,password : value})
        } else if (name === "passwordCheck") {
            setPasswordCheck(value);
        }
        
        
    }

    function onSubmitHandler (e){
        e.preventDefault();
        // 패스워드 확인
        if (passwordCheck !== userData.password){
            alert ("Passwords must be same!")
        } else if (userData.password.length < 6 && passwordCheck.length < 6 ){
            alert ("Passwords must be over 6 digit!")
        }
    }

    return (
        <div>
            <h1>Sign up</h1>
            {console.log(userData, passwordCheck)}
            <form onSubmit={onSubmitHandler}>
                <input onChange={onChangeHandler} required value={userData.nickName} name="nickname" type="text" placeholder="Nickname"/>
                <input onChange={onChangeHandler} required value={userData.email} name="email" type="email" placeholder="Email"/>
                <input onChange={onChangeHandler} required value={userData.password} name="password" type="password" placeholder="Password"/>
                <input onChange={onChangeHandler} required value={passwordCheck} name="passwordCheck" type="password" placeholder="Confirm Password "/>
                <input onSubmit={onSubmitHandler} type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default SignUp
