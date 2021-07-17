const colors = require('colors');

const displayMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log('============================'.green);
    console.log('      Select an option      '.green);
    console.log('============================'.green);

    console.log(`${'1.'.green} Create task`);
    console.log(`${'2.'.green} List tasks`);
    console.log(`${'3.'.green} List completed tasks`);
    console.log(`${'4.'.green} List pending tasks`);
    console.log(`${'5.'.green} Complete task(s)`);
    console.log(`${'6.'.green} Delete a task`);
    console.log(`${'0.'.green} Exit`);

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question('Select an option: ', (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pause = () => {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPress ${'ENTER'.green} to continue\n`, (opt) => {
      readline.close();
      resolve();
    });
  });
};

module.exports = {
  displayMenu,
  pause,
};
