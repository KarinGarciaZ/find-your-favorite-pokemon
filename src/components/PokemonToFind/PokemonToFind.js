import React from 'react';

const pokemonToFind = ( props ) => {
  return(
    <div className='row'>
      <div className='col-3'>

      </div>
      <div className='col-6'>
        <input type='text' className="form-control" placeholder='Find your pokemon by its Name or Pokedex Number...' value={ props.name } onChange={ props.valueChanged }/>
      </div>
      <div className='col-3'>
        <button className='btn btn-primary' onClick={props.clicked} disabled={props.disableButton}>Find</button>
      </div>
    </div>
  )
}

export default pokemonToFind;