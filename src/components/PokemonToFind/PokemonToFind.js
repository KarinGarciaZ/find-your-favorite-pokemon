import React from 'react';
import pokimage from '../../img/Pokemon_Logo.png';

const pokemonToFind = ( props ) => {
  /*Here I simply show the input and the button.*/
  return(
    <div className='row'>
      <div className='col-3'>
        <img src={pokimage} alt="MyImage" className="pokimage" />
      </div>
      <div className='col-6' style={{ marginTop:'20px' }}>
        <input type='text' className="form-control" placeholder='Find your pokemon by its Name or Pokedex Number...' value={ props.name } onChange={ props.valueChanged }/>
      </div>
      <div className='col-3' style={{ marginTop:'20px' }}>
        <button className='btn btn-primary' onClick={props.clicked} disabled={props.disableButton}>Find</button>
      </div>
    </div>
  )
}

export default pokemonToFind;