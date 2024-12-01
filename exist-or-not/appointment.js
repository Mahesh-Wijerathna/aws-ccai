const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  appointment_id: {
    type: String,
    required: true,
    unique: true,
    autoIncrement: true
  },
  patient_id: {
    type: Number,
    required: true,
    ref: 'Patient'
  },
  doctor_id: {
    type: Number,
    required: true,
    ref: 'Doctor'
  },
  appointment_date: {
    type: Date,
    required: true
  },
  appointment_time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled'],
    required: true
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);