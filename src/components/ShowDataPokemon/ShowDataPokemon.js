import React from 'react';

const showDataPokemon = ( props ) => {
  console.log('props: ', props);
  let types = null;
  if( props.data.types ) {
    types = props.data.types.map( element => {
      return <li key={element} className="list-group-item list-group-item-primary">{element}</li>
    })
  }

  let abilities = null;
  if( props.data.abilities ) {
    abilities = props.data.abilities.map( element => {
      return <li key={element} className="list-group-item list-group-item-primary">{element}</li>
    })
  }

  let games = null;
  if( props.data.games ) {
    games = props.data.games.map( element => {
      return <li key={element} >{element}</li>
    })
  }

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
  
  return(
    <div className='container'>
      <div className='row'>
        <div className='col-12 col-md-1'>
          <img src={props.data.imageFront} alt="MyImage" />
          <img src={props.data.imageBack} alt="MyImage" />
        </div>
        <div className='col-6 col-md-2'>
          <label>ID</label>
          <input type="text" className="form-control" value={props.data.id} />
          <label>Height</label>
          <input type="text" className="form-control" value={props.data.height} />          
        </div>
        <div className='col-6 col-md-3'>
          <label>Name</label>
          <input type="text" className="form-control" value={props.data.name} />
          <label>Weight</label>
          <input type="text" className="form-control" value={props.data.weight} />          
        </div>
        <div className='col-6 col-md-3'>
          <label>Types</label>
          <ul className="list-group">
            {types}
          </ul>
        </div>
        <div className='col-6 col-md-3'>
          <label>Abilities</label>
          <ul className="list-group">
            {abilities}
          </ul>
        </div>
      </div>     
      <div className='row' style={{marginTop: '20px'}}>
        <div className='col-12 col-md-3'>
          <label>Games where appears</label>
          <ul>
            {games}
          </ul>
        </div>
        <div className='col-12 col-md-3'>
          <label>Moves</label>
          <ul>
            {moves1}
          </ul>
        </div>
        <div className='col-12 col-md-3'>
        <label>Moves</label>
          <ul>
            {moves2}
          </ul>
        </div>
        <div className='col-12 col-md-3'>
        <label>Moves</label>
          <ul>
            {moves3}
          </ul>
        </div>
      </div> 
    </div>
  );
}

export default showDataPokemon;