import React, { useEffect } from 'react'
import './Header.css';
import { useStateValue } from '../extras/stateProvider.js';
import { actionTypes } from '../extras/reducer.js';
import { auth } from '../extras/firebase.js';

function Header() {
  //eslint-disable-next-line
  const [{user}, dispatch] = useStateValue();
  useEffect(() => {
    var path;
    if (window.location.pathname.replace('/craycoin', '') === '/' || window.location.pathname.replace('/craycoin', '') === "") {
      path = 'home';
    } else {
      path = window.location.pathname.replace('/craycoin', '').replace('/', "");
    }
    document.getElementById('header__'+path).style.color = 'mediumslateblue';
  }, [])

  const signOut = () => {
    localStorage.removeItem('user');
	  auth.signOut();
    dispatch({
      type: actionTypes.UNSET_USER
    })
  }

  const redirect = (path) => {
    window.location.replace(path);
  }

  return (
    <div className="header__root">
      <h1 id="header__home" onClick={()=>redirect('/craycoin/home')}> Home </h1>
      <h1 id="header__transact" onClick={()=>redirect('/craycoin/transact')}> Transact </h1>
      <h1 id="header__mine" onClick={()=>redirect('/craycoin/mine')}> Mine </h1>
      <h1 id="header__profile" onClick={()=>redirect('/craycoin/profile')}> Profile </h1>
      <h1 onClick={signOut}> Log out </h1>
    </div>
  )
}

export default Header
