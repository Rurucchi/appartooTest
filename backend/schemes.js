const mongoose = require("mongoose");

// mongoose schemes

const PangolinScheme = mongoose.Schema({
  uid: String,
  username: String,
  password: String,
  class: String,
});

const FriendList = mongoose.Schema({
  user: String,
  friends: Array,
});

// models init
const PangolinModel = mongoose.model("pangolin", PangolinScheme);
const FriendListModel = mongoose.model("friendList", FriendList);

module.exports = {
  PangolinScheme,
  PangolinModel,
  FriendList,
  FriendListModel,
};
