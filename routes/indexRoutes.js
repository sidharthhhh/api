const express = require("express");
const { homepage } = require("../controllers/indexController");
const router = express.Router();


// Get /
router.get("/", homepage)


module.exports = router;