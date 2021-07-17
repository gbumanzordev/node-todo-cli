const colors = require('colors');

const logTask = (task, num) => {
  console.log(
    `${colors.green.bold(`${num}.`)} ${task.description} ${colors.green.bold('::')} ${
      !task.completedAt ? 'Pending'.red : 'Completed'.green
    }`
  );
};

module.exports = { logTask };
