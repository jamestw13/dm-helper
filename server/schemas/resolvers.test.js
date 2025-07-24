import { ApolloServer } from '@apollo/server';

// import { ApolloServer } from '@apollo/server';
const typeDefs = require('./typeDefs');

const testServer = new ApolloServer({ typeDefs, resolvers });

const test = async () => {
  const response = await testServer.executeOperation({
    query: `users {
    _id
    username
    email
  }`,
  });

  console.log(response);
};

// it('test',async()=>{

// })
