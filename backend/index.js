const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// config
const app = express();
const port = 4000;
dotenv.config();

// import routers
const pangolinRouter = require("./pangolin");

// disable mongoose warning
mongoose.set("strictQuery", true);
app.use(express.json());
app.use(cors());

async function main() {
  // the reason I hardcode localhost is because for some reason my setup doesn't let me use localhost with mongo, if it doesn't work, try with localhost instead
  await mongoose.connect("mongodb://127.0.0.1:27017/Appartoo");
}

main().catch((err) => console.log(err));

// Middleware: logging
app.use((req, res, next) => {
  console.log(`Time: ${Date.now()} - ${req.method}: ${req.originalUrl}`);
  next();
});

// routing
app.use("/pangolin", pangolinRouter, cors());

// app listening
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
