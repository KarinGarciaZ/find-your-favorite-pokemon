import React, { Component } from 'react';
import PokemonToFind from '../../components/PokemonToFind/PokemonToFind';
import ShowDataPokemon from '../../components/ShowDataPokemon/ShowDataPokemon';
import PokemonImages from '../../components/PokemonImages/PokemonImages';

class FindPokemon extends Component {

  state = {
    pokemonToFind: '',
    pokemonData: {},
    showData: false,
    disableButton: true,
    initialPokemons: []
  }

  componentDidMount() {
    this.searchAllPokemons()
  }

  searchAllPokemons = async () => {

    let res = await fetch( `https://pokeapi.co/api/v2/pokemon/` )
    let data = await res.json()
        
    let arrayNames = [];
    arrayNames = data.results.map( pokemon => pokemon.name );
    arrayNames = arrayNames.splice(0, arrayNames.length -57);

    let promises = [];
    arrayNames.forEach( element => {
      promises.push(
        fetch(`https://pokeapi.co/api/v2/pokemon/${element}/`)
        .then( res => res.json() )
        )      
    })

    Promise.all(promises)
    .then( arrayRes => {
      let pokemonInfoToUseArray = [];
      pokemonInfoToUseArray = arrayRes.map( eachPokemon => {
        let pokemonInfoToUse = {};
        pokemonInfoToUse.name = eachPokemon.name;
        pokemonInfoToUse.id = eachPokemon.id;
        pokemonInfoToUse.img = eachPokemon.sprites.front_default;
        pokemonInfoToUse.types = eachPokemon.types;

        return pokemonInfoToUse;
      } )
      this.setState({ initialPokemons: pokemonInfoToUseArray })
    } )
    
    
  }

  generateRandomNumber = (  ) => {
    return new Promise( resolve => {
      let numbers = [];
      for (let index = 0; index < 100; index++) {
        let number = Math.random() * 800;
        numbers.push(Math.round(number)+1);      
      } 
      resolve(numbers)
    })     
  }

  onChangeValue = ( event ) => {
    if ( event.target.value === '' )
      this.setState({ pokemonToFind: event.target.value, disableButton: true })
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
      <div>
        <PokemonToFind     //This shows the main input and the button.
          name={this.state.pokemonToFind}
          valueChanged={this.onChangeValue} 
          clicked={this.searchPokemon} 
          disableButton={this.state.disableButton}/><hr />

        { //this shows the pokemon information.
          ( this.state.showData ) ? <ShowDataPokemon data={this.state.pokemonData}/>: <PokemonImages pokemons={this.state.initialPokemons}/> 
        }
      </div>
    )
  }
}

export default FindPokemon