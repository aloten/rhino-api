import React, { Fragment } from 'react';

const AddRhino = () => {
  return (
    <Fragment>
      <h1>Rhino API</h1>
      <form className='rhino-form'>
        <span className='form-group'>
          <label htmlFor='name'>Name</label>
          <input id='name' type='text' className='form-input' />
        </span>
        <span className='form-group'>
          <label htmlFor='species'>Species</label>
          <select
            name='species'
            id='species'
            className='select-species form-input'
          >
            <option value=''>Sumatran Rhinoceros</option>
            <option value=''>Javan Rhinoceros</option>
            <option value=''>Indian Rhinoceros</option>
            <option value=''>Black Rhinoceros</option>
            <option value=''>White Rhinoceros</option>
          </select>
        </span>
        <button className='add-btn'>Add</button>
      </form>
    </Fragment>
  );
};

export default AddRhino;
