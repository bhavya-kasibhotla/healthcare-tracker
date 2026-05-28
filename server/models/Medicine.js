const mongoose =
require("mongoose");

const medicineSchema =
new mongoose.Schema({

  userId: {

    type:
      mongoose.Schema.Types.ObjectId,

    ref: "User"
  },

  medicineName: String,

  dosage: String,

  timing: String,

  taken: {

    type: Boolean,

    default: false
  }

});

module.exports =
mongoose.model(
  "Medicine",
  medicineSchema
);