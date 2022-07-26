const { json } = require('express');
const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes');
// body parser parses the incomming the request body
app.use(express.json());

app.use('/api/v1/users', userRouter);

module.exports = app;
