import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();


export const GET_USER = 'GET_USER';


export const getUser = (user) => {
    return {
        type : GET_USER,
        payload : user
    }
}


export const fetchUser = () =>  async dispatch => {
    console.log('GetUser')
    try {
        await axios.post(
        "http://localhost:8081/user/myprofile",
            { nickName: cookies.get("nickname") },
            {
                headers: {
                x_auth:cookies.get("x_auth"),
                },
            }
        ).then((res)=>{
            console.log(res)
            dispatch(getUser(res.data[0]))
        })
    } catch (error) {
        alert(`Can't load the USER info. Error : ${error}`)
    }
}

export const editProfileUser = (formData) => async dispatch => {
    await axios
      .post("http://localhost:8081/user/updateprofile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          x_auth: cookies.get("x_auth"),
        },
    }).then((res)=>{
        console.log(res)
        console.log('profile picture update')
        dispatch(fetchUser())
    })
    .catch((error)=>{
        alert(`Can't change the profile picture. Error : ${error}`)
    })
}