const express = require("express")
const chatBotController = require('../controllers/chatBot.controllers')
const verifyToken = require("../middlewares/verfiyToken")
const userRoles = require("../utils/userRoles");
const allowedTo = require('../middlewares/allowedTo');

const router = express.Router();

router.post('/searchByBloodType',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN1,userRoles.ADMIN2,userRoles.ADMIN3,userRoles.USER),
chatBotController.chatBot )

module.exports = router