const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // Loads the env file into the process.env
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.password);
mongoose.connect(DB).then((doc) => {
  // console.log(doc.connection);
  console.log('Database connected successfully');
});

const port = 4000;
app.listen(port, (err) => {
  console.log(`Listening from port ${port}... `);
});
