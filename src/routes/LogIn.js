import axios from 'axios';
import React, { useState } from 'react'
import {TextField,Button} from '@material-ui/core';
import '../css/LogIn.css';


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

    const onSubmitHandler = async (e)  =>{
        e.preventDefault();
        try {
            let data;
            data = await axios.post('http://localhost:8081/user/login',{email : email, password : password});
            console.log('로그인 데이터 보내기 성공',data);
            //.then 나중에 검사후 로그인 데이터를 받아오는 코드
        } catch(error){
            console.log(error);
            alert('Incorrect email or password. please check again!');
        }
    }

    return (
        <div className="logIn">
            <h1>Yaja tree</h1>
            <form className="form_container logIn_form" onSubmit={onSubmitHandler}>
                <h2>LOG IN</h2>
                <TextField
                onChange={onChangeHandler}
                required value={email}
                name="email"
                label="Email"
                type="email"
                placeholder="Login Email"
                rowsMax={2}
                variant="outlined"
                />

                <TextField
                onChange={onChangeHandler} required value={password} name="password"
                label="Password"
                placeholder="Password"
                type="password"
                variant="outlined"
                />
                <Button className="btn_logIn" onSubmit={onSubmitHandler} type="submit" variant="contained" color="primary">Log In</Button>
            </form>

                    

        </div>
    )
}

export default LogIn