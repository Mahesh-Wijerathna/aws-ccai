const mongoose = require('mongoose');
const Doctor = require('./doctor'); // Adjust the path as necessary
const Patient = require('./patient'); // Adjust the path as necessary
const Appointment = require('./appointment'); // Adjust the path as necessary

mongoose.connect('mongodb+srv://SoftwareProject:SoftwareProject@cluster0.r0hwfhg.mongodb.net/m_hospital');

const sampleDoctors = [
  {
    doctor_id: 'D-Dr. John Smith',
    doctor_name: 'Dr. John Smith',
    specialization: 'Cardiology'
  },
  {
    doctor_id: 'D-Dr. Jane Doe',
    doctor_name: 'Dr. Jane Doe',
    specialization: 'Neurology'
  },
  {
    doctor_id: 'D-Dr. Emily Johnson',
    doctor_name: 'Dr. Emily Johnson',
    specialization: 'Pediatrics'
  }
];

const samplePatients = [
  {
    patient_id: 'P-Alice Brown-123-456-7890',
    full_name: 'Alice Brown',
    phone_number: '123-456-7890',
    date_of_birth: new Date('1980-01-01')
  },
  {
    patient_id: 'P-Bob White-234-567-8901',
    full_name: 'Bob White',
    phone_number: '234-567-8901',
    date_of_birth: new Date('1990-02-02')
  },
  {
    patient_id: 'P-Charlie Black-345-678-9012',
    full_name: 'Charlie Black',
    phone_number: '345-678-9012',
    date_of_birth: new Date('2000-03-03')
  }
];

const sampleAppointments = [
  {
    appointment_id: 1,
    patient_id: 101,
    doctor_id: 201,
    appointment_date: new Date('2023-10-01'),
    appointment_time: '10:00',
    status: 'Scheduled'
  },
  {
    appointment_id: 2,
    patient_id: 102,
    doctor_id: 202,
    appointment_date: new Date('2023-10-02'),
    appointment_time: '11:00',
    status: 'Completed'
  },
  {
    appointment_id: 3,
    patient_id: 103,
    doctor_id: 203,
    appointment_date: new Date('2023-10-03'),
    appointment_time: '12:00',
    status: 'Cancelled'
  }
];

const createSampleData = async () => {
  try {
    await Doctor.insertMany(sampleDoctors);
    await Patient.insertMany(samplePatients);
    await Appointment.insertMany(sampleAppointments);
    console.log('Sample data created successfully');
  } catch (err) {
    console.error('Error creating sample data:', err);
  } finally {
    mongoose.connection.close();
  }
};

createSampleData();