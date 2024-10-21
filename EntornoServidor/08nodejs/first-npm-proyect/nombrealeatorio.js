const { faker } = require('@faker-js/faker');
const chalk = require('chalk');


function getRandomColor() {
  const colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}


function getRandomName() {
  return faker.name.firstName();
}


function printRandomNameWithColor() {
  const name = getRandomName();
  const color = getRandomColor();
  console.log(chalk[color](name)); 
}


printRandomNameWithColor();
