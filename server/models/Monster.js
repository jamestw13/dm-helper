const { Schema, model } = require('mongoose');

const monsterSchema = new Schema({
  name: String,
  size: String,
  type: String,
  alignment: String,
  ac: Number,
  hp: Number,
  speed: String,
  str: {
    type: Number,
    trim: true,
  },
  dex: {
    type: Number,
    trim: true,
  },
  con: {
    type: Number,
    trim: true,
  },
  int: {
    type: Number,
    trim: true,
  },
  wis: {
    type: Number,
    trim: true,
  },
  cha: {
    type: Number,
    trim: true,
  },
  strMod: {
    type: Number,
    trim: true,
  },
  dexMod: {
    type: Number,
    trim: true,
  },
  conMod: {
    type: Number,
    trim: true,
  },
  intMod: {
    type: Number,
    trim: true,
  },
  wisMod: {
    type: Number,
    trim: true,
  },
  chaMod: {
    type: Number,
    trim: true,
  },
  savingThrows: String,
  skills: String,
  vulResImm: String,
  senses: String,
  languages: String,
  cr: Number,
});

const Monster = model('Monster', monsterSchema);

module.exports = Monster;
