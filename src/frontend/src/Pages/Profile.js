import React, { useEffect, useState } from 'react'
import './Profile.css';
import { useStateValue } from '../extras/stateProvider.js';
import axios from 'axios';

function Profile() {

  const [{user}, dispatch] = useStateValue();
  const [ammount, setAmmount] = useState('');
  const [signedName, setSignedName] = useState('');

  useEffect(async () => {
    await axios.post('/balance', {headers: {"Access-Control-Allow-Origin": "*"}, data: user.displayName}).then(res=> {
      if (res.data.length >= 0) {
        setSignedName(user.displayName);
        setAmmount(Number((res.data).match(/\d+$/)));
      } else {
        setSignedName('');
        setAmmount('0');
      }
    })
  }, [])

  return (
    <div className="profile__root">
      <div className="profile__container">
        <img alt="profile picture" src={user.photoURL}/>
        <div className="profile__root__column">
          <h2> {user.displayName} </h2>
          <h2> Signed name: {signedName} </h2>
          <h2> Ammount: {ammount} cray coins </h2>
          <h2> Public Key: {user.publicKey} </h2>
          <h2> Private Key: {user.privateKey} </h2>
        </div>
      </div>
    </div>
  )
}

export default Profile
