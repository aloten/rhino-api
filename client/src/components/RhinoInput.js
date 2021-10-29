import React, { Fragment } from 'react';

const RhinoInput = () => {
  return (
    <Fragment>
      <h1>Input rhino name and species</h1>
      <label htmlFor='name'>Name</label>
      <input id='name' type='text' />
      <label htmlFor='species'>Species</label>
      <select name='species' id='species'>
        <option value=''>Sumatran Rhinoceros</option>
        <option value=''>Javan Rhinoceros</option>
        <option value=''>Indian Rhinoceros</option>
        <option value=''>Black Rhinoceros</option>
        <option value=''>White Rhinoceros</option>
      </select>
    </Fragment>
  );
};

export default RhinoInput;
