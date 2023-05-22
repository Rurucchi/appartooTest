const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// utils
const jwtSecretKey = process.env.JWT_SECRET_KEY;
