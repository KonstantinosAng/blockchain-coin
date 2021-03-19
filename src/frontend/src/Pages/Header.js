import React, { useEffect } from 'react'
import './Header.css';
import { useStateValue } from '../extras/stateProvider.js';
import { actionTypes } from '../extras/reducer.js';

function Header() {

  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    var path;
    if (window.location.pathname === '/') {
      path = 'home';
    } else {
      path = window.location.pathname.replace('/', "");
    }
    document.getElementById('header__'+path).style.color = 'mediumslateblue';
  }, [])

  const signOut = () => {
    dispatch({
      type: actionTypes.UNSET_USER
    })
  }

  const redirect = (path) => {
    window.location.replace(path);
  }

  return (
    <div className="header__root">
      <h1 id="header__home" onClick={()=>redirect('/home')}> Home </h1>
      <h1 id="header__transact" onClick={()=>redirect('/transact')}> Transact </h1>
      <h1 id="header__profile" onClick={()=>redirect('/profile')}> Profile </h1>
      <h1 onClick={signOut}> Log out </h1>
    </div>
  )
}

export default Header
