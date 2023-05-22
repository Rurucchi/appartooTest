const express = require("express");
const router = express.Router();

// utils
const { v4: uuidv4 } = require("uuid");

// models
const { PangolinModel, PangolinScheme } = require("./schemes");

router.post("new", async (req, res) => {
  try {
    const pangolin = new PangolinModel({
      uid: uuidv4(),
      username: req.body.username,
      password: req.body.password,
    });

    try {
      await user.save();
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
});
