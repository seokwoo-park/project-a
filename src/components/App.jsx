import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import '../App.css';
import Routes from './Routes.jsx';
import {useHistory} from 'react-router-dom'

function App() {

  const history = useHistory();
  
  useEffect(()=>{
    const IsCookie = Cookies.get('x_auth');
    if (IsCookie !== undefined){
       console.log('토큰확인완료')
       //수정할부분.. 
       history.push('/home');
      }
      
  },[])


  return (
    <div className="App">
        <Routes/>
    </div>
  );
}

export default App;
