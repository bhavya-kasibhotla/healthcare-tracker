const mongoose =
require("mongoose");

const profileSchema =
new mongoose.Schema({

  userId: {

    type:
      mongoose.Schema.Types.ObjectId,

    ref: "User"
  },

  age: Number,

  gender: String,

  bloodGroup: String,

  allergies: String,

  emergencyContact: String

});

module.exports =
mongoose.model(
  "Profile",
  profileSchema
);