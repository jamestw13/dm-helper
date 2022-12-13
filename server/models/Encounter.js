const { Schema, model } = require('mongoose');

const encounterSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  characters: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
  },
  progress: {
    type: String,
    enum: ['not started', 'active', 'on hold', 'completed'],
    default: 'not started',
  },
  description: { type: String },
  encounterLog: [
    {
      round: { type: Number, require: true },
      turns: [
        {
          turn: { type: Number, require: true },
          character: { type: Schema.Types.ObjectId, ref: 'Character' },
          statuses: [
            {
              condition: { type: String, default: 'Deafened' },
              // { type: Schema.Types.ObjectId, ref: 'Condition' }
              duration: Number,
              startRound: Number,
              startTurn: Number,
            },
          ],
        },
      ],
    },
  ],
});

const Encounter = model('Encounter', encounterSchema);

module.exports = Encounter;
