const asyncwrapper = require('../middlewares/asyncwrapper')
const Patient = require("../models/patient.model")

const httpsStatusText = require('../utils/httpsStatusText')
const appError = require('../utils/appError')
const { model } = require('mongoose')


const getAllpatients = asyncwrapper( async(req, res, next)=>{
    const query = req.query
    console.log("query: " ,query)
    const limit = query.limit || 100  
    const page  = query.page || 1
    const skip = (page -1 ) * limit

    const patients = await Patient.find({},{"__v":false}).limit(limit).skip(skip)
    res.json({stauts: httpsStatusText.SUCCESS , data:{patients}})
    console.log(patients)
});


const addAllpatient = (req, res) => {
    console.log(req.body);

    if (req.body.hospital === "Hospital A") {
        const patientA = new Patient(req.body);
        patientA.save()
            .then((patientA) => {
                res.send(patientA);
            })
            .catch((e) => {
                res.status(500).send(e); // Sending a proper HTTP status code in case of an error
            });
    }
        
    else if(req.body.hospital === "Hospital B") {
        const patientB = new Patient(req.body);
        patientB.save()
            .then((patientB) => {
                    res.send(patientB);
            })
            .catch((e) => {
                res.status(500).send(e); // Sending a proper HTTP status code in case of an error
            });
        }

        else if(req.body.hospital === "Hospital C") {
            const patientC = new Patient(req.body);
            patientC.save()
                .then((patientC) => {
                    res.send(patientC);
                })
                .catch((e) => {
                    res.status(500).send(e); // Sending a proper HTTP status code in case of an error
                });
        }else {
        res.status(403).send("Invalid hospital"); // Sending a proper HTTP status code for forbidden access
    }
}
///////////////////////////////Get method////////////////////////
// Hospital A 

const getPatientHospitalA = async(req, res, )=>{

    const patient = await Patient.find({hospital:"Hospital A"},{"__v":false})
    res.json({stauts: httpsStatusText.SUCCESS , data:{patient}})
    console.log(patient)

};

// Hospital B
const getPatientHospitalB = async(req, res, )=>{

    const patient = await Patient.find({hospital:"Hospital B"},{"__v":false})
    res.json({stauts: httpsStatusText.SUCCESS , data:{patient}})
    console.log(patient)
    
};

// Hospital C
const getPatientHospitalC = async(req, res, )=>{


    const patient = await Patient.find({hospital:"Hospital C"},{"__v":false})
    res.json({stauts: httpsStatusText.SUCCESS , data:{patient}})
    console.log(patient)
    
};



// update patient information

// Hospital A
const updatePatientHospitalA = async(req, res)=>{
    if(req.body.hospital === "Hospital A"){
        try{
            const _id = req.params.id;

            const updatePatient =await Patient.findByIdAndUpdate(_id,req.body,{
                new:true,
                runValidators:true,
            })

            if(!updatePatient) {
                // return res.json({success : httpsStatusText.FAIL,data:{patient:"patient not found"}})
                return res.send("patient not found");
            }
            return res.json({success:httpsStatusText.SUCCESS,data:{updatePatient}})
        }catch(e){
             res.status(401).json({success:httpsStatusText.ERROR,data:null ,message:e.message,code:401})
        }
    }
    
    else {
        res.status(403).send("Invalid hospital"); // Sending a proper HTTP status code for forbidden access
    }
};

// Hospital B
const updatePatientHospitalB = async(req, res)=>{

    if(req.body.hospital === "Hospital B"){
        try{
            const _id = req.params.id;

            const updatePatient =await Patient.findByIdAndUpdate(_id,req.body,{
                new:true,
                runValidators:true,
            })

            if(!updatePatient) {
                return res.json({success : httpsStatusText.FAIL,data:{patient:"patient not found"}})
                // return res.send("patient not found");
            }
            return res.json({success:httpsStatusText.SUCCESS,data:{updatePatient}})
        }catch(e){
                res.status(401).json({success:httpsStatusText.ERROR,data:null ,message:e.message,code:401})
        }
    }
    
    else {
        res.status(403).send("Invalid hospital"); // Sending a proper HTTP status code for forbidden access
    }
};

// Hospital C
const updatePatientHospitalC = async(req, res)=>{
    if(req.body.hospital === "Hospital C"){
        try{
            const _id = req.params.id;

            const updatePatient =await Patient.findByIdAndUpdate(_id,req.body,{
                new:true,
                runValidators:true,
            })

            if(!updatePatient) {
                // return res.json({success : httpsStatusText.FAIL,data:{patient:"patient not found"}})
                return res.send("patient not found");
            }
            return res.json({success:httpsStatusText.SUCCESS,data:{updatePatient}})
        }catch(e){
                res.status(401).json({success:httpsStatusText.ERROR,data:null ,message:e.message,code:401})
        }
    }
    
    else {
        res.status(403).send("Invalid hospital"); // Sending a proper HTTP status code for forbidden access
    }
}


///delete patient
// Hospital A
const deletePatientHospitalA = async(req, res)=>{
    try {
        const _id = req.params.id;
        const deletePatient = await Patient.findByIdAndDelete(_id);
        if(!deletePatient) {
            return res.json({message : httpsStatusText.FAIL,data:{patient:"patient not found"}})
            // return res.send("patient not found");
        }
        return res.json({success:httpsStatusText.SUCCESS,data:{deletePatient}})
    }catch(e){
         res.status(401).json({success:httpsStatusText.ERROR,data:null,message:e.message,code:401})
    }
};


//Hospital B
const deletePatientHospitalB = async(req, res)=>{
    try {
        const _id = req.params.id;
        const deletePatient = await Patient.findByIdAndDelete(_id);
        if(!deletePatient) {
            return res.json({success : httpsStatusText.FAIL,data:{patient:"patient not found"}})
            // return res.send("patient not found");
        }
        return res.json({success:httpsStatusText.SUCCESS,data:{deletePatient}})
    }catch(e){
         res.status(401).json({success:httpsStatusText.ERROR,data:null,message:e.message,code:401})
    }
};


//Hospital C
const deletePatientHospitalC = async(req, res)=>{
    try {
        const _id = req.params.id;
        const deletePatient = await Patient.findByIdAndDelete(_id);
        if(!deletePatient) {
            return res.json({success : httpsStatusText.FAIL,data:{patient:"patient not found"}})
            // return res.send("patient not found");
        }
        return res.json({success:httpsStatusText.SUCCESS,data:{deletePatient}})
    }catch(e){
         res.status(401).json({success:httpsStatusText.ERROR,data:null,message:e.message,code:401})
    }
};






module.exports={
    getAllpatients,
    addAllpatient,
    getPatientHospitalA,
    getPatientHospitalB,
    getPatientHospitalC,
    deletePatientHospitalA,
    deletePatientHospitalB,
    deletePatientHospitalC,
    updatePatientHospitalA,
    updatePatientHospitalB,
    updatePatientHospitalC


}