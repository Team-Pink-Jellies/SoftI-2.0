import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { userLogin } from '../reducers/questionSlice';
import '../styles.css';
import { createUser } from '../reducers/userSlice';

const Join = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleJoin = async (e) => {
    e.preventDefault();

    try {
      const handleNewUser = await dispatch(createUser({ username, password }));
      console.log('User was successfully created.');
      navigate('/home');
    } catch (exception) {
      console.log('User could not be created.');
    }
  };

  return (
    <form onSubmit={handleJoin}>
      <div className='auth-join'>
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

export default Join;
