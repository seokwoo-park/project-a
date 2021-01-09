import axios from 'axios';
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