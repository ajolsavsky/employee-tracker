-- -- ALL EMPLOYEES QUERY

-- SELECT employee.id AS 'ID', 
--     employee.first_name AS 'First Name', 
--     employee.last_name AS 'Last Name', 
--     role.title AS 'Role', 
--     department.department_name AS 'Department',
--     role.salary AS 'Salary',
--     CONCAT (manager.first_name, " ", manager.last_name) AS 'Manager'
-- FROM employee 
--     LEFT JOIN role ON (employee.role_id = role.id)
--     LEFT JOIN department ON (department.id = role.department_id)
--     LEFT JOIN employee manager ON employee.manager_id = manager.id;

-- ALL DEPARTMENTS QUERY

-- SELECT department.id AS 'ID',
--     department.department_name AS 'Department'
--     FROM department;

-- ALL ROLES QUERY

-- SELECT role.id AS 'ID',
-- role.title AS 'Title',
-- department.department_name AS 'Department',
-- role.salary AS 'Salary'
-- FROM role
--     LEFT JOIN department ON (department.id = role.department_id)


-- INSERT INTO department (department_name) values ('Playgroup');

-- DELETE FROM department WHERE id = 7;

