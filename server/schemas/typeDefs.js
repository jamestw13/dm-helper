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

    race: String
    class: String
    level: Int
    hitDice: Int
    background: String
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
    primaryColor: String
    secondaryColor: String

    isNPC: Boolean
    campaign: Campaign
    user: User
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
    encounters: [Encounter]
  }

  type Encounter {
    title: String
    characters: [Character]
    encounterLog: EncounterLog
  }

  scalar EncounterLog

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    characters: [Character]
    character(_id: ID): Character
    campaign(_id: ID): Campaign
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
