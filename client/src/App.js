import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Link, Switch, Route} from "react-router-dom"
import HomePage from './components/HomePage';
import BackOffice from './components/BackOffice';
import NavBar from './components/NavBar';

class App extends React.Component {
  state ={
    
  } 
  render(){
    return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/backoffice">
        <BackOffice />
        </Route>
      </Switch>
    </Router>
  )};
}

export default App;
