const express = require("express")
const donorController = require('../controllers/donor.controller')
const verifyToken = require("../middlewares/verfiyToken")
const userRoles = require("../utils/userRoles");
const allowedTo = require('../middlewares/allowedTo');

const router = express.Router();


// post AllDonor for three Hospital
router.post('/addAllDonor',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN),donorController.addAllDonors)



/// get AllDonors for three Hospital 

// Hospital A
router.get('/getDonorHospitalA',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN),donorController.getDonorHospitalA)

//Hospital B
router.get('/getDonorHospitalB',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN),donorController.getDonorHospitalB)

//Hospital C
router.get('/getDonorHospitalC',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN),donorController.getDonorHospitalC)


// update Donor Information 
// Hospital A Information 
router.patch('/updateDonorHospitalA/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN),donorController.updateDonorHospitalA)


// Hospital B Information
router.patch('/updateDonorHospitalB/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN),donorController.updateDonorHospitalB);


// Hospital C Information
router.patch('/updateDonorHospitalC/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN),donorController.updateDonorHospitalC)




//delete Donor Information

//Hospital A
router.delete('/deleteDonorHospitalA/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN),donorController.deleteDonorHospitalA)


//Hospital B
router.delete('/deleteDonorHospitalB/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN),donorController.deleteDonorHospitalB)


//Hospital C
router.delete('/deleteDonorHospitalC/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN),donorController.deleteDonorHospitalC)













module.exports=router