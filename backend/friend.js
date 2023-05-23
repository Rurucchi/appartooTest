const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// utils
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const { FriendListModel, PangolinModel } = require("./schemes");

function parseToken(token) {
  token = token.slice(7);
  return token;
}

router.post("/add", async (req, res) => {
  try {
    let token = parseToken(req.headers.authorization);
    let decoded;

    let friendToAdd = req.body.friendName;

    let friendExist = await PangolinModel.findOne({ username: friendToAdd });
    if (friendExist) {
      try {
        try {
          decoded = jwt.verify(token, jwtSecretKey);
          console.log(decoded);

          const searchList = await FriendListModel.findOne({
            username: decoded.username,
          });

          let friendList = [];
          friendList.push(searchList.friends);

          if (!searchList.friends.includes(friendToAdd)) {
            if (!searchList.friends) {
              await FriendListModel.findOneAndUpdate(
                {
                  username: decoded.username,
                },
                {
                  friends: [friendToAdd],
                }
              );
              res.status(200).send("Successfully Added");
            } else {
              await FriendListModel.findOneAndUpdate(
                {
                  username: decoded.username,
                },
                { $push: { friends: friendToAdd } }
              );
              res.status(200).send("Successfully Added");
            }
          } else {
            res.status(400).send("User is already a friend!");
          }
        } catch (error) {
          console.log(error);
          res.status(400).send();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      res.status(400).send("User does not exist");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

router.delete("/remove", async (req, res) => {
  try {
    let token = parseToken(req.headers.authorization);
    let decoded = jwt.verify(token, jwtSecretKey);

    let friendToDelete = req.body.friendName;

    const searchList = await FriendListModel.findOne({
      username: decoded.username,
    });
    if (searchList.friends.includes(friendToDelete)) {
      await FriendListModel.findOneAndUpdate(
        {
          username: decoded.username,
        },
        { $pull: { friends: friendToDelete } }
      );
      res.status(200).send();
    } else {
      res.status(404).send("User not in friend list");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("");
  }
});

router.get("/get", async (req, res) => {
  try {
    let token = parseToken(req.headers.authorization);
    let decoded = jwt.verify(token, jwtSecretKey);

    const searchList = await FriendListModel.findOne({
      username: decoded.username,
    });

    res.status(200).send(searchList.friends);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

module.exports = router;
