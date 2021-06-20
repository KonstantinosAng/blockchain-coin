import React, { useState, useEffect } from 'react'
import './Home.css';
import axios from 'axios';


function Home() {

  const [chain, setChain] = useState([]);

  useEffect(() => {
    async function getData() {
      await axios.get('/home', {headers: {"Access-Control-Allow-Origin": "*"}}).then((response)=>{
        setChain(response.data.split("#"));
      })
    }
    getData();
  }, [])
  
  function truncate_string(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." + str.substr(str.length-20, str.length): str;
  }

  function handleBlockDetail(element) {
    const blockId = element.split("%")[0];
    if (document.getElementById('hashSender'+blockId).innerText === 'Hash') {
      document.getElementById('hashSender'+blockId).innerText = 'Sender';
      document.getElementById('hashSenderValue'+blockId).innerText = element.split("%")[4];
      document.getElementById('hashReceiver'+blockId).innerText = 'Receiver';
      document.getElementById('hashReceiverValue'+blockId).innerText = element.split("%")[5];
      document.getElementById('timeAmount'+blockId).innerText = 'Amount';
      document.getElementById('timeAmountValue'+blockId).innerText = element.split("%")[6];
    } else {
      document.getElementById('hashSender'+blockId).innerText = 'Hash';
      document.getElementById('hashSenderValue'+blockId).innerText = truncate_string(element.split("%")[1], 20);
      document.getElementById('hashReceiver'+blockId).innerText = 'Previous Hash';
      document.getElementById('hashReceiverValue'+blockId).innerText = truncate_string(element.split("%")[2], 20);
      document.getElementById('timeAmount'+blockId).innerText = 'Time';
      document.getElementById('timeAmountValue'+blockId).innerText = element.split("%")[3];
    }
  }

  function handleOverlayShow(element) {
    document.getElementsByClassName(`home__block__overlay${element.split("%")[0]}`)[0].style.display = 'flex';
    document.getElementsByClassName(`home__block${element.split("%")[0]}`)[0].style.color = 'rgba(255, 255, 255, 10%)';

  }

  function handleOverlayHide(element) {
    document.getElementsByClassName(`home__block__overlay${element.split("%")[0]}`)[0].style.display = 'none';
    document.getElementsByClassName(`home__block${element.split("%")[0]}`)[0].style.color = 'rgba(255, 255, 255, 100%)'
  }

  return (
    <div className="home__root">
      <div className="home__finished">
        <h2> Completed Transactions </h2>
        {chain.map((element) => (
          <div key={`home__block${element.split("%")[0]}`} onMouseOut={()=>handleOverlayHide(element)} onMouseOver={()=>handleOverlayShow(element)} onClick={()=>handleBlockDetail(element)} className={`home__block home__block${element.split("%")[0]}`}>
            <h2> Block {element.split("%")[0]} </h2>
            <h3 id={`hashSender${element.split("%")[0]}`}> Hash </h3>
            <h5 id={`hashSenderValue${element.split("%")[0]}`}> {truncate_string(element.split("%")[1], 20)} </h5>
            <h3 id={`hashReceiver${element.split("%")[0]}`}> Previous Hash </h3>
            <h5 id={`hashReceiverValue${element.split("%")[0]}`}> {truncate_string(element.split("%")[2], 20)} </h5>
            <h3 id={`timeAmount${element.split("%")[0]}`}> Time </h3>
            <h5 id={`timeAmountValue${element.split("%")[0]}`}> {element.split("%")[3]} </h5>
            <div className={`home__block__overlay home__block__overlay${element.split("%")[0]}`}> Click for more details </div>
          </div>
        ))}   
      </div>
    </div>
  )
}

export default Home
