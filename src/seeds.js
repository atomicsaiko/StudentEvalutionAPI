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

const AVATAR = 'https://cdn-img.easyicon.net/png/5488/548873.gif';

const students = [
  { name: 'Veronica Doten', picture: AVATAR, class: classes[1] },
  { name: 'Rutha Lingle', picture: AVATAR, class: classes[3] },
  { name: 'Michal Olmsted', picture: AVATAR, class: classes[2] },
  { name: 'Ellamae Mickles', picture: AVATAR, class: classes[1] },
  { name: 'Billy Crafton', picture: AVATAR, class: classes[1] },
  { name: 'Jonie Burry', picture: AVATAR, class: classes[2] },
  { name: 'Adrianne Janco', picture: AVATAR, class: classes[2] },
  { name: 'Tillie Coria', picture: AVATAR, class: classes[1] },
  { name: 'Illa Lewellen', picture: AVATAR, class: classes[3] },
  { name: 'Josette Flemons', picture: AVATAR, class: classes[3] },
  { name: 'Marylynn Collingwood', picture: AVATAR, class: classes[1] },
  { name: 'Tomika Mclelland', picture: AVATAR, class: classes[1] },
  { name: 'Cameron Puett', picture: AVATAR, class: classes[2] },
  { name: 'Denise Aleman', picture: AVATAR, class: classes[2] },
  { name: 'Shasta Hyde', picture: AVATAR, class: classes[2] },
  { name: 'Maxine Dantzler', picture: AVATAR, class: classes[1] },
  { name: 'Benny Saar', picture: AVATAR, class: classes[3] },
  { name: 'Lilli Desai', picture: AVATAR, class: classes[1] },
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

const classes = [
  { name: 10, start_date: '2017-08-28', end_date: '2017-10-28'},
  { name: 11, start_date: '2017-10-02', end_date: '2017-12-02'},
  { name: 12, start_date: '2017-10-30', end_date: '2018-01-05'},
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
    console.log('Scores seeded!');
  })
  .catch(function(error) {
    console.error('Error creating scores!', error);
  });

feathersClient.service('classes').create(classes)
  .then(() => {
    console.log('Classes seeded!');
  })
  .catch(function(error) {
    console.error('Error creating classes!', error);
  });
