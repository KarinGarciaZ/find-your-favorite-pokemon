import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FindPokemon from '../src/containers/FindPokemon/FindPokemon';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={FindPokemon}/>
      </BrowserRouter>
    );
  }
}

export default App;
