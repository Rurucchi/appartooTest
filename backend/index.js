const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// config
const app = express();
const port = 4000;

// disable mongoose warning
mongoose.set("strictQuery", true);

async function main() {
  // the reason I hardcode localhost is because for some reason my setup doesn't let me use localhost with mongo, if it doesn't work, try with localhost instead
  await mongoose.connect("mongodb://127.0.0.1:27017/ReadIt");
}

main().catch((err) => console.log(err));

// import routers
const pangolinRouter = require("./pangolin");

// routing
app.use("pangolin", pangolinRouter, cors());

// app listening
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
