const { Schema, model } = require('mongoose');



const responseSchema = new Schema({
  question: {
    type: String,
    required: true,
  },

  response: {
    type: String,
    required: true
  },

  asset: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Assets'
    }
  ]
});

const Responses = model('Responses', responseSchema);

module.exports = Responses;