import React, { Fragment, useState } from 'react';

const AddRhino = ({ getRhinos, setError }) => {
  const [rhino, setRhino] = useState({
    name: '',
    species: '',
  });

  const onChange = (e) => {
    setRhino({ ...rhino, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = rhino;
      const res = await fetch('http://localhost:5000/rhinoceros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.status === 400) {
        setError(data.msg);
        console.log(data.msg);
      }
      setRhino({
        name: '',
        species: '',
      });
      getRhinos();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <form className='rhino-form' onSubmit={onSubmit}>
        <span className='form-group'>
          <input
            id='name'
            type='text'
            name='name'
            placeholder='Enter a name'
            className='form-input'
            value={rhino.name}
            onChange={onChange}
            required
          />
        </span>
        <span className='form-group'>
          <select
            name='species'
            id='species'
            className='select-species form-input'
            value={rhino.species}
            onChange={onChange}
            required
          >
            <option value='' disabled>
              Select a species
            </option>
            <option value='sumatran_rhinoceros'>Sumatran Rhinoceros</option>
            <option value='javan_rhinoceros'>Javan Rhinoceros</option>
            <option value='indian_rhinoceros'>Indian Rhinoceros</option>
            <option value='black_rhinoceros'>Black Rhinoceros</option>
            <option value='white_rhinoceros'>White Rhinoceros</option>
          </select>
        </span>
        <input className='btn btn-success' type='submit' value='Add' />
      </form>
    </Fragment>
  );
};

export default AddRhino;
