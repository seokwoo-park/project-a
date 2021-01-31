import {combineReducers } from 'redux';
import userReducer from './userRedux/userReducer';
import postsReducer from './postRedux/postReducer';

 const rootReducer = combineReducers({
    user : userReducer,
    posts : postsReducer
})

export default rootReducer