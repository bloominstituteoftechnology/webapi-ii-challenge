// import your node modules
const express = require("express");
const server = express();
const db = require("./data/db");

// home
server.get("/", (req, res) => {
	res.send("API running");
});
