import React from 'react';

const showDataPokemon = ( props ) => {

  /*Here I make an array of <li> where every <li> contains a type of the pokemon to show.
  This array will be shown in the jsx code.*/
  let types = null;
  if( props.data.types ) {
    types = props.data.types.map( element => {
      return <li key={element} className="list-group-item list-group-item-primary">{element}</li>
    })
  }

  /*Here I make an array of <li> where every <li> contains an ability of the pokemon to show.
  This array will be shown in the jsx code.*/
  let abilities = null;
  if( props.data.abilities ) {
    abilities = props.data.abilities.map( element => {
      return <li key={element} className="list-group-item list-group-item-dark">{element}</li>
    })
  }

  /*Here I make an array of <li> where every <li> contains a game of the pokemon to show.
  This array will be shown in the jsx code.*/
  let games = null;
  if( props.data.games ) {
    games = props.data.games.map( element => {
      return <li className="list-group-item" style={{padding: '.25rem 1.25rem'}} key={element} >{element}</li>
    })
  }

  /*Here I make an array of <li> where every <li> contains a move of the pokemon to show.
  After I'll slice this array in three parts, because normally this array is too long, so
  I make three parts of this to make them shorter.
  These arrays will be shown in the jsx code.*/
  let moves1 = null;
  let moves2 = null;
  let moves3 = null;
  let moves = null;
  if( props.data.moves ) {
    moves = props.data.moves.map( element => {
      return <li key={element} >{element}</li>
    })
    moves1 = moves.slice( 0, moves.length/3 )
    moves2 = moves.slice( moves.length/3, moves.length/3*2 )
    moves3 = moves.slice( moves.length/3*2, moves.length)
  }
  
  /*Here I structure the data to be shown, I use data from props and
  the <li> arrays I created.*/
  return(
    <div className='container'>
      <div className='row'>
        <div className='col-12 col-md-2'>
          <img src={props.data.imageFront} alt="MyImage" />
          <img src={props.data.imageBack} alt="MyImage" />
        </div>
        <div className='col-12 col-sm-6 col-md-2'>
          <label>Pokedex Number</label>
          <input type="text" className="form-control" value={props.data.id} readOnly/><br/>
          <label>Height</label>
          <input type="text" className="form-control" value={props.data.height} readOnly/>          
        </div>
        <div className='col-12 col-sm-6 col-md-3'>
          <label>Name</label>
          <input type="text" className="form-control" value={props.data.name} readOnly/><br/>
          <label>Weight</label>
          <input type="text" className="form-control" value={props.data.weight} readOnly/>          
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

export default showDataPokemon;