require('dotenv').config()

const axios = require("axios");

const username = "jeffreymcfarland";


axios.get(`https://api.github.com/users/${username}`, {
    headers: {"Authorization": `token ${process.env.JM_TOKEN}`}
})
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
