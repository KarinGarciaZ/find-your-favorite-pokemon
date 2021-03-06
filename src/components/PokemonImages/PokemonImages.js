import React, { Component } from 'react';

class PokemonImages extends Component {

  componentDidMount() {
  }

  render() {
    let cards = this.props.pokemons.map( eachPokemon => {
      let types = eachPokemon.types.map( type => {
        return( <div key={type.type.name} className='cards__details--type-pokemon'>
                  <p className={ type.type.name }>{type.type.name}</p>
                </div>
              )
      })
        

      return <div key={eachPokemon.id} className="cards" onClick={ this.props.clickCard.bind(this, eachPokemon.id) }>
              <div className="cards__picture">        
                <img src={eachPokemon.img} alt="MyImage" />          
              </div>
              <div className="cards__details">
                <ul>
                  <li><small>Pokedex Number:</small> <strong>#{eachPokemon.id}</strong></li>
                  <li>{eachPokemon.name}</li>
                </ul>
                {types}
              </div>
            </div>     
    } )

    return(
      <div className="container-flex">
        { cards }
      </div>    
    )
  }
}

export default PokemonImages;