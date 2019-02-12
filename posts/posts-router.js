const express = require("express");

const DB = require("../data/db.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = await DB.find(req.query);
    res.status(200).json(db);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the posts."
    });
  }
});
