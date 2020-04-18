const db = require('../db-config')
module.exports = {
    get,
    add,
    remove
}
function get() {
    return db("resources").then(resource =>
      resource.map(resc => {
        return {
          ...resc,
        };
      })
    );
  }

  function add(resource) {
    return db('resources')
    .insert(resource)
    .then(ids => {
        return get(ids);
    });
}

function remove(id) {
  return db('resources').where({ id }).del();
}