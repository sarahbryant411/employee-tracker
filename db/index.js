const connection = require("./connection.js");

class Queries {
  constructor(db) {
    this.db = db;
  }
  getAllDepartments() {
    return this.db.promise().query(`SELECT * FROM department`);
  }
  getAllRoles() {
    return this.db.promise().query(`SELECT * FROM role`);
  }
  getAllEmployees() {
    return this.db.promise().query(`SELECT * FROM employee`);
  }
  addDepartment(department) {
    return this.db.promise().query('INSERT INTO department SET ?', department);
  }

  addRole(role) {
    return this.db.promise().query('INSERT INTO role SET ?', role);
  }

  addEmployee(employee) {
    return this.db.promise().query('INSERT INTO employee SET ?', employee);
  }

  updateEmployeeRole(employeeId, roleId) {
    return this.db.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
  }
}

module.exports = new Queries(connection);
