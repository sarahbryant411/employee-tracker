const inquirer = require("inquirer");
const db = require("./db");
const { up } = require("inquirer/lib/utils/readline");

// Prompt user for what they would like to do
const init = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then(({ action }) => {
      switch (action) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Exit":
          process.exit();
          break;
      }
    });
};

init();

// View all departments
const viewDepartments = () => {
  db.getAllDepartments()
    .then((response) => {
      // console.log(response)
      const formattedDepartments = response[0].map((department) => ({
        id: department.id,
        "Department Name": department.name,
      }));
      console.table(formattedDepartments);
    })
    .then(() => {
      init();
    })
    .catch((err) => {
      console.log(err);
    });
};

// View all roles
const viewRoles = () => {
  db.getAllDepartments()
    .then((departmentData) => {
      const departments = departmentData[0];
      db.getAllRoles()
        .then((rolesData) => {
          const formattedRoles = rolesData[0].map((role) => ({
            "Role ID": role.id,
            "Role Title": role.title,
            Salary: parseInt(role.salary),
            Department: departments.find(dept => dept.id === role.department_id).name
          }));
          console.table(formattedRoles);
        })
        .then(() => {
          init();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

// View all employees
const viewEmployees = () => {
  db.getAllDepartments()
    .then((departmentData) => {
      const departments = departmentData[0];
      db.getAllRoles()
        .then((rolesData) => {
          const roles = rolesData[0];
          db.getAllEmployees()
            .then((employeesData) => {
                const formattedEmployees = employeesData[0].map((employee) => {
                    const manager = employeesData[0].find((manager) => manager.id === employee.manager_id);
                    return {
                        "Employee ID": employee.id,
                        "First Name": employee.first_name,
                        "Last Name": employee.last_name,
                        Title: roles.find((role) => role.id === employee.role_id).title,
                        Department: departments.find((dept) => dept.id === roles.find((role) => role.id === employee.role_id).department_id).name,
                        "Manager Name": manager ? `${manager.first_name} ${manager.last_name}` : "N/A",
                    };
                });
                console.table(formattedEmployees);
            })
            .then(() => {
              init();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Add a department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department?",
      },
    ])
    .then((newDept) => {
        console.log(newDept)
      db.addDepartment(newDept)
        .then(() => {
          console.log(`Added ${newDept} to the database!`);
        })
        .then(() => {
          init();
        })
        .catch((err) => {
          console.log(err);
        });
    });
};

// Add a role
const addRole = () => {
  db.getAllDepartments()
    .then((departmentsData) => {
      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "What is the title of the role?",
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?",
          },
          {
            type: "list",
            name: "department_id",
            message: "Which department does the role belong to?",
            choices: departmentsData[0].map((department) => ({
              name: department.name,
              value: department.id,
            })),
          },
        ])
        .then((newRole) => {
          db.addRole(newRole)
            .then(() => {
              console.log(`Added ${newRole.title} to the database!`);
            })
            .then(() => {
              init();
            })
            .catch((err) => {
              console.log(err);
            });
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Add an employee
const addEmployee = () => {
    db.getAllRoles()
        .then((rolesData) => {
        const roles = rolesData[0];
        db.getAllEmployees()
            .then((employeesData) => {
            const employees = employeesData[0];
            inquirer
                .prompt([
                {
                    type: "input",
                    name: "first_name",
                    message: "What is the employee's first name?",
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "What is the employee's last name?",
                },
                {
                    type: "list",
                    name: "role_id",
                    message: "What is the employee's role?",
                    choices: roles.map((role) => ({
                    name: role.title,
                    value: role.id,
                    })),
                },
                {
                    type: "list",
                    name: "manager_id",
                    message: "Who is the employee's manager?",
                    choices: employees.map((employee) => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id,
                    })),
                },
                ])
                .then((newEmployee) => {
                db.addEmployee(newEmployee)
                    .then(() => {
                    console.log(`Added ${newEmployee.first_name} ${newEmployee.last_name} to the database!`);
                    })
                    .then(() => {
                    init();
                    })
                    .catch((err) => {
                    console.log(err);
                    });
                });
            })
            .catch((err) => {
            console.log(err);
            });
        })
        .catch((err) => {
        console.log(err);
        });
    };

// Update an employee role
const updateEmployeeRole = () => {
    db.getAllRoles()
        .then((rolesData) => {
        const roles = rolesData[0];
        db.getAllEmployees()
            .then((employeesData) => {
            const employees = employeesData[0];
            inquirer
                .prompt([
                {
                    type: "list",
                    name: "employee_id",
                    message: "Which employee's role would you like to update?",
                    choices: employees.map((employee) => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id,
                    })),
                },
                {
                    type: "list",
                    name: "role_id",
                    message: "What is the employee's new role?",
                    choices: roles.map((role) => ({
                    name: role.title,
                    value: role.id,
                    })),
                },
                ])
                .then((updatedRole) => {
                db.updateEmployeeRole(updatedRole.employee_id, updatedRole.role_id)
                    .then(() => {
                    console.log(`Updated employee's role!`);
                    })
                    .then(() => {
                    init();
                    })
                    .catch((err) => {
                    console.log(err);
                    });
                });
            })
            .catch((err) => {
            console.log(err);
            });
        })
        .catch((err) => {
        console.log(err);
        });
    }
