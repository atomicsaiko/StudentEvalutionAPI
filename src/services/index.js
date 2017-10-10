const students = require('./students/students.service.js');
const scores = require('./scores/scores.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(students);
  app.configure(scores);
};
