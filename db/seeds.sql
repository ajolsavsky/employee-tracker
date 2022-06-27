INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(7, 'John', 'Doe', 1, 10),
(8, 'Jenny', 'Dean', 3, 9),
(9, 'Gerald', 'McQueen', 4, 12),
(10, 'Annie', 'Anderson', 2, 12),
(11, 'Christopher', 'Plumb', 5, 12),
(12, 'Augustine', 'Smote', 9),
(13, 'JerJer', 'Banksy', 6, 14),
(14, 'Ollie', 'Ogno', 7, 12),
(15, 'Quinn', 'Burrell', 8, 12)

INSERT INTO employee_role (id, title, salary, department_id)
VALUES
(1, 'Graphic Designer', 80000, 1),
(2, 'Design Lead', 95000, 1),
(3, 'Salesperson', 80000, 2),
(4, 'Sales Lead', 100000, 2),
(5, 'Human Resources Representative', 95000, 3),
(6, 'Accountant', 115000, 4),
(7, 'Accounts Manager', 125000, 4),
(8, 'Lawyer', 150000, 5),
(9, 'President', 250000, 6)


INSERT INTO department (id, department_name)
VALUES
(1, 'Marketing'),
(2, 'Sales'),
(3, 'Human Resources'),
(4, 'Finance'),
(5, 'Legal'),
(6, 'Leadership')