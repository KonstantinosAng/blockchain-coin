import './App.css';
import Header from './Pages/Header.js';
import Home from './Pages/Home.js';
import Login from './Pages/Login.js';
import { useStateValue } from './extras/stateProvider.js';
import { useEffect } from 'react';
import { auth } from './extras/firebase.js';
import { actionTypes } from './extras/reducer.js';


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
    <div className="App">
      {!user? <Login/> : (
        <>
        <Header />
        <Home />
        </>
      )}
    </div>
  );
}

export default App;
