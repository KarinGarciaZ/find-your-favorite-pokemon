import React, { Component } from 'react';

class ShowDataPokemon extends Component {

  state = {
    pokemon: {
      name: '',
      id: 0,
      height: 0,
      weight: 0,
      types: [],
      abilities: [],
      games: [],
      stats: [],
      moves: [],
      imageBack: [],
      imageFront: []
    }
  }

  componentDidMount() {
    this.searchPokemon();
  }

  searchPokemon = () => {
    fetch( `https://pokeapi.co/api/v2/pokemon/${this.props.match.params.id}/` )
      .then( res => res.json() )
      .catch( error => console.error('Error:', error) )
      .then( data => this.handleData(data) )
      .then( info => {
        this.setState({ pokemon: info });
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

    let types = null;
    if( this.state.pokemon.types ) {
      types = this.state.pokemon.types.map( element => {
        return <li key={element} className="list-group-item list-group-item-primary">{element}</li>
      })
    }

    let abilities = null;
    if( this.state.pokemon.abilities ) {
      abilities = this.state.pokemon.abilities.map( element => {
        return <li key={element} className="list-group-item list-group-item-dark">{element}</li>
      })
    }

    let games = null;
    if( this.state.pokemon.games ) {
      games = this.state.pokemon.games.map( element => {
        return <li className="list-group-item" style={{padding: '.25rem 1.25rem'}} key={element} >{element}</li>
      })
    }

    let moves1 = null;
    let moves2 = null;
    let moves3 = null;
    let moves = null;
    if( this.state.pokemon.moves ) {
      moves = this.state.pokemon.moves.map( element => {
        return <li key={element} >{element}</li>
      })
      moves1 = moves.slice( 0, moves.length/3 )
      moves2 = moves.slice( moves.length/3, moves.length/3*2 )
      moves3 = moves.slice( moves.length/3*2, moves.length)
    }

    return(
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-2'>
            <img src={this.state.pokemon.imageFront} alt="MyImage" />
            <img src={this.state.pokemon.imageBack} alt="MyImage" />
          </div>
          <div className='col-12 col-sm-6 col-md-2'>
            <label>Pokedex Number</label>
            <input type="text" className="form-control" value={this.state.pokemon.id} readOnly/><br/>
            <label>Height</label>
            <input type="text" className="form-control" value={this.state.pokemon.height} readOnly/>          
          </div>
          <div className='col-12 col-sm-6 col-md-3'>
            <label>Name</label>
            <input type="text" className="form-control" value={this.state.pokemon.name} readOnly/><br/>
            <label>Weight</label>
            <input type="text" className="form-control" value={this.state.pokemon.weight} readOnly/>          
          </div>
          <div className='col-12 col-sm-6 col-md-2'>
            <label>Types</label>
            <ul className="list-group">
              {types}
            </ul>
          </div>
          <div className='col-12 col-sm-6 col-md-3'>
            <label>Abilities</label>
            <ul className="list-group">
              {abilities}
            </ul>
          </div>
        </div>     
        <div className='row' style={{marginTop: '20px'}}>
          <div className='col-12 col-sm-6 col-md-3'>
            <label><strong>Games where appears</strong></label>
            <ul className="list-group list-group-flush">
              {games}
            </ul>
          </div>
          <div className='col-12 col-sm-6 col-md-3'>
            <label><strong>Moves</strong></label>
            <ul>
              {moves1}
            </ul>
          </div>
          <div className='col-12 col-sm-6 col-md-3'>
          <label><strong>Moves</strong></label>
            <ul>
              {moves2}
            </ul>
          </div>
          <div className='col-12 col-sm-6 col-md-3'>
          <label><strong>Moves</strong></label>
            <ul>
              {moves3}
            </ul>
          </div>
        </div> 
      </div>
    );
  }
}

export default ShowDataPokemon;