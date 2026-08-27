const express = require('express');
const app = express();
const { createHandler } = require('graphql-http/lib/use/express');
const schema = require('./schema/schema');

app.use('/graphql', createHandler({
  schema,
  rootValue: {},
}));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;