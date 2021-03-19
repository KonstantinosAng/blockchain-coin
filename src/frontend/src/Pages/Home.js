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

  return (
    <div className="home__root">
      {chain.map((element) => (
        <div className="home__block">
          <h2> Block {element.split("%")[0]} </h2>
          <h3> Hash </h3>
          <h5> {truncate_string(element.split("%")[1], 20)} </h5>
          <h3> Previous Hash </h3>
          <h5> {truncate_string(element.split("%")[2], 20)} </h5>
          <h3> Time </h3>
          <h5> {element.split("%")[3]} </h5>
        </div>
      ))}   
    </div>
  )
}

export default Home
