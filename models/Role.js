const db = require('../db/connection');

class Role {
  constructor(id, title, salary, departmentId) {
    this.id = id;
    this.title = title;
    this.salary = salary;
    this.departmentId = departmentId;
  }

  static getAllRoles() {
    return db.promise().query(`
      SELECT role.id, role.title, role.salary, department.name AS department
      FROM role
      LEFT JOIN department ON role.department_id = department.id
    `);
  }

  static createRole(title, salary, departmentId) {
    return db.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
  }
}

module.exports = Role;
