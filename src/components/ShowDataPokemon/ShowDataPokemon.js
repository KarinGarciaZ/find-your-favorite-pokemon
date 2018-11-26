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
      },
      damages: {
        doubleDamageFrom: [],
        doubleDamageTo: [],
        halfDamageFrom: [],
        halfDamageTo: [],
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
      .then( info => this.getDamages( info ))
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
      resolve( pokemonInfo );   
    })
  }

  getDamages = ( info ) => {
    let promises = [];
    for( let index = 0; index < info.types.length; index++ ){
      promises.push(
        fetch(`https://pokeapi.co/api/v2/type/${info.types[index]}/`)
        .then( res => res.json() )
        ) 
    }

    let allDamages = {
      doubleDamageFrom: [],
      doubleDamageTo: [],
      halfDamageFrom: [],
      halfDamageTo: []
    }

    Promise.all( promises )
      .then( damages => {
        damages.forEach( damage => {
          allDamages.doubleDamageFrom = allDamages.doubleDamageFrom.concat( damage.damage_relations.double_damage_from.map( type => type.name ));
          allDamages.doubleDamageTo = allDamages.doubleDamageTo.concat( damage.damage_relations.double_damage_to.map( type => type.name ));
          allDamages.halfDamageFrom = allDamages.halfDamageFrom.concat( damage.damage_relations.half_damage_from.map( type => type.name ));
          allDamages.halfDamageTo = allDamages.halfDamageTo.concat( damage.damage_relations.half_damage_to.map( type => type.name ));
        })

        allDamages.doubleDamageFrom = allDamages.doubleDamageFrom.filter( (item, index, self) =>  self.indexOf(item) === index);
        allDamages.doubleDamageTo = allDamages.doubleDamageTo.filter( (item, index, self) =>  self.indexOf(item) === index);
        allDamages.halfDamageFrom = allDamages.halfDamageFrom.filter( (item, index, self) =>  self.indexOf(item) === index);
        allDamages.halfDamageTo = allDamages.halfDamageTo.filter( (item, index, self) =>  self.indexOf(item) === index);
        
        info.damages = allDamages;
        this.setState( { pokemon: info } )
      })
  }

  /*manageLists = () => {
    let types = null;
    if( this.state.pokemon.types ) {
      types = this.state.pokemon.types.map( element => {
        return <li key={element} className={element}>{element}</li>
      })
    }

    let doubleDamageFrom = null;
    if( this.state.pokemon.damages.doubleDamageFrom ) {
      doubleDamageFrom = this.state.pokemon.damages.doubleDamageFrom.map( element => {
        return <li key={element} className={element}>{element}</li>
      })
    }

    let doubleDamageTo = null;
    if( this.state.pokemon.damages.doubleDamageTo ) {
      doubleDamageTo = this.state.pokemon.damages.doubleDamageTo.map( element => {
        return <li key={element} className={element}>{element}</li>
      })
    }

    let halfDamageFrom = null;
    if( this.state.pokemon.damages.halfDamageFrom ) {
      halfDamageFrom = this.state.pokemon.damages.halfDamageFrom.map( element => {
        return <li key={element} className={element}>{element}</li>
      })
    }

    let halfDamageTo = null;
    if( this.state.pokemon.damages.halfDamageTo ) {
      halfDamageTo = this.state.pokemon.damages.halfDamageTo.map( element => {
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
  }*/

  render() {

    let types = null;
    if( this.state.pokemon.types ) {
      types = this.state.pokemon.types.map( element => {
        return <li key={element} className={element}>{element}</li>
      })
    }

    let doubleDamageFrom = null;
    if( this.state.pokemon.damages.doubleDamageFrom ) {
      doubleDamageFrom = this.state.pokemon.damages.doubleDamageFrom.map( element => {
        return <li key={element} className={element}>{element}</li>
      })
    }

    let doubleDamageTo = null;
    if( this.state.pokemon.damages.doubleDamageTo ) {
      doubleDamageTo = this.state.pokemon.damages.doubleDamageTo.map( element => {
        return <li key={element} className={element}>{element}</li>
      })
    }

    let halfDamageFrom = null;
    if( this.state.pokemon.damages.halfDamageFrom ) {
      halfDamageFrom = this.state.pokemon.damages.halfDamageFrom.map( element => {
        return <li key={element} className={element}>{element}</li>
      })
    }

    let halfDamageTo = null;
    if( this.state.pokemon.damages.halfDamageTo ) {
      halfDamageTo = this.state.pokemon.damages.halfDamageTo.map( element => {
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
        return <li key={element} >{element}</li>
      })
    }

    let moves = null;
    if( this.state.pokemon.moves ) {
      moves = this.state.pokemon.moves.map( element => {
        return <li key={element} >{element}</li>
      })
    }

    return(
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-3'>
            <div className='images'>
              <div className='images__pokemon images__default'>
                <p className='images__type normal-pok'>Normal</p>
                <img src={this.state.pokemon.images.front} className='images__img' alt="Front" />
                {(this.state.pokemon.images.back) ? <img src={this.state.pokemon.images.back} className='images__img' alt="Back" />: null}
              </div>

            {(this.state.pokemon.images.frontShiny) ? 
              <div className='images__pokemon images__shiny'>
                <p className='images__type shiny'>Shiny</p>
                <img src={this.state.pokemon.images.frontShiny} className='images__img' alt="Front" />
                {(this.state.pokemon.images.backShiny) ? <img src={this.state.pokemon.images.backShiny} className='images__img' alt="Bank" /> : null}
              </div>      
            : null}     
              
            </div>
          </div>
          
          <div className='col-6 col-md-2'>

            <div className='form-infos'>
              <label>Pokedex</label>
              <div className="form-infos__input">{this.state.pokemon.id}</div>
              <label>Height</label>
              <div className="form-infos__input">{this.state.pokemon.height}</div>         
            </div>

            <div className='types'>
              <label>Types</label>
              <ul className="types__list-types">
                {types}
              </ul>
            </div>   
            
          </div>
          
          <div className='col-6 col-md-3'>
            <div className='form-infos'>

              <label>Name</label>
              <div className="form-infos__input capitalize">{this.state.pokemon.name}</div>
              <label>Weight</label>
              <div className="form-infos__input">{this.state.pokemon.weight}</div>   

              <div className='abilities'>
                <label>Abilities</label>
                <ul className="abilities__list-abilities">
                  {abilities}
                </ul>
              </div>               

            </div>          
          </div>

          <div className='col-12 col-md-4'>

            <div className='types-damage'>
              <label>Double damage to</label>
              <ul className="types-damage__list-types">
                {doubleDamageTo}
              </ul>
            </div>   

            <div className='types-damage'>
              <label>Double damage from</label>
              <ul className="types-damage__list-types">
                {doubleDamageFrom}
              </ul>
            </div> 

            <div className='types-damage'>
              <label>Half damage from</label>
              <ul className="types-damage__list-types">
                {halfDamageFrom}
              </ul>
            </div> 

            <div className='types-damage'>
              <label>Half damage to</label>
              <ul className="types-damage__list-types">
                {halfDamageTo}
              </ul>
            </div>

          </div>
        </div>

        <div className='row'>
          <div className='col-12 col-md-3'>
            <div className='videogames'>  
              <label><strong>Games where appears</strong></label>                        
              <ul className="videogames__list">
                {games}
              </ul>
            </div>            
          </div>
          <div className='col-12 col-md-9'>
            <div className='moves'>
              <label><strong>Moves</strong></label>
              <ul className="moves__list">
                {moves}
              </ul>
            </div>            
          </div>
        </div> 
      </div>
    );
  }
}

export default ShowDataPokemon;