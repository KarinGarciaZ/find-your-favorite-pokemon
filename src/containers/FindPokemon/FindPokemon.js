import React, { Component } from 'react';
import PokemonToFind from '../../components/PokemonToFind/PokemonToFind';
import ShowDataPokemon from '../../components/ShowDataPokemon/ShowDataPokemon';
import 'bootstrap/dist/css/bootstrap.min.css';

class FindPokemon extends Component {

  state = {
    pokemonToFind: '',
    pokemonData: {
    }
  }

  onChangeValue = ( event ) => {
    this.setState({ pokemonToFind: event.target.value })
  }

  searchPokemon = () => {
    fetch( `https://pokeapi.co/api/v2/pokemon/${this.state.pokemonToFind}/` )
      .then( res => res.json())
      .catch( error => console.error('Error:', error) )
      .then( data => {
        console.log('data: ', data);
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
        this.setState({ pokemonData: pokemonInfo });
      })
  }
  
  render() {
    console.log(this.state.pokemonData)
    return(
      <div>
        <PokemonToFind name={this.state.pokemonToFind} valueChanged={this.onChangeValue} clicked={this.searchPokemon}/><hr />
        <ShowDataPokemon data={this.state.pokemonData}/>
      </div>
    )
  }
}

export default FindPokemon