const { v4: uuidV4 } = require('uuid');

class Task {
  id = '';
  description = '';
  completedAt = '';

  constructor(description) {
    this.id = uuidV4();
    this.description = description;
  }
}

module.exports = Task;
