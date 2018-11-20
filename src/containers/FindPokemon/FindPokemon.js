import React, { Component } from 'react';
import PokemonToFind from '../../components/PokemonToFind/PokemonToFind';
import ShowDataPokemon from '../../components/ShowDataPokemon/ShowDataPokemon';
import PokemonImages from '../../components/PokemonImages/PokemonImages';

class FindPokemon extends Component {

  state = {
    pokemonToFind: '',
    pokemonData: {},
    showData: false,
    disableButton: true
  }

  /*This function is called everytime the main input changes,
  I set the value of the input to state.pokemonToFind, if the 
  input's values is empty then I disable the button to search.*/
  onChangeValue = ( event ) => {
    if ( event.target.value === '' )
      this.setState({ pokemonToFind: event.target.value, disableButton: true })
    else
      this.setState({ pokemonToFind: event.target.value, disableButton: false })
  }

  /*Here I make a request to the API, I concatenate the state.pokemonToFind value.
  In the second .then, once I have the data to handle, I call the method handleData()
  which I send the data and it returns the information I want to show to the user 
  and I set it into state.pokemonData.*/
  searchPokemon = () => {
    fetch( `https://pokeapi.co/api/v2/pokemon/${this.state.pokemonToFind}/` )
      .then( res => res.json() )
      .catch( error => console.error('Error:', error) )
      .then( data => this.handleData(data) )
      .then( info => {
        this.setState({ pokemonData: info, showData: true });
      })
  }

  /*This method returns a promise which contains the information I want to
  show to the user.*/
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
      <div>
        <PokemonToFind     //This shows the main input and the button.
          name={this.state.pokemonToFind}
          valueChanged={this.onChangeValue} 
          clicked={this.searchPokemon} 
          disableButton={this.state.disableButton}/><hr />

        { //this shows the pokemon information.
          ( this.state.showData ) ? <ShowDataPokemon data={this.state.pokemonData}/>: <PokemonImages /> 
        }
      </div>
    )
  }
}

export default FindPokemon