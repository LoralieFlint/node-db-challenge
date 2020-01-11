const db = require("../db-config")
const conv = require('./convertor');

module.exports = {
  get,
  add
};
function get() {
  return db("tasks").then(task =>
    task.map(task => {
      return {
        ...task,
        completed: conv.convBoolean(task.completed)
      };
    })
  );
}

function add(task) {
  return db("tasks")
    .insert(task)
    .then(list => {
      return get(list);
    });
}
