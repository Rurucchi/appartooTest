const mongoose = require("mongoose");

// mongoose schemes

const PangolinScheme = mongoose.Schema({
  uid: Number,
  username: String,
  password: String,
  class: String,
});

const PangolinModel = mongoose.model("pangolin", PangolinScheme);

module.exports = {
  PangolinScheme,
  PangolinModel,
};
