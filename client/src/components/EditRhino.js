import React, { useState } from 'react';

const EditRhino = ({ oldRhino, getRhinos, setError }) => {
  const [rhino, setRhino] = useState({
    name: oldRhino.name,
    species: oldRhino.species,
  });

  const onChange = (e) => {
    setRhino({ ...rhino, [e.target.name]: e.target.value });
  };

  const resetRhino = () => {
    setRhino({
      name: oldRhino.name,
      species: oldRhino.species,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = rhino;
      const res = await fetch(
        `http://localhost:5000/rhinoceros/${oldRhino.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const data = await res.json();
      if (data.status === 400) {
        setError(data.msg);
      }
      resetRhino();
      getRhinos();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {/* <!-- Button to Open the Modal --> */}
      <button
        type='button'
        className='btn btn-warning'
        data-bs-toggle='modal'
        data-bs-target={`#id${oldRhino.id}`}
      >
        Edit
      </button>

      {/* <!-- The Modal --> */}
      <div className='modal' id={`id${oldRhino.id}`}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            {/* <!-- Modal Header --> */}
            <div className='modal-header'>
              <h4 className='modal-title'>Edit rhino</h4>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                onClick={() => resetRhino()}
              ></button>
            </div>

            {/* <!-- Modal body --> */}
            <form onSubmit={onSubmit}>
              <div className='modal-body'>
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
                    <option value='sumatran_rhinoceros'>
                      Sumatran Rhinoceros
                    </option>
                    <option value='javan_rhinoceros'>Javan Rhinoceros</option>
                    <option value='indian_rhinoceros'>Indian Rhinoceros</option>
                    <option value='black_rhinoceros'>Black Rhinoceros</option>
                    <option value='white_rhinoceros'>White Rhinoceros</option>
                  </select>
                </span>
              </div>

              {/* <!-- Modal footer --> */}
              <div className='modal-footer'>
                <input
                  type='submit'
                  className='btn btn-success'
                  data-bs-dismiss='modal'
                  value='Submit'
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRhino;
