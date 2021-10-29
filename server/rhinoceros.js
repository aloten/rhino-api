const uuidv4 = require('uuid/v4');
// let rhinoceroses = require('./data');
const pool = require('./db');

const validSpecies = [
  `white_rhinoceros`,
  `black_rhinoceros`,
  `indian_rhinoceros`,
  `javan_rhinoceros`,
  `sumatran_rhinoceros`,
];

exports.getAll = async () => {
  try {
    const query = await pool.query('SELECT * FROM rhinoceroses');
    const rhinos = query.rows;
    return rhinos;
  } catch (error) {
    console.log(error);
  }
};

exports.getByID = async (id) => {
  try {
    const query = await pool.query('SELECT * FROM rhinoceroses WHERE id = $1', [
      id,
    ]);

    if (query.rows.length === 0) {
      return {
        status: 400,
        msg: `No rhinoceros of id ${id}`,
      };
    } else {
      const targetRhino = query.rows[0];
      return { status: 200, targetRhino };
    }
  } catch (err) {
    console.log(err);
  }
};

exports.queryRhinos = async (key, value, rhinos) => {
  if (rhinos !== undefined) {
    rhinos = rhinos.filter(
      (rhino) => rhino[key].toLowerCase() === value.toLowerCase()
    );
    return rhinos;
  }
  try {
    const query = await pool.query(
      `SELECT * FROM rhinoceroses WHERE ${key} ~* '^${value}$'`
    );
    const targetRhinos = query.rows;
    return targetRhinos;
  } catch (err) {
    console.log(err);
  }
};

exports.getEndangered = async () => {
  try {
    const rhinos = await this.getAll();
    let endangered = [];
    for (const species of validSpecies) {
      const filtered = rhinos.filter((rhino) => rhino.species === species);
      if (filtered.length <= 2) {
        endangered = endangered.concat(filtered);
      }
    }

    if (endangered.length > 0) {
      return {
        status: 200,
        endangered,
      };
    } else {
      return {
        status: 400,
        msg: 'No endagered rhinos!',
      };
    }
  } catch (err) {
    console.log(err);
  }
};

exports.newRhinoceros = async (data) => {
  const validation = this.validateNameSpecies(data);
  if (validation.status !== 200) {
    return validation;
  }

  try {
    // Add to PostgreSQL DB
    const query = await pool.query(
      'INSERT INTO rhinoceroses (id, name, species) VALUES ($1, $2, $3) RETURNING *',
      [uuidv4(), data.name, data.species]
    );
    const newRhino = query.rows[0];

    return { status: 200, newRhino };
  } catch (err) {
    console.log(err);
  }
};

exports.updateRhinoceros = async (data) => {
  let queryVar;
  if (Object.keys(data).length === 3) {
    queryVar = `name = '${data.name}', species = '${data.species}'`;
  } else if (data.name !== undefined) {
    queryVar = `name = '${data.name}'`;
  } else {
    queryVar = `species = '${data.species}'`;
  }

  try {
    const query = await pool.query(
      `UPDATE rhinoceroses SET ${queryVar} WHERE id = '${data.id}' RETURNING *`
    );

    updatedRhino = query.rows[0];

    return { status: 200, updatedRhino };
  } catch (err) {
    console.log(err);
  }
};

exports.deleteRhinoceros = async (id) => {
  try {
    const query = await pool.query(
      'DELETE FROM rhinoceroses WHERE id = ($1) RETURNING *',
      [id]
    );
    if (query.rows.length > 0) {
      const deletedRhino = query.rows[0];
      return { status: 200, deletedRhino };
    } else {
      return { status: 400, msg: `No rhino with id ${id}` };
    }
  } catch (err) {
    console.log(err);
  }

  let targetRhino;
  for (let i = 0; i < rhinoceroses.length; i++) {
    if (rhinoceroses[i].id === id) {
      targetRhino = rhinoceroses[i];
      rhinoceroses.splice(i, 1);
      break;
    }
  }
};

// returns obj with status === 200 if data passes validation, else returns obj with error status and message
exports.validateNameSpecies = (data) => {
  for (const key in data) {
    if (key !== 'name' && key !== 'species') {
      return {
        status: 400,
        msg: 'The body should only contain data for name and species',
      };
    }
  }
  if (
    typeof data.name !== 'string' &&
    (data.name.length < 1 || data.name.length > 20)
  ) {
    return {
      status: 400,
      msg: 'Name must be a string value between 1 and 20 characters',
    };
  }

  if (data.species !== undefined && validSpecies.indexOf(data.species) === -1) {
    return {
      status: 400,
      msg: 'Species must be one of: white_rhinoceros, black_rhinoceros, indian_rhinoceros, javan_rhinoceros, sumatran_rhinoceros',
    };
  }

  return {
    status: 200,
  };
};
