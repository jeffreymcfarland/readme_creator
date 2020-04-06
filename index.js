require("dotenv").config()

const axios = require("axios");

var inquirer = require("inquirer");

console.log("Welcome to the Readme Creator!");
console.log("------------------------------------")

var question = [
    {
        type: "input",
        name: "username",
        message: "What is your github username?"
    }
];

inquirer.prompt(question).then(answer => {
    const username = answer.username;

    axios.get(`https://api.github.com/users/${username}`, {
    headers: {"Authorization": `token ${process.env.JM_TOKEN}`}
    })
    .then(function (response) {
    // handle success
    console.log(response.data.avatar_url);
    console.log(response.data.email);

    const avatar = response.data.avatar_url;
    const email = response.data.email;

    nextPrompt();

    })
    .catch(function (error) {
    // handle error
    console.log(error);
    });

});


const nextQuestions = [
    {
        type: "input",
        name: "Title",
        message: "What is your github project title?"
    },
    {
        type: "input",
        name: "Description",
        message: "Please give a brief description of your project."
    },
    {
        type: "input",
        name: "Installation",
        message: "What are the steps to installing your project?"
    },
    {
        type: "input",
        name: "Usage",
        message: "Describe to the user how to use your project."
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

function nextPrompt() {

    inquirer.prompt(nextQuestions).then(answers => {

        console.log(answers);

        if (answers.License === "Other") {
            console.log("-----Please update License section to include which license you decided to use.");
        };

    });    

};