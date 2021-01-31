import {GET_POSTS_SUCCESS} from './postAction'

 const postsReducer = (state=[],action) => {
    switch (action.type) {
        case GET_POSTS_SUCCESS:
            const posts = [...action.payload]
            return posts

        default :
            return state
    }
}

export default postsReducer