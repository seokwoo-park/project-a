import React, { useState } from 'react'
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import {TextField,Button } from '@material-ui/core';
import '../css/SignUp.css';


function SignUp() {

    const history = useHistory();

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
            alert ("Passwords must be same!");
            return false;
        } else if (userData.password.length < 6 && passwordCheck.length < 6 ){
            alert ("Passwords must be over 6 digit!");
            return false;
        }

        axios.post('http://localhost:8081/user/register',{...userData})
        .then((result)=>{history.push('/login'); console.log(result,"전달완료")})
        .catch(error=>{console.log(error,"실패")})
        

    }

    return (
        <div className="signUp">
            <h1>Welcome to Yaja Tree </h1>
            <div>
                <form className="form_container" onSubmit={onSubmitHandler}>
                    <h2>SIGN UP</h2>
                    <TextField onChange={onChangeHandler} label="Nickname" required value={userData.nickName} name="nickname" type="text" placeholder="Nickname"/>
                    <TextField onChange={onChangeHandler} label="Email" required value={userData.email} name="email" type="email" placeholder="Email"/>
                    <TextField onChange={onChangeHandler} label="Password" required value={userData.password} name="password" type="password" placeholder="Password"/>
                    <TextField onChange={onChangeHandler} label="Password Confirm" required value={passwordCheck} name="passwordCheck" type="password" placeholder="Confirm Password "/>
                    <Button className="btn_signUp" onSubmit={onSubmitHandler} type="submit" value="Submit"variant="contained" color="primary">Submit</Button>
                 </form>
            </div>
        </div>
    )
}

export default SignUp
