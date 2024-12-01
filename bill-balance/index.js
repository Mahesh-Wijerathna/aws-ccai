const mongoose = require('mongoose');
const Patient = require('./patient');

const uri = 'mongodb+srv://SoftwareProject:SoftwareProject@cluster0.r0hwfhg.mongodb.net/m_hospital'; // Replace with your MongoDB connection string

exports.handler = async (event) => {
    const {full_name, phone_number } = event;
    if (!full_name || !phone_number) {
        return {
            statusCode: 400,
            body: JSON.stringify('Full name and phone number are required')
        };
    }
    try {
        await mongoose.connect(uri);

        const patient = await Patient.findOne({ full_name, phone_number });
        if (!patient) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Patient not found' })
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify(patient)
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message })
        };
    }
    finally {
        mongoose.connection.close();
    }
}