// import express
const express = require('express');

// import path
const path = require('path');

// import mongoose database connection
const db = require('./config/connection');

require('dotenv').config();
console.log(process.env.ACCESS_TOKEN_SECRET, 1);

// import graphQL apollo
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');

// import authorization middleware
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  // create a new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  // start the Apollo server
  await server.start();

  // integrate Apollo server with Express app as middleware
  server.applyMiddleware({ app });

  // log where we can use GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// initialize Apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
