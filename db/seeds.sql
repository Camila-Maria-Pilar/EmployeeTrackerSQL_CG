CREATE SCHEMA `company_db` ;

USE company_db;


-- Departments
INSERT INTO department (name) VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Human Resources');

-- Roles
INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Manager', 80000, 1),
  ('Sales Representative', 50000, 1),
  ('Software Engineer', 90000, 2),
  ('Quality Assurance Engineer', 70000, 2),
  ('Accountant', 60000, 3),
  ('Financial Analyst', 75000, 3),
  ('HR Manager', 70000, 4),
  ('HR Coordinator', 45000, 4);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Mike', 'Johnson', 3, 1),
  ('Sarah', 'Williams', 4, 1),
  ('Chris', 'Davis', 5, 2),
  ('Emily', 'Anderson', 6, 2),
  ('Mark', 'Taylor', 7, 3),
  ('Amy', 'Brown', 8, 3);

COMMIT;

