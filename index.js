const express = require('express')
const app = express()

const  dotenv = require('dotenv');
dotenv.load({ path: '.env' || ""});

const slackClient = require('./slackClient');
let witClient = require('./witClient');
witClient = witClient.init(process.env.WIT_TOKEN);
slackClient.init();


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})