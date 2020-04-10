require("dotenv").config()

const axios = require("axios");

const inquirer = require("inquirer");

const fs = require("fs");

inquirer.registerPrompt('emoji', require('inquirer-emoji'))

console.log("Welcome to the Readme Creator!");
console.log("------------------------------------")




const nextQuestions = [
    {
        type: "input",
        name: "username",
        message: "What is your github username?"
    },
    {
        type: "input",
        name: "Title",
        message: "What is your github project title?"
    },
    {
        type: "input",
        name: "Description",
        message: "Give a brief description about this project."
    },
    {
        type: "emoji",
        name: "projectEmoji",
        message: "Find an emoji that best describes your project:"
    },
    {
        type: "confirm",
        name: "Installation",
        message: "Is there any dependencies your app needs installed?"
    },
    {
        type: "input",
        name: "usageCode",
        message: "If applicable, please type what a user would need to input into the vs terminal to run this app."
    },
    {
        type: "input",
        name: "Usage",
        message: "Describe how to use your application."
    },
    {
        type: "list",
        name: "License",
        message: "Which License are you using for your project?",
        choices: ["MIT", "GPLv2", "Apache", "Other"]
    },
    {
        type: "input",
        name: "Contributing",
        message: "Please list the names of anyone who contributed to this project, each name separated by a comma."
    }
];


    inquirer.prompt(nextQuestions).then(answers => {


        const username = answers.username;

            axios.get(`https://api.github.com/users/${username}`, {
            headers: {"Authorization": `token ${process.env.JM_TOKEN}`}
            })
            .then(function (response) {
            // handle success

            const avatar = response.data.avatar_url;
            const email = response.data.email;

            const run = "npm install";
            if (answers.Installation !== true) {
                console.log("-----Please update installation section to fit your project.")
            };

            if (answers.License === "Other") {
                console.log("-----Please update License section to include name of which license you are using.");
            };
    
            const title = answers.Title;
            const about = answers.Description;
            const emoji = answers.projectEmoji;
    
            const usageCode = answers.usageCode;
            const usage = answers.Usage;
    
            const license = answers.License;
            const contributing = answers.Contributing.split(",").join("\n\n");
    
            const markdown =
`
# <div align="center">${title}</div>

## ${emoji} About

${about}

***
## Table of Contents
1. [Install](#install)
2. [Usage](#usage)
3. [License](#license)
4. [Contributing](#contributing)
5. [Contact Me](#contact-me)

***
## Install

To install dependencies in this app, clone this repo and run 
\`\`\`
${run}
\`\`\`

***
## Usage

To use this app, simply run
\`\`\`
${usageCode}
\`\`\`
in the vs terminal. 
${usage}

***
## License

![badge](https://img.shields.io/badge/License-${license}-success)

***
## Contributing

${contributing}

***
## Contact Me    

<kbd><img src="${avatar}" /></kbd> 
* Email: <${email}>
`
    
            fs.writeFile("test.md", markdown, (err) => {
                if (err) {
                    return console.log(err);
                };
              });

            })
            .catch(function (error) {
            // handle error
            console.log(error);
            });

        
    });    

