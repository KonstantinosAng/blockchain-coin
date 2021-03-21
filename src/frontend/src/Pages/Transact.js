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
    await axios.post('/transact', {headers: {"Access-Control-Allow-Origin": "*"}, sender: s, receiver: r, amount: a, key: k}).then((res)=>console.log(res))
  }

  return (
    <div className="transact__root">
      <div className="transact__container">
        <h2> Sender </h2>
        <input className="transact__sender" required/>
        <h2> Receiver </h2>
        <input className="transact__receiver" required/>
        <h2> Amount </h2>
        <input className="transact__amount" required/>
        <button onClick={(e)=>handleSubmit(e)} className="transact__button"> Transact </button>
      </div>
    </div>
  )
}

export default Transact
