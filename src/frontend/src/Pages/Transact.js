import React, { useEffect } from 'react'
import './Transact.css';
import axios from 'axios';

function Transact() {

  async function handleSubmit(event) {
    event.preventDefault();
    const sender = document.getElementsByClassName('transact__sender')[0].value;
    const receiver = document.getElementsByClassName('transact__receiver')[0].value;
    const amount = document.getElementsByClassName('transact__amount')[0].value;
    // await axios.post('/transact', {headers: {"Access-Control-Allow-Origin": "*"}, sender: s, receiver: r, amount: a})
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
