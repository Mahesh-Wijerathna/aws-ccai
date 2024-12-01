const mongoose = require('mongoose');
const Patient = require('./patient');
const Appointment = require('./appointment');
const Doctor = require('./doctor');

const uri = 'mongodb+srv://SoftwareProject:SoftwareProject@cluster0.r0hwfhg.mongodb.net/m_hospital'; // Replace with your MongoDB connection string

exports.handler = async (event) => {
  const eventPropertiesCount = Object.keys(event).length;
  if (eventPropertiesCount !== 2 && eventPropertiesCount !== 5) {
    return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Check inputs' })
    };
    }
  if (eventPropertiesCount === 2) {
    try {
        const {full_name, phone_number } = event;
        if (!full_name || !phone_number) {
            return {
            statusCode: 400,
            message: 'check existence of appointment',
            body: JSON.stringify('Full name and phone number are required')
            };
        }
        await mongoose.connect(uri);

        const patient = await Patient.findOne({ full_name, phone_number });

        if (!patient) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Patient not found' })
        };
        }

        const appointment = await Appointment.findOne({ patient_id: patient.patient_id });

        if (!appointment) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Appointment not found' })
        };
        }

        return {
        statusCode: 200,
        body: JSON.stringify(appointment)
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
else if (eventPropertiesCount === 5) {
    try {
        const { doctor_name, date, time, patient_name, phone_number } = event;
        if (!doctor_name || !date ||!time || !patient_name || !phone_number) {
            return {
            statusCode: 400,
            message: 'unable create appointment',
            body: JSON.stringify('Doctor name, date, patient name, and phone number are required')
            };
        }
        await mongoose.connect(uri);
        const patient = await Patient.findOne({ full_name: patient_name, phone_number });
        if (!patient) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Patient not found on system' })
            };
        }
        const doctor = await Doctor.findOne({ doctor_name });
        if (!doctor) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Doctor not found on system' })
            };
        }
        const appointment = await Appointment.findOne({ appointment_date: date, appointment_time: time});
        if (appointment) {
            return {
                statusCode: 409,
                body: JSON.stringify({ message: 'Appointment on that time already exists' })
            };
        }
        const appointment_id = `${date}_${time}_${doctor.doctor_id}_${patient.patient_id}`;
        const newAppointment = new Appointment({
            appointment_id: appointment_id,
            appointment_date: date,
            appointment_time: time,
            patient_id: patient.patient_id,
            doctor_id: doctor.doctor_id,
            status:"Scheduled"
        });
        await newAppointment.save();
        return {
            statusCode: 201,
            body: JSON.stringify(newAppointment)
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
};