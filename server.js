const express = require("express");
const helmet = require("helmet");

const projectRouter = require('./models-routes/projectRouter');
// const resourceRouter = require('./projects/resourceRouter');
// const taskRouter = require('./projects/taskRouter');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/projects', projectRouter)
// server.use('/api/resources', resourceRouter)
// server.use('/api/projects', taskRouter)

module.exports = server;
