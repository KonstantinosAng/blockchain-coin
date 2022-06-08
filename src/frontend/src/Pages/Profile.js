import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useStateValue } from "../extras/stateProvider.js";
import axios from "axios";

function Profile() {
  //eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();
  const [ammount, setAmmount] = useState("");
  const [signedName, setSignedName] = useState("");

  useEffect(() => {
    async function getBalanceData() {
      await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/balance`, {
          headers: { "Access-Control-Allow-Origin": "*" },
          data: user.displayName,
        })
        .then((res) => {
          var amount = 0;
          if (res.data.length >= 0) {
            amount = res.data
              .replace(user.displayName, "")
              .replace("->", "")
              .replace("balance", "")
              .trim();
            setSignedName(user.displayName);
            setAmmount(amount);
          } else {
            setSignedName("");
            setAmmount(amount);
          }
          localStorage.setItem("balance", JSON.stringify(amount));
        })
        .catch((error) => console.error(error));
    }
    getBalanceData();
  }, [user.displayName]);

  return (
    <div className="profile__root">
      <div className="profile__container">
        <img alt="profile" src={user.photoURL} />
        <div className="profile__root__column">
          <h2> {user.displayName} </h2>
          <h2> Signed name: {signedName} </h2>
          <h2> Amount: {ammount} cray coins </h2>
          <h2> Public Key </h2>
          <input value={user.publicKey} />
          <h2> Private Key </h2>
          <input value={user.privateKey} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
