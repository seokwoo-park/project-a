import React, { useContext, useState } from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";
import "../css/SignUp.css";
import Loader from "../../components/Loader";
import {isLoadingContext} from '../../components/Routes';

function SignUp({ history }) {

  const {isLoading,setIsLoading} = useContext(isLoadingContext);

  const [userData, setUserData] = useState({
    nickName: "",
    email: "",
    password: "",
    passwordCheck: "",
  });
  const { nickName, email, password, passwordCheck } = userData;

  function onChangeHandler(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    // 패스워드 확인
    if (passwordCheck !== password) {
      alert("Passwords must be same!");
      return false;
    } else if (password.length < 6 && passwordCheck.length < 6) {
      alert("Passwords must be over 6 digit!");
      return false;
    }
    setIsLoading(true);
    await axios
      .post("http://localhost:8081/user/register", { ...userData })
      .then((result) => {
        history.push("/login");
        console.log(result, "전달완료");
      })
      .catch((error) => {
        console.log(error, "실패");
        setUserData({
          nickName: "",
          email: "",
          password: "",
          passwordCheck: "",
        });
      });
      setIsLoading(false);
  }

  return (
    <div className="signUp">
      <h1>Welcome to Yaja Tree </h1>
      {isLoading ? <Loader isLoading={isLoading}/> : null}
      
      <div>
        <form className="form_container" onSubmit={onSubmitHandler}>
          <h2>SIGN UP</h2>
          <TextField
            onChange={onChangeHandler}
            label="Nickname"
            required
            value={nickName}
            name="nickName"
            type="text"
            placeholder="Nickname"
          />
          <TextField
            onChange={onChangeHandler}
            label="Email"
            required
            value={email}
            name="email"
            type="email"
            placeholder="Email"
          />
          <TextField
            onChange={onChangeHandler}
            label="Password"
            required
            value={password}
            name="password"
            type="password"
            placeholder="Password"
          />
          <TextField
            onChange={onChangeHandler}
            label="Password Confirm"
            required
            value={passwordCheck}
            name="passwordCheck"
            type="password"
            placeholder="Confirm Password "
          />
          <Button
            className="btn_signUp"
            onSubmit={onSubmitHandler}
            type="submit"
            value="Submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
