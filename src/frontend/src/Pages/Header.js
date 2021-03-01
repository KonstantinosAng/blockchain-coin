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

  return (
    <div className="header__root">
      <h3 href="/"> Home </h3>
      <h3 href="/transact"> Transact </h3>
      <h3 href="/profile"> Profile </h3>
      <h3 onClick={signOut}> Log out </h3>
    </div>
  )
}

export default Header
