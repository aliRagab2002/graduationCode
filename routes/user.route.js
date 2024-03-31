const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifyToken = require('../middlewares/verfiyToken')

router.post('/signup',userController.signup)
router.get('/verify/:userId/:uniqueString',userController.verifyEmail)
router.post('/signin',userController.signin)
router.post('/logout',userController.logout)



module.exports=router