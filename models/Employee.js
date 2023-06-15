const db = require('../db/connection');

class Employee {
  constructor(id, firstName, lastName, roleId, managerId) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleId = roleId;
    this.managerId = managerId;
  }

  static getAllEmployees() {
    return db.promise().query(`
      SELECT 
        employee.id,
        employee.first_name,
        employee.last_name,
        role.title,
        department.name AS department,
        role.salary,
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON employee.manager_id = manager.id
    `);
  }

  static createEmployee(firstName, lastName, roleId, managerId) {
    return db.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
  }

  static updateEmployeeRole(employeeId, roleId) {
    return db.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
  }
}

module.exports = Employee;
