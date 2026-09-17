const express = require('express');
const app = express();
const { createHandler } = require('graphql-http/lib/use/express');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
require('dotenv').config({
  path: '../.env'
});

const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use('/graphql', createHandler({
  schema,
  rootValue: {},
}));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;