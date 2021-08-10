const { Schema, model } = require('mongoose');



const assetSchema = new Schema({
  asset_type: {
    type: String,
    required: true,
  },

  asset_name: {
    type: String,
    required: true
  },

  installed_parts: {
    type: String,
    required: false,
  },

  part_number: {
    type: String,
    required: false
  },

  maintenance_month: {
    type: String,
    required: true
  }


});

const Assets = model('Assets', assetSchema);

module.exports = Assets;
