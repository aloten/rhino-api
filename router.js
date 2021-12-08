const Router = require('koa-router');
const router = new Router();
const model = require('./rhinoceros.js');

// Get all rhinoceros
router.get('/rhinoceros', async (ctx, next) => {
  // Would like to check if queries are valid before I get data, but for small dataset it would be more effort than worth
  try {
    let rhinos = await model.getAll();

    for (const key in ctx.query) {
      if (key !== 'name' && key !== 'species') {
        ctx.response.body = {
          msg: "Only 'name' and 'species' are valid query keys",
        };
        return (ctx.response.status = 400);
      } else {
        rhinos = await model.queryRhinos(key, ctx.query[key], rhinos);
      }
    }
    if (rhinos.length === 0) {
      ctx.response.body = {
        msg: 'No rhinos match query',
      };
      ctx.response.status = 400;
    } else {
      ctx.response.body = { targetRhinos: rhinos };
    }
  } catch (err) {
    console.log(err);
  }
});

// Get rhino by id
router.get('/rhinoceros/:id', async (ctx, next) => {
  try {
    ctx.response.body = await model.getByID(ctx.params.id);
    ctx.response.status = ctx.response.body.status;
  } catch (err) {
    console.log(err);
  }
});

// Get rhinos of endangered species
router.get('/rhinoceros/category/endangered', async (ctx, next) => {
  try {
    ctx.response.body = await model.getEndangered(ctx.params.id);
    ctx.response.status = ctx.response.body.status;
  } catch (err) {
    console.log(err);
  }
});

// Add a rhino to DB
router.post('/rhinoceros', async (ctx, next) => {
  try {
    ctx.response.body = await model.newRhinoceros(ctx.request.body);
    if (typeof ctx.response.body.status !== 'undefined') {
      ctx.response.status = ctx.response.body.status;
    }
  } catch (err) {
    console.log(err);
  }
});

// Update rhino by id
router.put('/rhinoceros/:id', async (ctx, next) => {
  const data = ctx.request.body;
  const validation = model.validateNameSpecies(data);
  if (validation.status !== 200) {
    ctx.response.body = validation;
    return (ctx.response.status = validation.status);
  }
  data.id = ctx.params.id;
  Object.freeze(data);
  try {
    ctx.response.body = await model.updateRhinoceros(data);
    ctx.response.status = ctx.response.body.status;
  } catch (err) {
    console.log(err);
  }
});

router.del('/rhinoceros/:id', async (ctx, next) => {
  try {
    ctx.response.body = await model.deleteRhinoceros(ctx.params.id);
    ctx.response.status = ctx.response.body.status;
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
