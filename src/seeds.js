const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication-client');

const app = require('./app');
const mongooseClient = app.get('mongooseClient');

const user = {
  name: 'John Doe',
  email: 'john.doe@codaisseur.dev',
  password: 'abcd1234'
};

/*
  Because of references between documents. Seed the data in the following order:
  classes -> students -> scores
*/

const classes = [
  { _id: new mongooseClient.Types.ObjectId(), name: 10, start_date: '2017-08-28', end_date: '2017-10-28'},
  { _id: new mongooseClient.Types.ObjectId(), name: 11, start_date: '2017-10-02', end_date: '2017-12-02'},
  { _id: new mongooseClient.Types.ObjectId(), name: 12, start_date: '2017-10-30', end_date: '2018-01-05'},
  { _id: new mongooseClient.Types.ObjectId(), name: 13, start_date: '2017-10-30', end_date: '2018-01-05'},
  // generate ObjectId manually then use this ref for the Student class field as REF
];

const AVATAR = 'https://cdn-img.easyicon.net/png/5488/548873.gif';

const students = [
  { _id: new mongooseClient.Types.ObjectId(), name: 'Veronica Doten', picture: AVATAR, class: classes[0]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), name: 'Rutha Lingle', picture: AVATAR, class: classes[1]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), name: 'Michal Olmsted', picture: AVATAR, class: classes[2]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), name: 'Ellamae Mickles', picture: AVATAR, class: classes[3]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), name: 'Billy Crafton', picture: AVATAR, class: classes[1]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), name: 'Jonie Burry', picture: AVATAR, class: classes[2]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), name: 'Adrianne Janco', picture: AVATAR, class: classes[2]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), name: 'Tillie Coria', picture: AVATAR, class: classes[1]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), name: 'Illa Lewellen', picture: AVATAR, class: classes[0]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), name: 'Josette Flemons', picture: AVATAR, class: classes[3]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), name: 'Marylynn Collingwood', picture: AVATAR, class: classes[1]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), name: 'Tomika Mclelland', picture: AVATAR, class: classes[1]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), name: 'Cameron Puett', picture: AVATAR, class: classes[0]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), name: 'Denise Aleman', picture: AVATAR, class: classes[2]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), name: 'Shasta Hyde', picture: AVATAR, class: classes[0]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), name: 'Maxine Dantzler', picture: AVATAR, class: classes[1]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), name: 'Benny Saar', picture: AVATAR, class: classes[3]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), name: 'Lilli Desai', picture: AVATAR, class: classes[1]['_id'] },
];

const scores = [
  { _id: new mongooseClient.Types.ObjectId(), date: '2017-10-02', color_code: 'RED', student: students[0]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), date: '2017-10-02', color_code: 'YELLOW', student: students[1]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), date: '2017-10-02', color_code: 'GREEN', student: students[2]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), date: '2017-10-02', color_code: 'GREEN', student: students[3]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), date: '2017-10-02', color_code: 'GREEN', student: students[4]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), date: '2017-10-03', color_code: 'RED', student: students[1]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), date: '2017-10-03', color_code: 'RED', student: students[2]['_id'] },
  { _id: new mongooseClient.Types.ObjectId(), date: '2017-10-03', color_code: 'YELLOW', student: students[3]['_id']},
  { _id: new mongooseClient.Types.ObjectId(), date: '2017-10-03', color_code: 'YELLOW', student: students[4]['_id']},
  { _id: new mongooseClient.Types.ObjectId(), date: '2017-10-04', color_code: 'GREEN', student: students[5]['_id']},
  { _id: new mongooseClient.Types.ObjectId(), date: '2017-10-04', color_code: 'GREEN', student: students[6]['_id']},
  { _id: new mongooseClient.Types.ObjectId(), date: '2017-10-04', color_code: 'RED', student: students[7]['_id']},
  { _id: new mongooseClient.Types.ObjectId(), date: '2017-10-04', color_code: 'RED', student: students[8]['_id']},
  { _id: new mongooseClient.Types.ObjectId(), date: '2017-10-05', color_code: 'RED', student: students[9]['_id']},
  { _id: new mongooseClient.Types.ObjectId(), date: '2017-10-05', color_code: 'GREEN', student: students[10]['_id']},
  { _id: new mongooseClient.Types.ObjectId(), date: '2017-10-05', color_code: 'GREEN', student: students[11]['_id']},
  { _id: new mongooseClient.Types.ObjectId(), date: '2017-10-05', color_code: 'GREEN', student: students[12]['_id']},
  { _id: new mongooseClient.Types.ObjectId(), date: '2017-10-05', color_code: 'GREEN', student: students[13]['_id']},
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
    console.log('Users seeded!');
  })
  .catch(function(error) {
    console.error('Error creating user!', error);
  });

feathersClient.service('students').create(students)
  .then(() => {
    console.log('Students seeded!');
  })
  .catch(function(error) {
    console.error('Error creating students!', error);
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
