const mongoose = require("mongoose")
const validator = require('validator')

const donorSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    phoneNumber: {
        type: String,
        required: true,
        match: /^(010|011|012|015)\d{8}$/,
        message: 'Invalid Egyptian phone number'
    },    
    age:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true

    },
    bloodAmount:{
        type:Number,
        required:true
    },

    bloodType:{

        type:String,
        required:true

    },
    hospital:{
        type:String,
        required:true

    },

  
    gender:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },




});


const Donor = mongoose.model("AllDonor",donorSchema)

module.exports=Donor