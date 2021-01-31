import {GET_USER} from './userAction'

const userReducer = (state = {},action) => {
    switch (action.type) {
        case GET_USER: {
            const userData = {...action.payload}
            return userData
        }
        default : 
            return state
    }
}

export default userReducer