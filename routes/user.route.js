const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/signup',userController.signup)
router.get('/verify/:userId/:uniqueString',userController.verifyEmail)
router.post('/signin',userController.login)


module.exports=router