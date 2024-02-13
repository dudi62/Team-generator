// Importing required modules and classes
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

// Defining output directory and file path
const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./src/page-template.js');

// Array to store all team members
let team = [];

// Function to get manager's details and add them to the team array
const getManagersDetails = () => {
  const mangerQuestions = () => {
    return inquirer.prompt([
      {
        type: 'input',
        message: 'Team managers name',
        name: 'managersName',
        validate: function (value) {
          if (!/\d/.test(value) && value !== '') {
            return true;
          } else {
            return 'Please enter a valid name (cannot be a number or an empty line).';
          }
        },
      },
      {
        type: 'input',
        message: 'Managers ID',
        name: 'managersID',
        validate: function (value) {
          if (/\d/.test(value) && value !== '') {
            return true;
          } else {
            return 'Please enter a valid ID (must be a number).';
          }
        },
      },
      {
        type: 'input',
        message: 'Managers email address',
        name: 'managersEmail',
        validate: function (value) {
          if (value !== '') {
            return true;
          } else {
            return "Can't be an empty value";
          }
        },
      },
      {
        type: 'input',
        message: 'Managers office number',
        name: 'managersNumber',
        validate: function (value) {
          if (/\d/.test(value) && value !== '') {
            return true;
          } else {
            return 'Please enter a phone number';
          }
        },
      },
    ]);
  };
  async function init() {
    try {
      const managerInfo = await mangerQuestions();
      const manager = new Manager(
        managerInfo.managersName,
        managerInfo.managersID,
        managerInfo.managersEmail,
        managerInfo.managersNumber
      );
      team.push(manager);
      selectOption();
    } catch (err) {
      console.log(err);
    }
  }
  init();
};

// Function to get engineer's details and add them to the team array
const addNewEngineer = () => {
  const addEngineer = () => {
    return inquirer.prompt([
      {
        type: 'input',
        message: "Engineer's name",
        name: 'engineersName',
        validate: function (value) {
          if (!/\d/.test(value) && value !== '') {
            return true;
          } else {
            return 'Please enter a valid name (cannot be a number or an empty line).';
          }
        },
      },
      {
        type: 'input',
        message: "Engineer's ID",
        name: 'engineersID',
        validate: function (value) {
          if (/\d/.test(value) && value !== '') {
            return true;
          } else {
            return 'Please enter a valid ID (must be a number).';
          }
        },
      },
      {
        type: 'input',
        message: "Engineer's email address",
        name: 'engineerEmail',
        validate: function (value) {
          if (value !== '') {
            return true;
          } else {
            return "Can't be an empty value";
          }
        },
      },
      {
        type: 'input',
        message: "Engineer's GitHub username",
        name: 'engineerGithub',
        validate: function (value) {
          if (value !== '') {
            return true;
          } else {
            return "Can't be an empty value";
          }
        },
      },
    ]);
  };
  async function init() {
    try {
      const engineerInfo = await addEngineer();
      const engineer = new Engineer(
        engineerInfo.engineersName,
        engineerInfo.engineersID,
        engineerInfo.engineerEmail,
        engineerInfo.engineerGithub
      );
      team.push(engineer);
      selectOption();
    } catch (err) {
      console.log(err);
    }
  }
  init();
};

// Function to get intern's details and add them to the team array
const addNewIntern = () => {
  const addIntern = () => {
    return inquirer.prompt([
      {
        type: 'input',
        message: "Intern's name:",
        name: 'internsName',
        validate: function (value) {
          if (!/\d/.test(value) && value !== '') {
            return true;
          } else {
            return 'Please enter a valid name (cannot be a number or an empty line).';
          }
        },
      },
      {
        type: 'input',
        message: "Interns's ID:",
        name: 'internsID',
        validate: function (value) {
          if (/\d/.test(value) && value !== '') {
            return true;
          } else {
            return 'Please enter a valid ID (must be a number).';
          }
        },
      },
      {
        type: 'input',
        message: "Intern's email address:",
        name: 'einternsEmail',
        validate: function (value) {
          if (value !== '') {
            return true;
          } else {
            return "Can't be an empty value";
          }
        },
      },
      {
        type: 'input',
        message: "Intern's school:",
        name: 'internsSchool',
        validate: function (value) {
          if (value !== '') {
            return true;
          } else {
            return "Can't be an empty value";
          }
        },
      },
    ]);
  };
  async function init() {
    try {
      const internInfo = await addIntern();
      const intern = new Intern(
        internInfo.internsName,
        internInfo.internsID,
        internInfo.einternsEmail,
        internInfo.internsSchool
      );
      team.push(intern);
      selectOption();
    } catch (err) {
      console.log(err);
    }
  }
  init();
};

// Function to select the next step (add engineer, add intern, or finish building the team)
const selectOption = () => {
  const selectAction = () => {
    return inquirer.prompt([
      {
        type: 'list',
        message: 'Select your next step',
        choices: [
          'Add an engineer',
          'Add an inter',
          'Finish building the team',
        ],
        name: 'options',
      },
    ]);
  };
  async function init() {
    try {
      const options = await selectAction();
      console.log(options.options);
      if (options.options === 'Add an engineer') {
        addNewEngineer();
      } else if (options.options === 'Add an inter') {
        addNewIntern();
      } else {
        const html = render(team);
        // Write HTML content 
        fs.writeFile(outputPath, html, (err) => {
          if (err) {
            console.error('Error writing HTML file:', err);
          } else {
            console.log('Team HTML file generated successfully:', outputPath);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  init();
};

// Start the application by getting manager's details
getManagersDetails();
