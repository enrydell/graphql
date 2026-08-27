const express = require('express');
const app = express();
const { graphqlHTTP } = require('graphql-http');

app.use('/graphql', graphqlHTTP({
  schema: require('./schema/schema'), // Replace with your GraphQL schema
  rootValue: {}, // Replace with your root value
  graphiql: true, // Enable GraphiQL interface
}));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;