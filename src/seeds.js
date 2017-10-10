const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication-client');

const user = {
  name: 'John Doe',
  email: 'john.doe@codaisseur.dev',
  password: 'abcd1234'
};

const students = [
  { name: 'Veronica Doten', picture: 'https://cdn-img.easyicon.net/png/5488/548873.gif' },
  { name: 'Rutha Lingle', picture: 'https://cdn-img.easyicon.net/png/5488/548873.gif' },
  { name: 'Michal Olmsted', picture: 'https://cdn-img.easyicon.net/png/5488/548873.gif' },
  { name: 'Ellamae Mickles', picture: 'https://cdn-img.easyicon.net/png/5488/548873.gif' },
  { name: 'Billy Crafton', picture: 'https://cdn-img.easyicon.net/png/5488/548873.gif' },
  { name: 'Jonie Burry', picture: 'https://cdn-img.easyicon.net/png/5488/548873.gif' },
  { name: 'Adrianne Janco', picture: 'https://cdn-img.easyicon.net/png/5488/548873.gif' },
  { name: 'Tillie Coria', picture: 'https://cdn-img.easyicon.net/png/5488/548873.gif' },
  { name: 'Illa Lewellen', picture: 'https://cdn-img.easyicon.net/png/5488/548873.gif' },
  { name: 'Josette Flemons', picture: 'https://cdn-img.easyicon.net/png/5488/548873.gif' },
  { name: 'Marylynn Collingwood', picture: 'https://cdn-img.easyicon.net/png/5488/548873.gif' },
  { name: 'Tomika Mclelland', picture: 'https://cdn-img.easyicon.net/png/5488/548873.gif' },
  { name: 'Cameron Puett', picture: 'https://cdn-img.easyicon.net/png/5488/548873.gif' },
  { name: 'Denise Aleman', picture: 'https://cdn-img.easyicon.net/png/5488/548873.gif' },
  { name: 'Shasta Hyde', picture: 'https://cdn-img.easyicon.net/png/5488/548873.gif' },
  { name: 'Maxine Dantzler', picture: 'https://cdn-img.easyicon.net/png/5488/548873.gif' },
  { name: 'Benny Saar', picture: 'https://cdn-img.easyicon.net/png/5488/548873.gif' },
  { name: 'Lilli Desai', picture: 'https://cdn-img.easyicon.net/png/5488/548873.gif' },
];

const scores = [
  { date: '2017-10-02', color_code: 'RED', student: students[1]},
  { date: '2017-10-02', color_code: 'YELLOW', student: students[2]},
  { date: '2017-10-02', color_code: 'GREEN', student: students[3]},
  { date: '2017-10-02', color_code: 'GREEN', student: students[4]},
  { date: '2017-10-02', color_code: 'GREEN', student: students[5]},
  { date: '2017-10-03', color_code: 'RED', student: students[1]},
  { date: '2017-10-03', color_code: 'RED', student: students[2]},
  { date: '2017-10-03', color_code: 'YELLOW', student: students[3]},
  { date: '2017-10-03', color_code: 'YELLOW', student: students[4]},
  { date: '2017-10-04', color_code: 'GREEN', student: students[5]},
  { date: '2017-10-04', color_code: 'GREEN', student: students[6]},
  { date: '2017-10-04', color_code: 'RED', student: students[7]},
  { date: '2017-10-04', color_code: 'RED', student: students[8]},
  { date: '2017-10-05', color_code: 'RED', student: students[9]},
  { date: '2017-10-05', color_code: 'GREEN', student: students[10]},
  { date: '2017-10-05', color_code: 'GREEN', student: students[11]},
  { date: '2017-10-05', color_code: 'GREEN', student: students[12]},
  { date: '2017-10-05', color_code: 'GREEN', student: students[13]},
];

const feathersClient = feathers();

feathersClient
  .configure(hooks())
  .configure(rest('http://localhost:3030').superagent(superagent))
  .configure(auth());

feathersClient.service('users').create(user)
  .then(() => {
    feathersClient.authenticate({
      strategy: 'local',
      email: user.email,
      password: user.password
    });
  })
  .catch(function(error) {
    console.error('Error creating user!', error);
  });

feathersClient.service('students').create(students)
  .then(() => {
    console.log('Students seeded!');
  })
  .catch(function(error) {
    console.error('Error creating user!', error);
  });

feathersClient.service('scores').create(scores)
  .then(() => {
    console.log('Students seeded!');
  })
  .catch(function(error) {
    console.error('Error creating user!', error);
  });
