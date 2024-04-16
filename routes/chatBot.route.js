const express = require("express")
const chatBotController = require('../controllers/chatBot.controllers')
const verifyToken = require("../middlewares/verfiyToken")
const userRoles = require("../utils/userRoles");
const allowedTo = require('../middlewares/allowedTo');

const router = express.Router();

router.post('/searchByBloodType',chatBotController.chatBot )

module.exports = router