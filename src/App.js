import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FindPokemon from '../src/containers/FindPokemon/FindPokemon';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      // I use Route to get into project if the route starts with http://localhost:3000/
      <BrowserRouter>
        <Route path="/" component={FindPokemon}/>
      </BrowserRouter>
    );
  }
}

export default App;
