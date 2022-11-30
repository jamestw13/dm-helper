const { Schema, model } = require('mongoose');
const { characterSchema } = require('./Character');

const encounterSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  characters: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
  },
  encounterLog: { type: Object },
});

const Encounter = model('Encounter', encounterSchema);

module.exports = Encounter;
