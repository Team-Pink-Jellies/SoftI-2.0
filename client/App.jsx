import React, { useState } from 'react';
import Login from './components/Login.jsx';
import './styles.css';
import logoImage from './assets/login.png';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Join from './components/Join.jsx';
import Home from './components/Home.jsx';

// App will be the parent-most component of our react component architecture
function App() {
  // useSelector to capture the specific value assigned to `isLoggedIn` within the redux store
  const [visibility, setVisibility] = useState(false);

  const hideWhenVisible = { display: visibility ? 'none' : '' };

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <div id='main'>
      <img src={logoImage} />
      <div style={hideWhenVisible}>
        <Link className='nav-link' to='/login' onClick={toggleVisibility}>
          <button>Login</button>
        </Link>
        <Link className='nav-link' to='/join' onClick={toggleVisibility}>
          <button>Join</button>
        </Link>
      </div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}
export default App;
