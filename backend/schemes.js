const mongoose = require("mongoose");

// mongoose schemes

const PangolinScheme = new mongoose.Schema({
  uid: String,
  username: String,
  password: String,
  class: String,
});

const FriendList = new mongoose.Schema({
  user: String,
  friends: [],
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
