import React, { useEffect, useState } from 'react'
import './Mine.css';
import axios from 'axios';
import { useStateValue } from '../extras/stateProvider.js';


function Mine() {

  const [data, setData] = useState([])
  const [overlay, setOverlay] = useState(false)
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    async function getPendingTransacs() {
      await axios.get('/pendingTransactions', {headers: {"Access-Control-Allow-Origin": "*"}}).then((res) => {
        setData(res.data.split("#"))
      })
    }
    getPendingTransacs()
  }, [])

  function truncate_string(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." + str.substr(str.length-20, str.length): str;
  }

  function handleOverlayShow(element) {
    document.getElementsByClassName(`mine__block__overlay${element.split("%")[4]}`)[0].style.display = 'flex';
    document.getElementsByClassName(`mine__block${element.split("%")[4]}`)[0].style.color = 'rgba(255, 255, 255, 10%)';
    Array.from(document.getElementsByClassName(`overlay__h5${element.split("%")[4]}`)).forEach(h5 => {
      h5.style.color = 'rgba(255,255,255,10%)';
    });
    setOverlay(true)
  }

  function handleOverlayHide(element) {
    document.getElementsByClassName(`mine__block__overlay${element.split("%")[4]}`)[0].style.display = 'none';
    document.getElementsByClassName(`mine__block${element.split("%")[4]}`)[0].style.color = 'rgba(255, 255, 255, 100%)'
    Array.from(document.getElementsByClassName(`overlay__h5${element.split("%")[4]}`)).forEach(h5 => {
      h5.style.color = 'mediumpurple';
    });
    setOverlay(false)
  }

  async function handleMining(hash) {
    await axios.post('/mining', {headers: {"Access-Control-Allow-Origin": "*"}, hash: hash, miner: user.displayName}).then((res)=>console.log('OK'))
  }

  return (
    <div className="mine__root">
      <div className="mine__container">
        <h2> Pending Transactions </h2>
        {data[0]!==""?data?.map((element) => (
          <div onClick={()=>handleMining(element.split("%")[4])} key={`mine__block${element.split("%")[4]}`} onMouseOver={()=>handleOverlayShow(element)} onMouseOut={()=>handleOverlayHide(element)} className={`mine__block mine__block${element.split("%")[4]}`}>
            <h2> Pending Transaction </h2>
            <div className="block__row">
              <div className="block__col">
                <h3> Sender </h3>
                <h5 className={`overlay__h5${element.split("%")[4]}`}> {element.split("%")[0]} </h5>
              </div>
              <div className="block__col">
                <h3> Receiver </h3>
                <h5 className={`overlay__h5${element.split("%")[4]}`}> {element.split("%")[1]} </h5>
              </div>
            </div>
            <div className="block__row">
              <div className="block__col">
                <h3> Amount </h3>
                <h5 className={`overlay__h5${element.split("%")[4]}`}> {element.split("%")[2]} </h5>
              </div>
              <div className="block__col">
                <h3> Time </h3>
                <h5 className={`overlay__h5${element.split("%")[4]}`}> {element.split("%")[3]} </h5>
              </div>
            </div>
            <h3> Hash </h3>
            <h5 className={`overlay__h5${element.split("%")[4]}`}> {truncate_string(element.split("%")[4], 20)} </h5>
            <h3> Validation </h3>
            <h5 className={`overlay__h5${element.split("%")[4]}`}> {element.split("%")[5]} </h5>
            <div onClick={()=>handleMining(element.split("%")[4])} className={`mine__block__overlay mine__block__overlay${element.split("%")[4]}`}> Click to mine </div>
          </div>
        )) :
        <div className="mine__no__transactions">
          <h2> No Pending Transactions</h2>
          <button onClick={()=>window.location.replace('/transact')}> Make a transaction </button>
        </div>
        }   
      </div>
    </div>
  )
}

export default Mine