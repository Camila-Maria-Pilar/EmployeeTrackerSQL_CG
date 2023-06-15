const inquirer = require('inquirer');
const Department = require('./models/Department');
const Role = require('./models/Role');
const Employee = require('./models/Employee');

// Helper function to prompt user for input
function promptUser(questions) {
  return inquirer.prompt(questions);
}

// Main menu choices
const mainMenuChoices = [
  'View all departments',
  'View all roles',
  'View all employees',
  'Add a department',
  'Add a role',
  'Add an employee',
  'Update an employee role',
];

// Function to handle the main menu
async function mainMenu() {
  const { choice } = await promptUser({
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: mainMenuChoices,
  });

  switch (choice) {
    case mainMenuChoices[0]:
      viewAllDepartments();
      break;
    case mainMenuChoices[1]:
      viewAllRoles();
      break;
    case mainMenuChoices[2]:
      viewAllEmployees();
      break;
    case mainMenuChoices[3]:
      addDepartment();
      break;
    case mainMenuChoices[4]:
      addRole();
      break;
    case mainMenuChoices[5]:
      addEmployee();
      break;
    case mainMenuChoices[6]:
      updateEmployeeRole();
      break;
    default:
      console.log('Invalid choice.');
      break;
  }
}

// Function to view all departments
async function viewAllDepartments() {
  try {
    const [rows] = await Department.getAllDepartments();
    console.table(rows);
  } catch (error) {
    console.error('Failed to view departments:', error);
  } finally {
    mainMenu();
  }
}

// Function to view all roles
async function viewAllRoles() {
    try {
      const [rows] = await Role.getAllRoles();
      console.table(rows);
    } catch (error) {
      console.error('Failed to view roles:', error);
    } finally {
      mainMenu();
    }
  }
  
  // Function to view all employees
  async function viewAllEmployees() {
    try {
      const [rows] = await Employee.getAllEmployees();
      console.table(rows);
    } catch (error) {
      console.error('Failed to view employees:', error);
    } finally {
      mainMenu();
    }
  }
  
  // Function to add a department
  async function addDepartment() {
    try {
      const { name } = await promptUser({
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:',
      });
  
      await Department.createDepartment(name);
      console.log('Department added successfully.');
    } catch (error) {
      console.error('Failed to add department:', error);
    } finally {
      mainMenu();
    }
  }
  
  // Function to add a role
  async function addRole() {
    try {
      const { title, salary, departmentId } = await promptUser([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the role:',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary for the role:',
        },
        {
          type: 'input',
          name: 'departmentId',
          message: 'Enter the department ID for the role:',
        },
      ]);
  
      await Role.createRole(title, salary, departmentId);
      console.log('Role added successfully.');
    } catch (error) {
      console.error('Failed to add role:', error);
    } finally {
      mainMenu();
    }
  }
  
  // Function to add an employee
  async function addEmployee() {
    try {
      const { firstName, lastName, roleId, managerId } = await promptUser([
        {
          type: 'input',
          name: 'firstName',
          message: 'Enter the first name of the employee:',
        },
        {
          type: 'input',
          name: 'lastName',
          message: 'Enter the last name of the employee:',
        },
        {
          type: 'input',
          name: 'roleId',
          message: 'Enter the role ID for the employee:',
        },
        {
          type: 'input',
          name: 'managerId',
          message: 'Enter the manager ID for the employee (optional):',
        },
      ]);
  
      await Employee.createEmployee(firstName, lastName, roleId, managerId);
      console.log('Employee added successfully.');
    } catch (error) {
      console.error('Failed to add employee:', error);
    } finally {
      mainMenu();
    }
  }
  
  // Function to update an employee role
  async function updateEmployeeRole() {
    try {
      const employees = await Employee.getAllEmployees();
      const employeeChoices = employees[0].map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));
  
      const roles = await Role.getAllRoles();
      const roleChoices = roles[0].map((role) => ({
        name: role.title,
        value: role.id,
      }));
  
      const { employeeId, roleId } = await promptUser([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Select the employee to update:',
          choices: employeeChoices,
        },
        {
          type: 'list',
          name: 'roleId',
          message: 'Select the new',
          choices: roleChoices,
      },
    ]);

    await Employee.updateEmployeeRole(employeeId, roleId);
    console.log('Employee role updated successfully.');
  } catch (error) {
    console.error('Failed to update employee role:', error);
  } finally {
    mainMenu();
  }
}

// Start the application
mainMenu();

    