require('dotenv').config();
const express = require('express');

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));

// Get IP info even if passing through a proxy like here
app.enable('trust proxy'); 

app.route('/')
  .get((req, res) => {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.route('/api/whoami')
  .get((req, res) => {
    res.json({ ipaddress: req.ip, language: req.headers['accept-language'], software: req.headers['user-agent'] });
  });

// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404)
    .type('text')
    .send('Not Found');
})

const portNum = process.env.PORT || 3000;

app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
});

module.exports = app; // For testing
