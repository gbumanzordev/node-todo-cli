const colors = require('colors');
const {
  inquirerMenu,
  pause,
  readInput,
  taskListForDeletion,
  confirm,
  taskListForCompletion,
} = require('./helpers/inquirer');
const { logTask } = require('./helpers/logTask');
const { readDB } = require('./helpers/readFile');
const { saveDB } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');

const main = async () => {
  let opt = '';
  const tasks = new Tasks();
  const tasksDb = readDB();

  if (tasksDb) {
    tasks.loadTasksFromArray(tasksDb);
  }

  do {
    opt = await inquirerMenu();

    console.log('');
    switch (opt) {
      case '1': {
        const desc = await readInput('Please enter the task description:');
        tasks.createTask(desc);
        break;
      }
      case '2': {
        tasks.list.forEach((task, idx) => {
          logTask(task, idx + 1);
        });
        break;
      }
      case '3': {
        tasks.listByStatus().forEach((task, idx) => {
          logTask(task, idx + 1);
        });
        break;
      }
      case '4': {
        tasks.listByStatus(false).forEach((task, idx) => {
          logTask(task, idx + 1);
        });
        break;
      }
      case '5': {
        const ids = await taskListForCompletion(tasks.list);
        if (ids.length !== 0) {
          const confirmed = await confirm('Are you sure you want to mark these tasks as completed?');

          if (confirmed) {
            tasks.toggleTasks(ids);
          }
        }
        break;
      }
      case '6': {
        const id = await taskListForDeletion(tasks.list);
        if (id !== '0') {
          const confirmed = await confirm('Are you sure you want to delete this task?');

          if (confirmed) {
            tasks.deleteTask(id);
          }
        }
        break;
      }
    }
    console.log('');

    saveDB(tasks.list);

    if (opt !== '0') {
      await pause();
    }
  } while (opt !== '0');
};

main();
