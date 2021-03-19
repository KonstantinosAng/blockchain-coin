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
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';


function App() {

  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    const authorization = auth.onAuthStateChanged((Auth) => {
      if (Auth) {
        console.log(Auth);
        dispatch({
          type: actionTypes.SET_USER,
          user: Auth
        })
      } else {
        dispatch({
          type: actionTypes.UNSET_USER
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
