const students = require('./students/students.service.js');
const scores = require('./scores/scores.service.js');
const users = require('./users/users.service.js');

const classes = require('./classes/classes.service.js');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(students);
  app.configure(scores);
  app.configure(users);
  app.configure(classes);
};
