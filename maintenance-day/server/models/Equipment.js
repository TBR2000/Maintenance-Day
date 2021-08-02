const { Schema, model } = require('mongoose');

const equipmentSchema = new Schema({
  equipment_type: {
    type: String,
    required: true,
  },

  equipment_name: {
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
  }
});

const Equipment = model('Equipment', equipmentSchema);

module.exports = Equipment;
