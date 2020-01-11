const db = require("../db-config")
const conv = require('./convertor')

module.exports = {
  get,
  add
};
function get() {
  return db("projects").then(projects =>
    projects.map(project => {
      return {
        ...project,
        completed: conv.convBoolean(project.completed)
      };
    })
  );
}

function add(project) {
  return db("projects")
    .insert(project)
    .then(ids => {
      return get(ids);
    });
}
