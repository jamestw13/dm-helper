const { Schema, model } = require('mongoose');

const CharacterSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  race: {
    type: Map,
    trim: true,
  },
  class: {
    type: Map,
    trim: true,
  },
  level: {
    type: Number,
    trim: true,
  },
  background: {
    type: Map,
    trim: true,
  },
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
  profBonus: {
    type: Number,
    trim: true,
  },
  initMod: {
    type: Number,
    trim: true,
  },
  initiative: {
    type: Number,
    trim: true,
  },
  hp: {
    type: Number,
    trim: true,
  },
  ac: {
    type: Number,
    trim: true,
  },
  color: {
    type: String,
    trim: true,
  },
  isNPC: {
    type: Boolean,
    trim: true,
  },
});

const Character = model('Character', CharacterSchema);

module.exports = Character;
