const { Schema, model } = require('mongoose');

const encounterSchema = new Schema({
  // Encounter Name
  title: {
    type: String,
    require: true,
  },

  // Free text notes about
  description: { type: String },

  // Whether the encounter is active or not
  progress: {
    type: String,
    enum: ['not started', 'active', 'paused', 'completed'],
    default: 'not started',
  },

  // Characters in encounter
  characters: [
    {
      character: { type: Schema.Types.ObjectId, ref: 'Character' },
      initiative: { type: Number, default: 4 },
    },
  ],

  // Statuses or other notes
  effects: [
    {
      dmOnlyView: { type: Boolean, default: true },
      caster: { type: Schema.Types.ObjectId, ref: 'Character' },
      target: { type: Schema.Types.ObjectId, ref: 'Character' },
      effectName: String,
      effectDescription: String,
      startRound: Number,
      startTurn: Number,
      endRound: Number,
      endTurn: Number,
    },
  ],
});

const Encounter = model('Encounter', encounterSchema);

module.exports = Encounter;
