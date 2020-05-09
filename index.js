const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const env = require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.post('/', function(req, res) {
  const phoneNumber = "1" + req.body.phoneNumber;
  const message = req.body.message;

  console.log(phoneNumber, message);

  client.messages
    .create({
      body: message,
      from: '12058398727',
      to: phoneNumber
    })
    .then(function() {
      res.sendFile(__dirname + '/success.html');
    })
    .catch(function(e) {
      res.sendFile(__dirname + '/failure.html');
    });
})

app.post('/failure', function(req, res) {
  res.redirect('/');
})

app.listen(3000, function() {
  console.log('Listening on port 3000');
})
