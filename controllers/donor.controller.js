
const Donor = require('../models/donor.models')
const asyncwrapper = require('../middlewares/asyncwrapper')
const httpsStatusText = require('../utils/httpsStatusText')

const moment = require('moment');

// addAllDonors
// const addAllDonors=(req, res) => {
//     console.log(req.body);

//     if (req.body.hospital === "Hospital A") {
//         const donorA = new Donor(req.body);
//         donorA.save()
//             .then((donorA) => {
//                 res.send(donorA);
//             })
//             .catch((e) => {
//                 res.status(500).send(e); // Sending a proper HTTP status code in case of an error
//             });
//     }
        
//     else if(req.body.hospital === "Hospital B") {
//         const donorB = new Donor(req.body);
//         donorB.save()
//             .then((donorB) => {
//                     res.send(donorB);
//             })
//             .catch((e) => {
//                 res.status(500).send(e); // Sending a proper HTTP status code in case of an error
//             });
//         }

//         else if(req.body.hospital === "Hospital C") {
//             const donorC = new Donor(req.body);
//             donorC.save()
//                 .then((donorC) => {
//                     res.send(donorC);
//                 })
//                 .catch((e) => {
//                     res.status(500).send(e); // Sending a proper HTTP status code in case of an error
//                 });
//         }else {
//         res.status(403).send("Invalid hospital"); // Sending a proper HTTP status code for forbidden access
//     }
// };





const addAllDonors = async (req, res, next) => {
    console.log(req.body);

    if (req.body.hospital === "Hospital A") {
        const phoneNumber = req.body.phoneNumber;

        try {
            const donor = await Donor.findOne({ phoneNumber,hospital: 'Hospital A' }).sort({ date: -1 });

            if (!donor) {
                const donorA = new Donor(req.body);
                await donorA.save();
                res.send(donorA);
                // If there are no previous donations
                next(); // The person can donate for the first time
            } else {
                const sixMonthsAgo = moment().subtract(6, 'months');
                const lastDonationDate = moment(donor.date);

                if (lastDonationDate.isBefore(sixMonthsAgo)) {
                    const donorA = new Donor(req.body);
                     donorA.save();
                    res.send(donorA);
                    // If the last donation was at least 6 months ago
                    next(); // The person can donate
                } else {
                    // If the last donation was less than 6 months ago
                    res.status(403).json({ error: 'Cannot donate at the moment.' });
                }
            }
        } catch (error) {
            console.error('Error checking donation date:', error);
            res.status(500).json({ error: 'checking donation date' });
        }
    }else if(req.body.hospital === "Hospital B"){
        const phoneNumber = req.body.phoneNumber;

        try {
            const donor = await Donor.findOne({ phoneNumber,hospital: 'Hospital B' }).sort({ date: -1 });

            if (!donor) {
                const donorA = new Donor(req.body);
                await donorA.save();
                res.send(donorA);
                // If there are no previous donations
                next(); // The person can donate for the first time
            } else {
                const sixMonthsAgo = moment().subtract(6, 'months');
                const lastDonationDate = moment(donor.date);

                if (lastDonationDate.isBefore(sixMonthsAgo)) {
                    const donorA = new Donor(req.body);
                     donorA.save();
                    res.send(donorA);
                    // If the last donation was at least 6 months ago
                    next(); // The person can donate
                } else {
                    // If the last donation was less than 6 months ago
                    res.status(403).json({ error: 'Cannot donate at the moment.' });
                }
            }
        } catch (error) {
            console.error('Error checking donation date:', error);
            res.status(500).json({ error: 'checking donation date' });
        }
    }else if(req.body.hospital === "Hospital C"){
        const phoneNumber = req.body.phoneNumber;

        try {
            const donor = await Donor.findOne({ phoneNumber,hospital: 'Hospital B' }).sort({ date: -1 });

            if (!donor) {
                const donorA = new Donor(req.body);
                await donorA.save();
                res.send(donorA);
                // If there are no previous donations
                next(); // The person can donate for the first time
            } else {
                const sixMonthsAgo = moment().subtract(6, 'months');
                const lastDonationDate = moment(donor.date);

                if (lastDonationDate.isBefore(sixMonthsAgo)) {
                    const donorA = new Donor(req.body);
                     donorA.save();
                    res.send(donorA);
                    // If the last donation was at least 6 months ago
                    next(); // The person can donate
                } else {
                    // If the last donation was less than 6 months ago
                    res.status(403).json({ error: 'Cannot donate at the moment.' });
                }
            }
        } catch (error) {
            console.error('Error checking donation date:', error);
            res.status(500).json({ error: 'checking donation date' });
        }
    }else {
        res.status(403).json({ error: 'Invalid hospital' });
    }
};



    //     const donorA = new Donor(req.body);
    //     donorA.save()
    //         .then((donorA) => {
    //             res.send(donorA);
    //         })
    //         .catch((e) => {
    //             res.status(500).send(e); // Sending a proper HTTP status code in case of an error
    //         });
    // }else {
    //             res.status(403).send("Invalid hospital"); // Sending a proper HTTP status code for forbidden access
    //     }
    // };









// get hospital A 
// const getDonorHospitalA = async(req,res) => {
//     try{
//         const donorA = await Donor.find({hospital:'Hospital A'},{"__v":false})
//         res.json({status:httpsStatusText.SUCCESS,data:{donorA}})
//     }catch(err){
//         res.json({status:httpsStatusText.ERROR,message:err.message})
//     }
// };

// const getDonorHospitalA = async (req, res) => {
//     try {
//         const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

//         // Create an array of promises to get the count for each blood type
//         const promises = bloodTypes.map(async (type) => {
//             const count = await Donor.countDocuments({ hospital: 'Hospital A', bloodType: type });
//             return { [type]: count }; // Creating an object with blood type as key and count as value
//         });

//         // Wait for all promises to resolve
//         const counts = await Promise.all(promises);

//         const donorA = await Donor.find({ hospital: 'Hospital A' }, { "__v": false });

//         res.json({ status: httpsStatusText.SUCCESS, data: { donorA, bloodTypeCounts: counts } });
//     } catch (err) {
//         res.json({ status: httpsStatusText.ERROR, message: err.message });
//     }
// };


// const getDonorHospitalA = async (req, res) => {
//     try {
//         const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'e'];

//         // Create an array of promises to get the total bloodAmount for each blood type
//         const promises = bloodTypes.map(async (type) => {
//             const totalAmount = await Donor.aggregate([
//                 {
//                     $match: { hospital: 'Hospital A', bloodType: type }
//                 },
//                 {
//                     $group: {
//                         _id: null,
//                         totalAmount: { $sum: '$bloodAmount' }
//                     }
//                 }
//             ]);

//             return { [type]: totalAmount.length ? totalAmount[0].totalAmount : 0 };
//         });

//         // Wait for all promises to resolve
//         const amounts = await Promise.all(promises);

//         const donorA = await Donor.find({ hospital: 'Hospital A' }, { "__v": false });

//         res.json({ status: httpsStatusText.SUCCESS, data: { donorA, bloodAmounts: amounts } });
//     } catch (err) {
//         res.json({ status: httpsStatusText.ERROR, message: err.message });
//     }
// };





const getDonorHospitalA = async (req, res) => {
    try {
        const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'e'];

        // Update records that exceeded 1 day since donation
        await Donor.updateMany(
            { hospital: 'Hospital A', date: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
            { $set: { bloodAmount: 0 } }
        );

        // Create an array of promises to get the total bloodAmount for each blood type
        const promises = bloodTypes.map(async (type) => {
            const totalAmount = await Donor.aggregate([
                {
                    $match: { hospital: 'Hospital A', bloodType: type }
                },
                {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: '$bloodAmount' }
                    }
                }
            ]);

            return { [type]: totalAmount.length ? totalAmount[0].totalAmount : 0 };
        });

        // Wait for all promises to resolve
        const amounts = await Promise.all(promises);

        const donorA = await Donor.find({ hospital: 'Hospital A' }, { "__v": false });
        const expiredBlood = await Donor.find({bloodAmount:0,hospital: 'Hospital A'})
       return res.json({ status: httpsStatusText.SUCCESS, data: { donorA, bloodAmounts: amounts,expiredBlood } });

        
        // res.json({status:httpsStatusText.SUCCESS,data:{expiredBlood}})

    } catch (err) {
        res.json({ status: httpsStatusText.ERROR, message: err.message });
    }
};





// get hospital B
// const getDonorHospitalB = async(req,res) => {
//     try{
//         const donorB = await Donor.find({hospital:'Hospital B'},{"__v":false})
//         res.json({status:httpsStatusText.SUCCESS,data:{donorB}})
//     }catch(err){
//         res.json({status:httpsStatusText.ERROR,message:err.message})
//     }
// };

// const getDonorHospitalB = async (req, res) => {
//     try {
//         const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'e'];

//         // Create an array of promises to get the total bloodAmount for each blood type
//         const promises = bloodTypes.map(async (type) => {
//             const totalAmount = await Donor.aggregate([
//                 {
//                     $match: { hospital: 'Hospital B', bloodType: type }
//                 },
//                 {
//                     $group: {
//                         _id: null,
//                         totalAmount: { $sum: '$bloodAmount' }
//                     }
//                 }
//             ]);

//             return { [type]: totalAmount.length ? totalAmount[0].totalAmount : 0 };
//         });

//         // Wait for all promises to resolve
//         const amounts = await Promise.all(promises);

//         const donorA = await Donor.find({ hospital: 'Hospital B' }, { "__v": false });

//         res.json({ status: httpsStatusText.SUCCESS, data: { donorA, bloodAmounts: amounts } });
//     } catch (err) {
//         res.json({ status: httpsStatusText.ERROR, message: err.message });
//     }
// };


const getDonorHospitalB = async (req, res) => {
    try {
        const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'e'];

        // Update records that exceeded 1 day since donation
        await Donor.updateMany(
            { hospital: 'Hospital B', date: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
            { $set: { bloodAmount: 0 } }
        );

        // Create an array of promises to get the total bloodAmount for each blood type
        const promises = bloodTypes.map(async (type) => {
            const totalAmount = await Donor.aggregate([
                {
                    $match: { hospital: 'Hospital B', bloodType: type }
                },
                {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: '$bloodAmount' }
                    }
                }
            ]);

            return { [type]: totalAmount.length ? totalAmount[0].totalAmount : 0 };
        });

        // Wait for all promises to resolve
        const amounts = await Promise.all(promises);

        const donorA = await Donor.find({ hospital: 'Hospital B' }, { "__v": false });
        const expiredBlood = await Donor.find({bloodAmount:0,hospital: 'Hospital B'})
        return res.json({ status: httpsStatusText.SUCCESS, data: { donorA, bloodAmounts: amounts,expiredBlood } });

    } catch (err) {
        res.json({ status: httpsStatusText.ERROR, message: err.message });
    }
};









// get hospital C
// const getDonorHospitalC = async(req,res) => {
//     try{
//         const donorC = await Donor.find({hospital:'Hospital C'},{"__v":false})
//         res.json({status:httpsStatusText.SUCCESS,data:{donorC}})
//     }catch(err){
//         res.json({status:httpsStatusText.ERROR,message:err.message})
//     }
// };

// const getDonorHospitalC = async (req, res) => {
//     try {
//         const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'e'];

//         // Create an array of promises to get the total bloodAmount for each blood type
//         const promises = bloodTypes.map(async (type) => {
//             const totalAmount = await Donor.aggregate([
//                 {
//                     $match: { hospital: 'Hospital C', bloodType: type }
//                 },
//                 {
//                     $group: {
//                         _id: null,
//                         totalAmount: { $sum: '$bloodAmount' }
//                     }
//                 }
//             ]);

//             return { [type]: totalAmount.length ? totalAmount[0].totalAmount : 0 };
//         });

//         // Wait for all promises to resolve
//         const amounts = await Promise.all(promises);

//         const donorA = await Donor.find({ hospital: 'Hospital C' }, { "__v": false });

//         res.json({ status: httpsStatusText.SUCCESS, data: { donorA, bloodAmounts: amounts } });
//     } catch (err) {
//         res.json({ status: httpsStatusText.ERROR, message: err.message });
//     }
// };

const getDonorHospitalC = async (req, res) => {
    try {
        const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'e'];

        // Update records that exceeded 1 day since donation
        await Donor.updateMany(
            { hospital: 'Hospital C', date: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
            { $set: { bloodAmount: 0 } }
        );

        // Create an array of promises to get the total bloodAmount for each blood type
        const promises = bloodTypes.map(async (type) => {
            const totalAmount = await Donor.aggregate([
                {
                    $match: { hospital: 'Hospital C', bloodType: type }
                },
                {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: '$bloodAmount' }
                    }
                }
            ]);

            return { [type]: totalAmount.length ? totalAmount[0].totalAmount : 0 };
        });

        // Wait for all promises to resolve
        const amounts = await Promise.all(promises);

        const donorA = await Donor.find({ hospital: 'Hospital C' }, { "__v": false });
        const expiredBlood = await Donor.find({bloodAmount:0,hospital: 'Hospital C'})
        return res.json({ status: httpsStatusText.SUCCESS, data: { donorA, bloodAmounts: amounts,expiredBlood } });

    } catch (err) {
        res.json({ status: httpsStatusText.ERROR, message: err.message });
    }
};






// update information Hospital A
const updateDonorHospitalA = async(req,res) => {
    if(req.body.hospital === 'Hospital A'){
        try{
            const _id = req.params.id
            const updateDonor = await Donor.findByIdAndUpdate(_id,req.body,{
                new:true,
                runValidators:true,
            })
            if(!updateDonor){
                return res.status(400).json({
                    message:httpsStatusText.FAIL,data:{message:"Donor not found"}
                })
            } res.json({success:httpsStatusText.SUCCESS,data:{updateDonor}})
        }catch(e){
            res.status(401).json({success:httpsStatusText.ERROR,data:null,message:e.message,code:401})
        }
   }
    else {
        res.status(403).send("Invalid hospital"); // Sending a proper HTTP status code for forbidden access
    }
};

// update information Hospital B
const updateDonorHospitalB = async(req,res) => {
    if(req.body.hospital === 'Hospital B'){
        try{
            const _id = req.params.id
            const updateDonor = await Donor.findByIdAndUpdate(_id,req.body,{
                new:true,
                runValidators:true,
            })
            if(!updateDonor){
                return res.status(400).json({
                    message:httpsStatusText.FAIL,data:{message:"Donor not found"}
                })
            } res.json({success:httpsStatusText.SUCCESS,data:{updateDonor}})
        }catch(e){
            res.status(401).json({success:httpsStatusText.ERROR,data:null,message:e.message,code:401})
        }
   }
};

// update information Hospital C
const updateDonorHospitalC = async(req,res) => {
    if(req.body.hospital === 'Hospital C'){
        try{
            const _id = req.params.id
            const updateDonor = await Donor.findByIdAndUpdate(_id,req.body,{
                new:true,
                runValidators:true,
            })
            if(!updateDonor){
                return res.status(400).json({
                    message:httpsStatusText.FAIL,data:{message:"Donor not found"}
                })
            } res.json({success:httpsStatusText.SUCCESS,data:{updateDonor}})
        }catch(e){
            res.status(401).json({success:httpsStatusText.ERROR,data:null,message:e.message,code:401})
        }
   }
};




// delete info donor hospital A
const deleteDonorHospitalA = async(req,res) => {
    
        try{
            const _id = req.params.id
            const deleteDonor = await Donor.findByIdAndDelete(_id)
            if(!deleteDonor){
                return res.status(400).json({
                    message:httpsStatusText.FAIL,data:{message:"Donor not found"}
                })
            } res.json({success:httpsStatusText.SUCCESS,data:{deleteDonor}})
        }catch(e){
            res.status(401).json({success:httpsStatusText.ERROR,data:null,message:e.message,code:401})
        }
};


// delete info donor hospital B
const deleteDonorHospitalB = async(req,res) => {
   
    try{
        const _id = req.params.id
        const deleteDonor = await Donor.findByIdAndDelete(_id)
        if(!deleteDonor){
            return res.status(400).json({
                message:httpsStatusText.FAIL,data:{message:"Donor not found"}
            })
        } res.json({success:httpsStatusText.SUCCESS,data:{deleteDonor}})
    }catch(e){
        res.status(401).json({success:httpsStatusText.ERROR,data:null,message:e.message,code:401})
    }
};


// delete info donor hospital C
const deleteDonorHospitalC = async(req,res) => {

    try{
        const _id = req.params.id
        const deleteDonor = await Donor.findByIdAndDelete(_id)
        if(!deleteDonor){
            return res.status(400).json({
                message:httpsStatusText.FAIL,data:{message:"Donor not found"}
            })
        } res.json({success:httpsStatusText.SUCCESS,data:{deleteDonor}})
    }catch(e){
        res.status(401).json({success:httpsStatusText.ERROR,data:null,message:e.message,code:401})
    }
};




module.exports = {
    addAllDonors,
    getDonorHospitalA,
    getDonorHospitalB,
    getDonorHospitalC,
    updateDonorHospitalA,
    updateDonorHospitalB,
    updateDonorHospitalC,
    deleteDonorHospitalA,
    deleteDonorHospitalB,
    deleteDonorHospitalC,
}