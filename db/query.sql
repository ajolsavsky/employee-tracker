SELECT employee.id AS 'ID', 
    employee.first_name AS 'First Name', 
    employee.last_name AS 'Last Name', 
    role.title AS 'Role', 
    department.department_name AS 'Department'
    role.salary AS 'Salary',
    CONCAT (manager.first_name)
FROM employee 
    LEFT JOIN role ON (employee.role_id = role.id)
    LEFT JOIN department ON (department.id = role.department_id);