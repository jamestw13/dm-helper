const { Schema, model } = require('mongoose');
const User = require('./User');

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
  autogenerated: { type: Boolean, default: false },
});

const Campaign = model('Campaign', campaignSchema);

module.exports = Campaign;
