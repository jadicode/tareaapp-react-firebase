import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {auth} from './firebase';
import Navbar from './components/Navbar';
import Reset from './components/Reset';
import Login from './components/Login';
import Admin from './components/Admin';
import Inicio from './components/Inicio';


const App = () => {

  const [user, setUser] = React.useState(false);

  React.useEffect(()=> {
      auth.onAuthStateChanged(user=>{
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });
  }, []);

  return ( user !== false && (
    <Router>
        <div className="container">
          <Navbar user={user}/>
          <Switch>
            <Route path="/login"><Login/></Route>
            <Route path="/" exact><Inicio/></Route>
            <Route path="/admin"><Admin/></Route>
            <Route path="/reset"><Reset/></Route>
          </Switch>

        </div>  
    </Router>)
  );
}

export default App;
