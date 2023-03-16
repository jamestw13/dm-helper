// import express
import express from 'express';

// import path
import path from 'path';

// import mongoose database connection
import db from './config/connection.js';

import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.ACCESS_TOKEN_SECRET, 1);

// import graphQL apollo
import { ApolloServer } from '@apollo/server';

import { expressMiddleware } from '@apollo/server/express4';

import cors from 'cors';
// import { json } from 'body-parser';

import { typeDefs, resolvers } from './schemas/index.js';

// import authorization middleware
import { authMiddleware } from './utils/auth.js';

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  // create a new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // start the Apollo server
  await server.start();

  // app.use(express.urlencoded({ extended: false }));
  app.use('/graphql', cors(), express.json(), expressMiddleware(server, { context: authMiddleware }));
  // log where we can use GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// initialize Apollo server
startServer();

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
