import React from 'react'
import './Header.css';
import { useStateValue } from '../extras/stateProvider.js';
import { actionTypes } from '../extras/reducer.js';

function Header() {

  const [{user}, dispatch] = useStateValue();

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
      <h3 onClick={()=>redirect('/home')}> Home </h3>
      <h3 onClick={()=>redirect('/transact')}> Transact </h3>
      <h3 onClick={()=>redirect('/profile')}> Profile </h3>
      <h3 onClick={signOut}> Log out </h3>
    </div>
  )
}

export default Header
