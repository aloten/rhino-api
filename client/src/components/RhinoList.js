import { Fragment, useState, useEffect } from 'react';
import AddRhino from './AddRhino';
import EditRhino from './EditRhino';
import Error from './Error';

const RhinoList = () => {
  const [rhinos, setRhinos] = useState([]);

  const [error, setError] = useState('');

  const getRhinos = async () => {
    try {
      const res = await fetch('/rhinoceros');
      const data = await res.json();
      setRhinos(data.targetRhinos);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRhinos();
  }, []);

  const onDelete = async (id) => {
    try {
      const res = await fetch(`/rhinoceros/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      setRhinos(rhinos.filter((rhino) => rhino.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  function convertSpecies(rawStr) {
    const regex = /(\w+)_/;
    const match = regex.exec(rawStr);
    const result =
      match[1].slice(0, 1).toUpperCase() + match[1].slice(1) + ' Rhinoceros';
    return result;
  }

  return (
    <Fragment>
      <Error msg={error} />
      <AddRhino getRhinos={getRhinos} setError={setError} />
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Species</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rhinos &&
            rhinos.map((rhino) => (
              <tr key={rhino.id}>
                <td>{rhino.name}</td>
                <td>{convertSpecies(rhino.species)}</td>
                <td>
                  <EditRhino
                    oldRhino={rhino}
                    getRhinos={getRhinos}
                    setError={setError}
                  />
                </td>
                <td>
                  <button
                    value={rhino.id}
                    onClick={() => onDelete(rhino.id)}
                    className='btn btn-danger'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default RhinoList;
