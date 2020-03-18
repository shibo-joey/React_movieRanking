import React, { Component } from 'react';
import './App.css';

import {Route, Redirect,Switch} from "react-router-dom";
import Movies from "./services/component/movie";
import Customers from "./services/component/customers";
import Rentals from "./services/component/rentals";
import NotFound from "./services/component/notFound";
import NavBar from './services/component/navBar';


class App extends Component {

  render() { 
    return ( 
  <React.Fragment>
              <NavBar />
              <main className = "container">
        <Switch>
              <Route path="/movies" component={Movies}/>
              <Route path="/customers" component={Customers}/>
              <Route path="/rentals" component={Rentals}/>
              <Route path="/not-found" component={NotFound}/>

              <Redirect from= "/" exact to="/movies"/>
              <Redirect to="/not-found"/>
        </Switch>
              </main>
  </React.Fragment>
     );
  }
}
 
export default App;