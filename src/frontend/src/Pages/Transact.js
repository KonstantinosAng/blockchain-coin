import React, { useEffect } from 'react'
import './Transact.css';
import axios from 'axios';
import { useStateValue } from '../extras/stateProvider.js';


function Transact() {

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    async function keys() {
      if (user) {
        if (!localStorage.getItem('PubKey')) {
          if (!user.publicKey) {
            await axios.get('/generate_keys', {headers: {"Access-Control-Allow-Origin": "*"}}).then(res=> {
              const pubKey = res.data.split("$")[0];
              const priKey = res.data.split("$")[1];
              user.publicKey = pubKey;
              user.privateKey = priKey;
              localStorage.setItem('PubKey', JSON.stringify(pubKey))
              localStorage.setItem('PriKey', JSON.stringify(priKey))
            })
          }
        } else {
          user.publicKey = localStorage.getItem('PubKey');
          user.privateKey = localStorage.getItem('PriKey');
        }
      }
    }
    keys()
  }, [])

  async function handleSubmit(event) {
    event.preventDefault();
    const s = document.getElementsByClassName('transact__sender')[0].value;
    const r = document.getElementsByClassName('transact__receiver')[0].value;
    const a = document.getElementsByClassName('transact__amount')[0].value;
    const k = user.publicKey;
    const balance = JSON.parse(localStorage.getItem('balance'));
    if (parseFloat(a) > balance) {
      document.getElementById('transact__message').innerText = 'Not enough coins!';
      document.getElementById('transact__message').style.backgroundColor = 'rosybrown';
      document.getElementById('transact__message').style.display = 'flex';
      document.getElementById('transact__message').style.animation = 'fadeOut 5s';
    } else {
      await axios.post('/transact', {headers: {"Access-Control-Allow-Origin": "*"}, sender: s, receiver: r, amount: a, key: k}).then((res)=> {
        if (res.data === 'OK') {
          document.getElementById('transact__message').innerText = 'Transaction added!';
          document.getElementById('transact__message').style.backgroundColor = 'limegreen';
          document.getElementById('transact__message').style.display = 'flex';
          document.getElementById('transact__message').style.animation = 'fadeOut 2s';
        } else {
          document.getElementById('transact__message').innerText = 'Transaction failed!';
          document.getElementById('transact__message').style.backgroundColor = 'rosybrown';
          document.getElementById('transact__message').style.display = 'flex';
          document.getElementById('transact__message').style.animation = 'fadeOut 2s';
        }
      })
    }
  }

  function handleValidationDigits(event) {
    if (event.target.value === "") {
      document.getElementsByClassName('transact__amount')[0].style.backgroundColor = "white";
    } else {
      if (!isNaN(event.target.value)) {
        document.getElementsByClassName('transact__amount')[0].style.backgroundColor = "white";
      } else {
        document.getElementsByClassName('transact__amount')[0].style.backgroundColor = "#FF3366";
      }
    }
  }

  return (
    <div className="transact__root">
      <div className="transact__container">
        <h2> Sender </h2>
        <input value={user.displayName} className="transact__sender" readOnly/>
        <h2> Receiver </h2>
        <input className="transact__receiver" required/>
        <h2> Amount </h2>
        <input onChange={(event)=>handleValidationDigits(event)} className="transact__amount" required/>
        <button onClick={(e)=>handleSubmit(e)} className="transact__button"> Transact </button>
        <h3 id="transact__message" className="transaction__message"> Transaction added! </h3>
      </div>
    </div>
  )
}

export default Transact
