var students = [
  { student_id: 1, color: 'RED' },
  { student_id: 2, color: 'RED' },
  { student_id: 3, color: 'YELLOW' },
  { student_id: 4, color: 'GREEN' },
  { student_id: 5, color: 'RED' },
  { student_id: 6, color: 'RED' },
  { student_id: 7, color: 'GREEN' },
  { student_id: 8, color: 'RED' },
  { student_id: 9, color: 'YELLOW' },
  { student_id: 10, color: 'RED' },
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomStudent(array) {
  i = getRandomInt(1, array.length);
  return array[i];
}

function getRandomStudent2(array) {
  const QUESTION_COUNT = 100;
  const QUESTION_COUNT_RED = 0.5 * QUESTION_COUNT;
  const QUESTION_COUNT_YELLOW = 0.33 * QUESTION_COUNT;
  const QUESTION_COUNT_GREEN = 0.17 * QUESTION_COUNT;

  var studentRED = array.filter(student => student.color === 'RED'); // 6
  var studentYELLOW = array.filter(student => student.color === 'YELLOW'); // 2
  var studentGREEN = array.filter(student => student.color === 'GREEN'); // 2

  // var orderedStudents = [].concat(studentRED).concat(studentYELLOW).concat(studentGREEN);
  var randomStudents = [];

  for(i = 0; i < QUESTION_COUNT_RED; i++) {
    let index = getRandomInt(0, studentRED.length-1);
    randomStudents.push(studentRED[index]);
  }

  for(i = 0; i < QUESTION_COUNT_YELLOW; i++) {
    let index = getRandomInt(0, studentYELLOW.length-1);
    randomStudents.push(studentYELLOW[index]);
  }

  for(i = 0; i < QUESTION_COUNT_GREEN; i++) {
    let index = getRandomInt(0, studentGREEN.length-1);
    randomStudents.push(studentGREEN[index]);
  }

  return randomStudents[getRandomInt(0, QUESTION_COUNT-1)];
}

getRandomStudent(students);
getRandomStudent2(students);
