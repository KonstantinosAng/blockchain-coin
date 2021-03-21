import React, { useEffect } from 'react'
import './Mine.css';
import axios from 'axios';

function Mine() {

  useEffect(() => {
    async function getPendingTransacs() {
      await axios.get('/pendingTransactions', {headers: {"Access-Control-Allow-Origin": "*"}}).then((res) => {
        console.log(res.data);
      })
    }
    getPendingTransacs()
  }, [])

  return (
    <div className="mine__root">
      <div className="mine__container">
        <h2> Pending Transactions </h2>
      </div>
    </div>
  )
}

export default Mine
