require('dotenv').config();
const express = require('express');
const path = require('path');
const passport = require('passport');
const cors = require('cors');

// Passport Config
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 3001;

//Import routes
const Users = require('./routes/users');
const Dashboard = require('./routes/dashboard');

// Configure DB
const db = require('./models');

// Define middleware here
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Passport middleware
app.use(passport.initialize());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
} else {
  app.use(cors());
}

// Define API routes here
app.use('/api/user', Users);
app.use('/api/dashboard', Dashboard);

// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  const data = {
    serverUrl: `${req.get('host')}:${PORT}`
  };

  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}

db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
});

module.exports = app;
