INSERT INTO department (department_name)
VALUES
('Marketing'),
('Sales'),
('Human Resources'),
('Finance'),
('Legal'),
('Leadership');

INSERT INTO role (title, salary, department_id)
VALUES
('Graphic Designer', 80000, 1),
('Design Lead', 95000, 1),
('Salesperson', 80000, 2),
('Sales Lead', 100000, 2),
('Human Resources Representative', 95000, 3),
('Accountant', 115000, 4),
('Accounts Manager', 125000, 4),
('Lawyer', 150000, 5),
('President', 250000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 9, NULL),
('Jenny', 'Dean', 1, 1),
('Gerald', 'McQueen', 2, 1),
('Annie', 'Anderson', 3, 1),
('Christopher', 'Plumb', 4, 1),
('Augustine', 'Smote', 5, 1),
('JerJer', 'Banksy', 6, 1),
('Ollie', 'Ogno', 7, 1),
('Quinn', 'Burrell', 8, 1);
