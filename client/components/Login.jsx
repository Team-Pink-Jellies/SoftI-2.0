import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { userLogin } from '../reducers/userSlice';
import '../styles.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loggedInUser = await dispatch(userLogin({ username, password }));
      console.log('loggedInUser', loggedInUser);
      console.log('User was successfully logged in.');
      navigate('/home');
    } catch (exception) {
      console.log('User could not be authenticated:');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className='auth-login'>
        <input
          type='text'
          className='username'
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </div>
    </form>
  );
};

export default Login;
