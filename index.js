// const express = require('express');
// const sequelize = require('./config/connection');
// const mysql = require('mysql2');
const inquirer = require('inquirer');

// const app = express();
// const PORT = process.env.PORT || 3001;
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const questionsLaunch = [
    {
        type: 'list',
        message: 'Please select from the following options:',
        name: 'launchAnswer',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }
]

const init = async () => {
    console.log(`
    -------------------------------
    Welcome to employee tracker!👨‍💼👩‍💼
    -------------------------------
    `)

    const data = await inquirer.prompt(questionsLaunch)
        if (data.launchAnswer === 'View all departments') {
            console.log('You selected view all departments');
        } else if (data.launchAnswer === 'View all roles') {
            console.log('You selected view all roles');
        } else if (data.launchAnswer === 'View all employees') {
            console.log('You selected view all employees')
        } else if (data.launchAnswer === 'Add a department') {
            console.log('You selected add a department')
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

init();

// sequelize.sync().then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });

// const express = require('express');
// const mysql = require('mysql2');

// const PORT = process.env.PORT || 3001;
// const app = express();

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.listen(PORT, () => {
// console.log(`Server running on port ${PORT}`);
// });
  