const Donor = require('../models/donor.models')
const Hospitals = require('../models/hospital.model')
const geolib = require('geolib')



const places = [
    // { latitude: 29.050944, longitude: 31.1199722, name: 'NUB' },
    { latitude: 29.079854985436604, longitude: 31.105923130424692, name: 'BNS' },
    { latitude: 28.1238889, longitude: 30.7345833, name: 'MINIA' },
    { latitude: 29.147444444 ,longitude: 31.129888889, name: "NASER"}
];

const nearestPlace = (req, res) => {
    const myLocation = { latitude: req.body.latitude, longitude: req.body.longitude };
    console.log(myLocation)
    const distances = places.map(place => ({
        name: place.name,
        distance: geolib.convertDistance(geolib.getDistance(myLocation, place), 'km')
        
    }));
    const closestPlace = distances.reduce((prev, current) => (prev.distance < current.distance? prev : current));
    res.json({ closestPlace });
};



const chatBot = async (req, res) => {
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

    
    const resultsByBloodType = {};
    const bloodAmounts = {};

    try {
        
        const selectedBloodType = req.body.selectedBloodType;

    
        const results = await Donor.find({ bloodType: selectedBloodType, date: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000 ) } }, { "__v": false }).maxTimeMS(30000);

        
        const totalBloodAmount = results.reduce((total, donor) => {
            return total + donor.bloodAmount;
        }, 0);

        
        resultsByBloodType[selectedBloodType] = results;
        bloodAmounts[selectedBloodType] = totalBloodAmount;

        res.json({ message: 'Search results', data: resultsByBloodType, bloodAmounts });
    } catch (error) {
        console.error('Error searching in database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    chatBot,
    nearestPlace
}
