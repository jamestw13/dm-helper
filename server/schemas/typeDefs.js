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
    friends: [User]
  }

  type Character {
    _id: ID
    name: String
    race: String
    class: String
    hitDice: Int
    level: Int
    alignment: String
    background: String
    speed: String
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
    currentHP: Int
    maxHP: Int
    tempHP: Int
    totalHD: String
    currentHD: String
    dstS1: Boolean
    dstS2: Boolean
    dstS3: Boolean
    dstF1: Boolean
    dstF2: Boolean
    dstF3: Boolean
    atkName: String
    atkBonus: Int
    atkDamType: String
    atkNotes: String
    copperP: Int
    silverP: Int
    electrumP: Int
    goldP: Int
    platinumP: Int
    equipmentNotes: String
    persTraits: String
    ideals: String
    bonds: String
    flaws: String
    fsAndTs: String
    otherProfs: String
    passPercep: Int
    strSTProf: Boolean
    dexSTProf: Boolean
    conSTProf: Boolean
    intSTProf: Boolean
    wisSTProf: Boolean
    chaSTProf: Boolean
    strSTmod: Int
    dexSTmod: Int
    conSTmod: Int
    intSTmod: Int
    wisSTmod: Int
    chaSTmod: Int
    skillAcrobatics: Int
    skillAniHand: Int
    skillArcana: Int
    skillAth: Int
    skillDecep: Int
    skillHist: Int
    skillInsight: Int
    skillIntim: Int
    skillInvest: Int
    skillMedicine: Int
    skillNature: Int
    skillPercep: Int
    skillPerform: Int
    skillPersuasion: Int
    skillReligion: Int
    skillSleightHand: Int
    skillStealth: Int
    skillSurvival: Int

    skillProfAcrobatics: Boolean
    skillProfAniHand: Boolean
    skillProfArcana: Boolean
    skillProfAth: Boolean
    skillProfDecep: Boolean
    skillProfHist: Boolean
    skillProfInsight: Boolean
    skillProfIntim: Boolean
    skillProfInvest: Boolean
    skillProfMedicine: Boolean
    skillProfNature: Boolean
    skillProfPercep: Boolean
    skillProfPerform: Boolean
    skillProfPersuasion: Boolean
    skillProfReligion: Boolean
    skillProfSleightHand: Boolean
    skillProfStealth: Boolean
    skillProfSurvival: Boolean

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
    _id: ID
    title: String
    progress: String
    characters: [Character]
    encounterLog: [Round]
    description: String
  }

  type Round {
    round: Int
    turns: [Turn]
  }

  type Turn {
    turn: Int
    character: Character
    statuses: [Status]
  }

  type Status {
    condition: String
    duration: Int
    durationUnit: String
    startRound: Int
    startTurn: Int
    caster: Character
    target: Character
  }

  type Query {
    me: User
    users: [User]
    user(_id: ID!): User
    characters: [Character]
    character(_id: ID): Character
    campaign(_id: ID): Campaign
    encounter(_id: ID): Encounter
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addCharacter(character: CharacterInput!): Character
  }

  type Auth {
    token: ID!
    user: User
  }

  input CharacterInput {
    name: String!
    user: ID!
  }
`;

module.exports = typeDefs;
