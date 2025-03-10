const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes/router');
const { configureExpress } = require('./config/express');
const { configureSession } = require('./config/session');
const { initializeDatabase } = require('./utils/database');
const { startServer } = require('./utils/server');

dotenv.config();

const app = express();

initializeDatabase().catch(err => {
  console.error('Database initialization failed, but continuing app startup');
});

configureExpress(app);

app.use(configureSession());

app.use("/", router);

startServer(app);

module.exports = app;