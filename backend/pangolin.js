const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// utils
const { v4: uuidv4 } = require("uuid");
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// models
const { PangolinModel, FriendListModel } = require("./schemes");

// class types          ps: could've used typescript but too much debugging for the little time I have
const classList = ["guerrier", "alchimiste", "sorcier", "espion", "enchanteur"];

// functions
async function checkIfUserExists(username) {
  let doesExist = false;
  try {
    let user = await PangolinModel.findOne({ username: username }).exec();

    if (!user) {
      doesExist = true;
    }
  } catch (error) {
    console.log(error);
  }
  console.log(doesExist);
  return doesExist;
}

function parseToken(token) {
  token = token.slice(7);
  return token;
}

// CRUD
router.post("/new", async (req, res) => {
  try {
    // check if user exists
    if (await checkIfUserExists(req.body.username)) {
      try {
        const pangolin = new PangolinModel({
          uid: uuidv4(),
          username: req.body.username,
          password: req.body.password,
          class: req.body.class,
        });

        const friendList = new FriendListModel({
          user: req.body.username,
          friends: [],
        });

        // saving user to db
        await pangolin.save();
        await friendList.save();
        res.status(200).send("Successfully created!");
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      }
    } else {
      res.status(406).send("User already exists!");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Bad Request");
  }
});

router.get("/view/:name", async (req, res) => {
  try {
    const query = await PangolinModel.findOne({ username: req.params.name });

    const userRes = {
      username: query.username,
      class: query.class,
    };

    res.status(200).send(userRes);
  } catch (error) {
    res.status(404).send("User not found");
  }
});

router.patch("/update", async (req, res) => {
  try {
    let token = parseToken(req.headers.authorization);
    let decoded;

    toChange = req.body.toChange;

    decoded = jwt.verify(token, jwtSecretKey);
    console.log(decoded);

    if (toChange != "uid") {
      await PangolinModel.findOneAndUpdate(
        { uid: decoded.uid },
        { [toChange]: req.body.changeInput }
      );
      res.status(200).send("Successfully updated!");
    } else {
      res.status(400).send("Bad request");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete", async (req, res) => {
  try {
    let token = parseToken(req.headers.authorization);
    let decoded;
    try {
      decoded = jwt.verify(token, jwtSecretKey);
      console.log(decoded);

      try {
        console.log(req.body.uid);
        await PangolinModel.findOneAndDelete({ uid: decoded.uid }).exec();
        res.status(200).send("Successfully deleted!");
      } catch (error) {
        console.log(error);
        res.status(404).send("User not found!");
      }
    } catch (error) {
      console.log(error);
      return res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// user stuff

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    // mongo call
    const userExist = await PangolinModel.findOne({
      username: req.body.username,
    }).exec();

    if (!userExist) {
      return res.status(404).send({ message: "User not found" });
    }

    // compare passwords
    let passwordMatch;
    if (req.body.password === userExist.password) {
      passwordMatch = true;
    }

    // generate token
    let token;

    if (passwordMatch) {
      let data = {
        username: userExist.name,
        uid: userExist.uid,
      };
      console.log(jwtSecretKey);
      token = await jwt.sign(data, jwtSecretKey, { expiresIn: "30days" });

      return res.status(200).send({ token: token });
    }

    return res.send({ message: "Wrong Credentials!" }).status(400);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
