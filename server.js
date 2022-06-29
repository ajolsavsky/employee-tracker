const connection = require('./config/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

connection.connect(err => {
    if (err) throw err;
    console.log('✅ You are now connected');
    console.log(`
    -------------------------------
    
    👨‍💼 EMPLOYEE TRACKER DATABASE 👩‍💼
    
    -------------------------------
    `)
    init();
})

const questionsLaunch = [
    {
        type: 'list',
        message: 'Please select from the following options:',
        name: 'launchAnswer',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit database']
    }
]

const deptQuestion = [
    {
        type: 'input',
        message: 'Enter the new department name',
        name: 'deptName'
    }
]

const init = async () => {
    const data = await inquirer.prompt(questionsLaunch)
        if (data.launchAnswer === 'View all departments') {
            showDepts();
        } else if (data.launchAnswer === 'View all roles') {
            showRoles();
        } else if (data.launchAnswer === 'View all employees') {
            showEmployees();
        } else if (data.launchAnswer === 'Add a department') {
            addDept();
        } else if (data.launchAnswer === 'Add a role') {
            addRole();
        } else if (data.launchAnswer === 'Add an employee') {
            addEmployee();
        } else if (data.launchAnswer === 'Update an employee role') {
            updateEmployee();
        } else if (data.launchAnswer === 'Exit database'){
            console.log(`
            
            Goodbye! 👋

            `)
            connection.end()
        }
}

const showDepts = () => {
    console.log(`
    
    🏢 VIEWING ALL DEPARTMENTS

    `);
    
    const sql = `
    SELECT department.id AS 'ID',
        department.department_name AS 'Department'
        FROM department;
    `
    connection.query(sql, (err, rows) => {
        if (err) throw (err);
        console.table(rows);
        init();
    });
};

const showRoles = () => {
    console.log(`
    
    📋 VIEWING ALL ROLES

    `);
    const sql = `
    SELECT role.id AS 'ID',
        role.title AS 'Title',
        department.department_name AS 'Department',
        role.salary AS 'Salary'
    FROM role
        LEFT JOIN department 
        ON (department.id = role.department_id)
    `
    connection.query(sql, (err, rows) => {
        if (err) throw (err);
        console.table(rows);
        init();
    });
}

const showEmployees = () => {
    console.log(`
    
    🧑‍💼 VIEWING ALL EMPLOYEES

    `);
    const sql = `
    SELECT employee.id AS 'ID', 
        employee.first_name AS 'First Name', 
        employee.last_name AS 'Last Name', 
        role.title AS 'Role', 
        department.department_name AS 'Department',
        role.salary AS 'Salary',
        CONCAT (manager.first_name, " ", manager.last_name) AS 'Manager'
    FROM employee 
        LEFT JOIN role ON (employee.role_id = role.id)
        LEFT JOIN department ON (department.id = role.department_id)
        LEFT JOIN employee manager ON employee.manager_id = manager.id`;
    connection.query(sql, (err, rows) => {
        if (err) throw (err);
        console.table(rows);
        init();
    });
};

const addDept = async () => {
    console.log(`
    
    🏢 ADD A DEPARTMENT

    `);
    const data = await inquirer.prompt(deptQuestion);
    const { deptName } = data;
    const sql = `
        INSERT INTO department (department_name) values ('${deptName}');
        `;
    connection.query(sql, (err, rows) => {
        if (err)
            throw (err);
        console.log(`
        
    ${deptName} department has been added! ✅
        
        `);
        init();
    });

}

const addRole = () => {
    console.log(`
    
    📋 ADD A ROLE

    `)
    const sql = `SELECT * FROM department`;
    
    connection.query(sql, (err, data) => {
        if (err) throw err;
        const dept = data.map(({ id, department_name }) => ({ name: department_name, value: id }));

        return inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of the role?',
                name: 'title'
            },
            {
                type: 'input',
                message: 'What is the salary of the role?',
                name: 'salary'
            },
            {
                type: 'list',
                message: 'Which department does the role belong to?',
                choices: dept,
                name: 'deptName'
            }
        ])
        .then((answers) => {
            const { title, salary, deptName } = answers;
            const sqlA = `
            INSERT INTO role (title, salary, department_id) VALUES ('${title}','${salary}', ${deptName})
            `;
            
            connection.query(sqlA, (err) => {
                if (err)
                    throw (err);
                console.log(`
                
    ${title} has been added! ✅
                
                `);
                init()
        });
    });
});
}

const addEmployee = () => {
    console.log(`
    
    🧑‍💼 ADD AN EMPLOYEE

    `)

    const sqlRole = `SELECT * FROM role`;
    
    connection.query(sqlRole, (err, data) => {
        if (err) throw err;
        const role = data.map(({ id, title, salary, department_id  }) => ({ name: title, salary: salary, department: department_id, value: id }));

        const employeeArr = [];

        return inquirer.prompt([
            {
                type: 'input',
                message: "What is the employee's first name?",
                name: 'firstName'
            },
            {
                type: 'input',
                message: "What is the employee's last name?",
                name: 'lastName'
            },
            {
                type: 'list',
                message: "What is the employee's role?",
                choices: role,
                name: 'roleName'
            }
        ])
        .then((answers) => {
            employeeArr.push(answers.firstName, answers.lastName, answers.roleName);

            const managerSql = `SELECT * FROM employee`;

            connection.query(managerSql, (err, data) => {
                if (err) throw err;
                const managers = data.map(({ id, first_name, last_name}) => ({ name: first_name + " " + last_name, value: id}));

                inquirer.prompt([
                    {
                        type: 'list',
                        message: "Who is the employee's manager?",
                        choices: managers,
                        name: 'manager'
                    }
                ])
                .then(managerChoice => {
                    const manager = managerChoice.manager;
                    employeeArr.push(manager);

                    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

                    connection.query(sql, employeeArr, (err, result) => {
                        if (err) throw err;
                        console.log(`
                        
    Employee has been added! ✅

                        `);
                        init();
                    })

                })
            })
        });
    });
}

const updateEmployee = () => {
    console.log(`
    
    📋 UPDATE EMPLOYEE ROLE

    `);
    
    const sql = `SELECT * FROM employee`;

    connection.query(sql, (err, data) => {
        if (err) throw err;

        const employees = data.map(({ id, first_name, last_name}) => ({ name: first_name + " " + last_name, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                message: 'Which employee would you like to update?',
                choices: employees,
                name: 'name'
            }
        ])
        .then(employeeChoice => {
            const employee = employeeChoice.name;
            const params = [];
            params.push(employee);

            const roleSql = `SELECT * FROM role`;

            connection.query(roleSql, (err, data) => {
                if (err) throw (err);
                const roles = data.map(( { id, title }) => ({ name: title, value: id }));

                inquirer.prompt([
                    {
                        type: 'list',
                        message: 'What role should this employee have?',
                        choices: roles,
                        name: 'role'
                    }
                ])
                .then(roleChoice => {
                    const role = roleChoice.role;
                    params.push(role);

                    const reversedParams = params.reverse();

                    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`

                    connection.query(sql, reversedParams, (err, result) => {
                        if (err) throw err;
                        console.log(`
                        
    Employee role has been updated! ✅
                    
                                            `);

                        init();
                    })
                })
            })
        })
    })
}