const { Schema, model } = require('mongoose');

const partsSchema = new Schema ({
    equipment_type: {
        type: String,
        required: true,
      },

      possible_parts: {
        type: String,
        required: true,
      },
      
    })