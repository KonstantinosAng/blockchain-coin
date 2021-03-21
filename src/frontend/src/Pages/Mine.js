import React, { useEffect, useState } from 'react'
import './Mine.css';
import axios from 'axios';

function Mine() {

  const [data, setData] = useState([])

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
    document.getElementsByClassName(`home__block__overlay${element.split("%")[0]}`)[0].style.display = 'flex';
    document.getElementsByClassName(`home__block${element.split("%")[0]}`)[0].style.color = 'rgba(255, 255, 255, 10%)';
  }

  function handleOverlayHide(element) {
    document.getElementsByClassName(`home__block__overlay${element.split("%")[0]}`)[0].style.display = 'none';
    document.getElementsByClassName(`home__block${element.split("%")[0]}`)[0].style.color = 'rgba(255, 255, 255, 100%)'
  }

  return (
    <div className="mine__root">
      <div className="mine__container">
        <h2> Pending Transactions </h2>
        {data?.map((element) => (
          <div className={`mine__block mine__block${element.split("%")[4]}`}>
            <h2> Pending Transaction </h2>
            <div className="block__row">
              <div className="block__col">
                <h3> Sender </h3>
                <h5> {element.split("%")[0]} </h5>
              </div>
              <div className="block__col">
                <h3> Receiver </h3>
                <h5> {element.split("%")[1]} </h5>
              </div>
            </div>
            <div className="block__row">
              <div className="block__col">
                <h3> Amount </h3>
                <h5> {element.split("%")[2]} </h5>
              </div>
              <div className="block__col">
                <h3> Time </h3>
                <h5> {element.split("%")[3]} </h5>
              </div>
            </div>
            <h3> Hash </h3>
            <h5> {truncate_string(element.split("%")[4], 20)} </h5>
            <h3> Validation </h3>
            <h5> {element.split("%")[5]} </h5>
            <div className={`mine__block__overlay mine__block__overlay${element.split("%")[4]}`}> Click to mine </div>
          </div>
        ))}   
      </div>
    </div>
  )
}

export default Mine
