const { Schema, model } = require('mongoose');



const partsSchema = new Schema ({
    asset_type: {
        type: String,
        required: true,
      },

      possible_parts: {
        type: String,
        required: true,
      },

      
      
    })

const InstalledParts = model('InstalledParts', partsSchema);

module.exports = InstalledParts