import React, { Component } from 'react';

class PokemonImages extends Component {

  componentDidMount() {
    
  }

  render() {
    let cards = this.props.pokemons.map( eachPokemon => {
      return <div key={eachPokemon.id} className="cards">
              <div className="cards__picture">        
                <img src={eachPokemon.img} alt="MyImage" />          
              </div>
              <div className="cards__details">
                <ul>
                  <li>Pokedex Number <strong>{eachPokemon.id}</strong></li>
                  <li>{eachPokemon.name}</li>
                </ul>
              </div>
            </div>     
    } )
    console.log(this.props.pokemons)
    return(
      <div className="container-flex">
        { cards }
      </div>    
    )
  }
}

export default PokemonImages;