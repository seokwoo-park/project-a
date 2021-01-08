import React from 'react'
import {Link,useHistory} from 'react-router-dom'

function Auth() {

    const history = useHistory();

    return (
        <div>
            <h1>Auth</h1>
            <button onClick={()=> history.push('/signup')}>SIGN UP</button>
            <p>Already has account? <Link to="/login">Log In</Link></p>
        </div>
    )
}

export default Auth
