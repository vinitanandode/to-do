import React from 'react';
import './App.css';
import Todo from './components/Todo'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './components/Login';

function App() {
  return (                  
      <Router>            
        <Switch>
            <Route path="/login">
                <Login/>                    
            </Route> 
            <Route path="/home" >
                <Todo/>                     
            </Route>
        </Switch>                             
      </Router>       
  );
}

export default App;
