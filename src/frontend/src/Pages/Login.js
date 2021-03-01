import React from 'react'
import './Login.css';
import { auth, provider } from '../extras/firebase.js';
import { actionTypes } from '../extras/reducer.js';
import { useStateValue } from '../extras/stateProvider.js';


function Login() {

  const [state, dispatch] = useStateValue();

  function handleLogin() {
    auth.signInWithPopup(provider)
    .then((result) => {
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user
      })
    })
    .catch((error) => alert(error.message));
  }

  return (
    <div className="login__root">
      <h1> Login for Cray Coin wallet </h1>
      <button onClick={handleLogin} className="login__button"> Sign In </button>
    </div>
  )
}

export default Login
