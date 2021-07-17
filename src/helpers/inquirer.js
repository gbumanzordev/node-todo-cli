require('colors');
const inquirer = require('inquirer');

const menuOpts = [
  {
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
      { value: '1', name: `${'1.'.green} Create task` },
      { value: '2', name: `${'2.'.green} List tasks` },
      { value: '3', name: `${'3.'.green} List completed tasks` },
      { value: '4', name: `${'4.'.green} List pending tasks` },
      { value: '5', name: `${'5.'.green} Complete task(s)` },
      { value: '6', name: `${'6.'.green} Delete a task` },
      { value: '0', name: `${'0.'.green} Exit` },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log('============================'.green);
  console.log('      Select an option      '.green);
  console.log('============================'.green);

  const { option } = await inquirer.prompt(menuOpts);
  return option;
};

const pause = async () => {
  await inquirer.prompt([
    {
      type: 'input',
      name: 'confirm',
      message: `Press ${'ENTER'.green} to continue`,
    },
  ]);
};

const readInput = async (message) => {
  const question = [
    {
      message,
      type: 'input',
      name: 'desc',
      validate(value) {
        if (value.length === 0) {
          return 'Please enter a value';
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const taskListForDeletion = async (list = []) => {
  const choices = list.map((task, idx) => ({ value: task.id, name: `${idx + 1}. `.green + task.description }));
  choices.unshift({
    value: '0',
    name: '0. '.green + 'Cancel',
  });
  const opts = [
    {
      type: 'list',
      name: 'id',
      message: 'Select the task you want to delete',
      choices,
    },
  ];

  const { id } = await inquirer.prompt(opts);
  return id;
};

const confirm = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const taskListForCompletion = async (list = []) => {
  const choices = list.map((task, idx) => ({
    value: task.id,
    name: `${idx + 1}. `.green + task.description,
    checked: !!task.completedAt,
  }));

  const opts = [
    {
      type: 'checkbox',
      name: 'id',
      message: 'Select the tasks you want to mark as completed',
      choices,
    },
  ];

  const { id } = await inquirer.prompt(opts);
  return id;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  taskListForDeletion,
  taskListForCompletion,
  confirm,
};
