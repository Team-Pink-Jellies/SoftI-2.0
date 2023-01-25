import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../reducers/questionSlice';
import '../styles.css';

export default function Login() {
  const dispatch = useDispatch();

  return (
    <div className='login'>
      <h1 className='login-title'>Please Log In</h1>
      <form>
        <div className='container'>
          <button className='login-btn' onClick={() => dispatch(userLogin())}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
