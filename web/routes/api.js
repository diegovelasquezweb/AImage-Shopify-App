const express = require("express");
const { generateImage } = require("../helpers/openai");

const router = express.Router();

router.post("/images", generateImage)

module.exports = router;