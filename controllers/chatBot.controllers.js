const Donor = require('../models/donor.models')


const chatBot = async (req, res) => {
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

    
    const resultsByBloodType = {};
    const bloodAmounts = {};

    try {
        
        const selectedBloodType = req.body.selectedBloodType;

    
        const results = await Donor.find({ bloodType: selectedBloodType, date: { $gte: new Date(Date.now() - 8 * 60 * 60 * 1000 ) } }, { "__v": false }).maxTimeMS(30000);

        
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
    chatBot
}
