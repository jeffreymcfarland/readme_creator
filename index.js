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


var nextQuestions = [
    {
        type: "input",
        name: "Title",
        message: "What is your github project title?"
    },
    {
        type: "input",
        name: "Description",
        message: "Please give a description of your project."
    },
    {
        type: "checkbox",
        name: "Table of Contents",
        message: "Select which of the following you want to include in the Table of Contents",
        choices: [
            "Installation",
            "Usage",
            "License",
            "Contributing",
            "Tests",
            "Questions"
        ]
    }
];

function nextPrompt() {

    inquirer.prompt(nextQuestions).then(answers => {
        console.log(answers);
    });

};