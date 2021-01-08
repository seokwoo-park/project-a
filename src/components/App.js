import { useState } from 'react';
import '../App.css';
import Routes from './Routes.js';

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);


  return (
    <div className="App">
      <Routes isLoggedIn={isLoggedIn}/>
    </div>
  );
}

export default App;
