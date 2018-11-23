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
      images: {
        front: '',
        back: '',
        backShiny: '',
        frontShiny: '',
      }      
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.searchPokemon( id );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      const id = nextProps.match.params.id
      this.searchPokemon( id );
    }
  }

  searchPokemon = ( id ) => {
    fetch( `https://pokeapi.co/api/v2/pokemon/${id}/` )
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
      let images = {}
      images.front = info.sprites.front_default;
      images.back = info.sprites.back_default;   
      images.frontShiny = info.sprites.front_shiny;
      images.backShiny = info.sprites.back_shiny; 
      pokemonInfo.images = images;
      console.log(info)
      resolve( pokemonInfo );   
    })
  }

  manageData = ( ) => {
    
  }

  render() {

    let types = null;
    if( this.state.pokemon.types ) {
      types = this.state.pokemon.types.map( element => {
        return <li key={element} className={element}>{element}</li>
      })
    }

    let abilities = null;
    if( this.state.pokemon.abilities ) {
      abilities = this.state.pokemon.abilities.map( element => {
        return <li key={element}>{element}</li>
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
          <div className='col-12 col-md-3'>
            <div className='images'>
              <div className='images__pokemon images__default'>
                <p className='images__type normal-pok'>Normal</p>
                <img src={this.state.pokemon.images.front} className='images__img' alt="Front" />
                <img src={this.state.pokemon.images.back} className='images__img' alt="Back" />
              </div>

              <div className='images__pokemon images__shiny'>
                <p className='images__type shiny'>Shiny</p>
                <img src={this.state.pokemon.images.frontShiny} className='images__img' alt="Front" />
                <img src={this.state.pokemon.images.backShiny} className='images__img' alt="Bank" />
              </div>           
              
            </div>
          </div>
          <div className='col-6 col-md-2'>

            <div className='form-infos'>
              <label>Pokedex</label>
              <div className="form-infos__input">{this.state.pokemon.id}</div>
              <label>Height</label>
              <div className="form-infos__input">{this.state.pokemon.height}</div>         
            </div>
            
          </div>
          <div className='col-6 col-md-2'>
            <div className='form-infos'>

              <label>Name</label>
              <div className="form-infos__input capitalize">{this.state.pokemon.name}</div>
              <label>Weight</label>
              <div className="form-infos__input">{this.state.pokemon.weight}</div>   

            </div>          
          </div>
          <div className='col-6 col-md-2'>
            <div className='types'>
              <label>Types</label>
              <ul className="types__list-types">
                {types}
              </ul>
            </div>            
          </div>
          <div className='col-6 col-md-3'>
            <div className='abilities'>
              <label>Abilities</label>
              <ul className="abilities__list-abilities">
                {abilities}
              </ul>
            </div>            
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