const Task = require('./task');

class Tasks {
  _list = {};

  constructor() {
    this._list = {};
  }

  createTask(description = '') {
    const task = new Task(description);
    this._list[task.id] = task;
  }

  get list() {
    return Object.values(this._list);
  }

  loadTasksFromArray(tasksArr = []) {
    this._list = {};

    tasksArr.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  deleteTask(id = '') {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  toggleTasks(ids = []) {
    Object.keys(this._list).forEach((id) => {
      const task = this._list[id];
      if (ids.includes(id)) {
        this._list[id] = { ...task, completedAt: task.completedAt ? task.completedAt : new Date().toISOString() };
      } else {
        this._list[id] = { ...task, completedAt: null };
      }
    });
  }

  listByStatus(completed = true) {
    return this.list.filter(({ completedAt }) => !!completedAt === completed);
  }
}

module.exports = Tasks;
