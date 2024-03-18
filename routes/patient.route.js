const express = require("express")

const Patient = require("../models/patient.model");
const patientController = require('../controllers/patient.controllers')
const httpsStatusText = require('../utils/httpsStatusText')
const verifyToken    = require("../middlewares/verfiyToken")
const userRoles = require("../utils/userRoles");
const allowedTo = require('../middlewares/allowedTo');

const router = express.Router();

// post AllPatient fo three Hospital
router.post('/addPatiant',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN),
    patientController.addAllpatient );



// getAllpatient for three hospital =================>
router.get("/getPatientA",verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN),patientController.getPatientHospitalA)

router.get("/getPatientB",verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN),patientController.getPatientHospitalB)

router.get("/getPatientC",verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN),patientController.getPatientHospitalC)



// update patient for three hospital
router.patch('/updatePatientA/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN),patientController.updatePatientHospitalA)


router.patch('/updatePatientB/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN),patientController.updatePatientHospitalB)


router.patch('/updatePatientC/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN),patientController.updatePatientHospitalC)



//Delete patient
router.delete('/deletePatientA/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN),patientController.deletePatientHospitalA)

router.delete('/deletePatientB/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN),patientController.deletePatientHospitalB)

router.delete('/deletePatientC/:id',verifyToken, 
allowedTo(userRoles.MANGER,userRoles.ADMIN),patientController.deletePatientHospitalC)








module.exports=router