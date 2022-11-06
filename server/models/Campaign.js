const { Schema, model } = require('mongoose');

const campaignSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  characters: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
  encounters: [{ type: Schema.Types.ObjectId, ref: 'Encounter' }],
});

const Campaign = model('Campaign', campaignSchema);

module.exports = Campaign;
