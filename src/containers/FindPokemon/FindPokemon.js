import React, { Component } from 'react';
import PokemonToFind from '../../components/PokemonToFind/PokemonToFind';
import ShowDataPokemon from '../../components/ShowDataPokemon/ShowDataPokemon';
import PokemonImages from '../../components/PokemonImages/PokemonImages';
import { Route, Switch } from  'react-router-dom';

class FindPokemon extends Component {

  state = {
    pokemonToFind: '',
    disableButton: true,
    initialPokemons: [],
    pokemonShown: 0,
    loadAllPokemon: false
  }

  componentDidMount() {
    this.searchAllPokemons()
  }

  get4Pokemons = ( countPokemons ) => {
    let _4promises = [];
    for( let index = 0; index < 4; index++ ){
      _4promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonShown + index + 1}/`).then( res => res.json() )) 
    }

    Promise.all(_4promises)
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

      let allPokemonsUntilNow = this.state.initialPokemons.concat(pokemonInfoToUseArray);
      this.setState({ 
        initialPokemons: allPokemonsUntilNow,
        pokemonShown: this.state.pokemonShown + 4
       })

      if( this.state.pokemonShown < countPokemons )
        this.get4Pokemons( countPokemons );
    } )
  }

  searchAllPokemons = async () => {        
    this.get4Pokemons(56);   
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

  onClickCard = ( id ) => {
    this.props.history.push(`/pokemon/${id}`)  
  }

  clickImage = ( ) => {
    this.props.history.push(`/`)  
  }

  searchPokemon = ( ) => {    
    this.props.history.push(`/pokemon/${this.state.pokemonToFind}`)  
  }

  handlePokemonShown = ( ) => {
    this.get4Pokemons( 800 );
    this.setState({ loadAllPokemon: true })
  }
  
  render() {     
    let loadPokemons = <PokemonImages pokemons={this.state.initialPokemons} clickCard={this.onClickCard}/>;
    if( !this.state.loadAllPokemon && this.state.initialPokemons.length > 59 )      
        loadPokemons = <PokemonImages pokemons={this.state.initialPokemons.slice(0, 60)} clickCard={this.onClickCard}/>

    return(
      <div>
        <PokemonToFind     //This shows the main input and the button.
          name={this.state.pokemonToFind}
          valueChanged={this.onChangeValue} 
          clicked={this.searchPokemon} 
          clickedImage={this.clickImage}
          disableButton={this.state.disableButton}/><hr />

        <Switch>
          <Route path="/pokemon/:id" render={ ( props ) =>(  <ShowDataPokemon {...props}/> ) }/>
          <Route path="/" render={ () =>( loadPokemons ) }/>
        </Switch>

        {( !this.state.loadAllPokemon ) ? <div className='show-all'>
          <button className='botton show-all__btn' onClick={this.handlePokemonShown}>Show all pokemons</button>
        </div> : null}
      </div>
    )
  }
}

export default FindPokemon