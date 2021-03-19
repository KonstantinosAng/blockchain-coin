import './App.css';
import Header from './Pages/Header.js';
import Home from './Pages/Home.js';
import Login from './Pages/Login.js';
import Profile from './Pages/Profile.js';
import Transact from './Pages/Transact.js';
import NotFound from './Pages/NotFound.js';
import { useStateValue } from './extras/stateProvider.js';
import { useEffect } from 'react';
import { auth } from './extras/firebase.js';
import { actionTypes } from './extras/reducer.js';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import axios from 'axios';


function App() {

  const [{user}, dispatch] = useStateValue();

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
  }, [user])

  useEffect(() => {
    const authorization = auth.onAuthStateChanged((Auth) => {
      if (Auth) {
        dispatch({
          type: actionTypes.SET_USER,
          user: Auth
        })
      } else {
        dispatch({
          type: actionTypes.UNSET_USER,
          user: null
        })
      }
    })
    return authorization;
  }, [])

  return (
    <div className="app">
      {!user ? <Login /> :
      <>
        <Header />
        <Router>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/home' exact component={Home}/>
            <Route path='/profile' exact component={Profile}/>
            <Route path='/transact' exact component={Transact}/>
            <Route component={NotFound} />
          </Switch>
        </Router>
      </>
      }
    </div>
  );
}

export default App;
