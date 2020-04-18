const db = require("../db-config")
const conv = require('./convertor')

module.exports = {
  get,
  add,
  remove
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

function remove(id) {
  return db('projects').where({ id }).del();
}