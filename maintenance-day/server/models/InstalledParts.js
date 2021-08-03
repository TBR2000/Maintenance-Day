const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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

const InstalledParts = mongoose.model('Parts', partsSchema);

module.exports = InstalledParts