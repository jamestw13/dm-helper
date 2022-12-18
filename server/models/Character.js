const { Schema, model } = require('mongoose');

const characterSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required:
        'Your character needs at least a name. Even just a working name.',
    },
    race: {
      type: String,
      trim: true,
    },
    class: {
      type: String,
      trim: true,
    },
    hitDice: {
      type: Number,
    },
    level: {
      type: Number,
      trim: true,
    },
    background: {
      type: String,
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
    primaryColor: {
      type: String,
      trim: true,
    },
    secondaryColor: {
      type: String,
      trim: true,
    },
    isNPC: {
      type: Boolean,
      trim: true,
    },
    campaign: {
      type: Schema.Types.ObjectId,
      ref: 'Campaign',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: 'Character needs to be associated with a user.',
    },
  },
  { toJSON: { virtuals: true } }
);

const Character = model('Character', characterSchema);

module.exports = Character;
