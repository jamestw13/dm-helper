// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    firstname: String
    lastname: String
    characters: [Character]
    campaigns: [Campaign]
    avatar: String
  }

  type Character {
    _id: ID
    name: String
    race: Race
    class: Class
    level: Int
    background: Background
    str: Int
    dex: Int
    con: Int
    int: Int
    wis: Int
    cha: Int
    strMod: Int
    dexMod: Int
    conMod: Int
    intMod: Int
    wisMod: Int
    chaMod: Int
    profBonus: Int
    initMod: Int
    initiative: Int
    hp: Int
    ac: Int
    color: String
    isNPC: Boolean
    campaign: Campaign
  }

  type Race {
    type: String
  }

  type Class {
    type: String
    hitDice: Int
  }

  type Background {
    type: String
  }

  type Campaign {
    _id: ID
    name: String
    owner: User
    characters: [Character]
    players: [User]
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
