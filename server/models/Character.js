const { Schema, model } = require('mongoose');

const characterSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Your character needs at least a name. Even just a working name.',
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
    alignment: {
      type: String,
      trim: true,
    },
    background: {
      type: String,
      trim: true,
    },
    alignment: {
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
    currentHP: {
      type: Number,
      trim: true,
    },
    maxHP: {
      type: Number,
      trim: true,
    },
    tempHP: {
      type: Number,
      trim: true,
    },
    totalHD: {
      type: String,
      trim: true,
    },
    currentHD: {
      type: String,
      trim: true,
    },
    dstS1: {
      type: Boolean,
      trim: true,
    },
    dstS2: {
      type: Boolean,
      trim: true,
    },
    dstS3: {
      type: Boolean,
      trim: true,
    },
    dstF1: {
      type: Boolean,
      trim: true,
    },
    dstF2: {
      type: Boolean,
      trim: true,
    },
    dstF3: {
      type: Boolean,
      trim: true,
    },
    atkName: {
      type: String,
      trim: true,
    },
    atkBonus: {
      type: Number,
      trim: true,
    },
    atkDamType: {
      type: String,
      trim: true,
    },
    atkNotes: {
      type: String,
      trim: true,
    },
    copperP: {
      type: Number,
      trim: true,
    },
    silverP: {
      type: Number,
      trim: true,
    },
    electrumP: {
      type: Number,
      trim: true,
    },
    goldP: {
      type: Number,
      trim: true,
    },
    platinumP: {
      type: Number,
      trim: true,
    },
    equipmentNotes: {
      type: String,
      trim: true,
    },
    persTraits: {
      type: String,
      trim: true,
    },
    ideals: {
      type: String,
      trim: true,
    },
    bonds: {
      type: String,
      trim: true,
    },
    flaws: {
      type: String,
      trim: true,
    },
    fsAndTs: {
      type: String,
      trim: true,
    },
    otherProfs: {
      type: String,
      trim: true,
    },
    passPercep: {
      type: Number,
      trim: true,
    },
    strSTProf: {
      type: Boolean,
      trim: true,
    },
    dexSTProf: {
      type: Boolean,
      trim: true,
    },
    conSTProf: {
      type: Boolean,
      trim: true,
    },
    intSTProf: {
      type: Boolean,
      trim: true,
    },
    wisSTProf: {
      type: Boolean,
      trim: true,
    },
    chaSTProf: {
      type: Boolean,
      trim: true,
    },
    strSTmod: {
      type: Number,
      trim: true,
    },
    dexSTmod: {
      type: Number,
      trim: true,
    },
    conSTmod: {
      type: Number,
      trim: true,
    },
    intSTmod: {
      type: Number,
      trim: true,
    },
    wisSTmod: {
      type: Number,
      trim: true,
    },
    chaSTmod: {
      type: Number,
      trim: true,
    },
    skillAcrobatics: {
      type: Number,
      trim: true,
    },
    skillAniHand: {
      type: Number,
      trim: true,
    },
    skillArcana: {
      type: Number,
      trim: true,
    },
    skillAth: {
      type: Number,
      trim: true,
    },
    skillDecep: {
      type: Number,
      trim: true,
    },
    skillHist: {
      type: Number,
      trim: true,
    },
    skillInsight: {
      type: Number,
      trim: true,
    },
    skillIntim: {
      type: Number,
      trim: true,
    },
    skillInvest: {
      type: Number,
      trim: true,
    },
    skillMedicine: {
      type: Number,
      trim: true,
    },
    skillNature: {
      type: Number,
      trim: true,
    },
    skillPercep: {
      type: Number,
      trim: true,
    },
    skillPerform: {
      type: Number,
      trim: true,
    },
    skillPersuasion: {
      type: Number,
      trim: true,
    },
    speed: {
      type: String,
      trim: true,
    },
    skillReligion: {
      type: Number,
      trim: true,
    },
    skillSleightHand: {
      type: Number,
      trim: true,
    },
    skillStealth: {
      type: Number,
      trim: true,
    },
    skillSurvival: {
      type: Number,
      trim: true,
    },

    skillProfAcrobatics: {
      type: Boolean,
      trim: true,
    },
    skillProfAniHand: {
      type: Boolean,
      trim: true,
    },
    skillProfArcana: {
      type: Boolean,
      trim: true,
    },
    skillProfAth: {
      type: Boolean,
      trim: true,
    },
    skillProfDecep: {
      type: Boolean,
      trim: true,
    },
    skillProfHist: {
      type: Boolean,
      trim: true,
    },
    skillProfInsight: {
      type: Boolean,
      trim: true,
    },
    skillProfIntim: {
      type: Boolean,
      trim: true,
    },
    skillProfInvest: {
      type: Boolean,
      trim: true,
    },
    skillProfMedicine: {
      type: Boolean,
      trim: true,
    },
    skillProfNature: {
      type: Boolean,
      trim: true,
    },
    skillProfPercep: {
      type: Boolean,
      trim: true,
    },
    skillProfPerform: {
      type: Boolean,
      trim: true,
    },
    skillProfPersuasion: {
      type: Boolean,
      trim: true,
    },
    skillProfReligion: {
      type: Boolean,
      trim: true,
    },
    skillProfSleightHand: {
      type: Boolean,
      trim: true,
    },
    skillProfStealth: {
      type: Boolean,
      trim: true,
    },
    skillProfSurvival: {
      type: Boolean,
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
      // required: 'Character needs to be associated with a user.',
    },
  },
  { toJSON: { virtuals: true } }
);

const Character = model('Character', characterSchema);

module.exports = Character;
