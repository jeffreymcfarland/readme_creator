require("dotenv").config()

const axios = require("axios");

var inquirer = require("inquirer");

console.log("Welcome to the readme creator!");

var questions = [
    {
        type: "input",
        name: "username",
        message: "What is your github username?"
    }
];

inquirer.prompt(questions).then(answer => {
    const username = answer.username;

    console.log(username);

    axios.get(`https://api.github.com/users/${username}`, {
    headers: {"Authorization": `token ${process.env.JM_TOKEN}`}
    })
    .then(function (response) {
    // handle success
    console.log(response.data.avatar_url);
    console.log(response.data.email);

    const avatar = response.data.avatar_url;
    const email = response.data.email;
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
});



