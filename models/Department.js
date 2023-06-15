const db = require('../db/connection');

class Department {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static getAllDepartments() {
    return db.promise().query('SELECT * FROM department');
  }

  static createDepartment(name) {
    return db.promise().query('INSERT INTO department (name) VALUES (?)', [name]);
  }
}

module.exports = Department;
