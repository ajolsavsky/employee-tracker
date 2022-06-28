const connection = require('./config/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

const Department = require('./lib/department');

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
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
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
            console.log('You selected add a role')
        } else if (data.launchAnswer === 'Add an employee') {
            console.log('You selected add an employee')
        } else if (data.launchAnswer === 'Update an employee role') {
            console.log('You selected update an employee role')
        } else {
            console.log("Please select one of the options")
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
    
    🧑‍💼 ADD A DEPARTMENT

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