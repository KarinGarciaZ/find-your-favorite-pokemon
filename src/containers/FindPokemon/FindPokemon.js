import React, { Component } from 'react';
import PokemonToFind from '../../components/PokemonToFind/PokemonToFind';
import ShowDataPokemon from '../../components/ShowDataPokemon/ShowDataPokemon';
import 'bootstrap/dist/css/bootstrap.min.css';

class FindPokemon extends Component {

  state = {
    pokemonToFind: '',
    pokemonData: {},
    showData: false,
    disableButton: true
  }

  onChangeValue = ( event ) => {
    if ( event.target.value === '' )
      this.setState({ pokemonToFind: event.target.value })
    else
      this.setState({ pokemonToFind: event.target.value, disableButton: false })
  }

  searchPokemon = () => {
    fetch( `https://pokeapi.co/api/v2/pokemon/${this.state.pokemonToFind}/` )
      .then( res => res.json() )
      .catch( error => console.error('Error:', error) )
      .then( data => this.handleData(data) )
      .then( info => {
        this.setState({ pokemonData: info, showData: true });
      })
  }

  handleData = ( data ) => {
    return new Promise( resolve => {
      let info = {...data};
      let pokemonInfo = {};
      pokemonInfo.name = info.forms[0].name;        
      pokemonInfo.id = info.id;        
      pokemonInfo.height = info.height;
      pokemonInfo.weight = info.weight;
      pokemonInfo.types = info.types.map( element => {
        return element.type.name
      });
      pokemonInfo.abilities = info.abilities.map( element => {
        return element.ability.name
      });
      pokemonInfo.games = info.game_indices.map( element => {
        return element.version.name
      });
      pokemonInfo.stats = info.stats.map( element => {
        return element.stat.name
      });
      pokemonInfo.moves = info.moves.map( element => {
        return element.move.name
      });
      pokemonInfo.imageFront = info.sprites.front_default;
      pokemonInfo.imageBack = info.sprites.back_default;   

      resolve( pokemonInfo );   
    })
  }
  
  render() {
    return(
      <div style={{ marginTop:'20px' }}>
        <PokemonToFind 
          name={this.state.pokemonToFind} 
          valueChanged={this.onChangeValue} 
          clicked={this.searchPokemon} 
          disableButton={this.state.disableButton}/><hr />

        {( this.state.showData ) ? <ShowDataPokemon data={this.state.pokemonData}/>: null }
      </div>
    )
  }
}

export default FindPokemon