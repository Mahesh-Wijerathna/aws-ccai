const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patient_id: {
    type: String,
    required: true,
    unique: true,
    autoIncrement: true
  },
  full_name: {
    type: String,
    required: true,
    maxlength: 255
  },
  phone_number: {
    type: String,
    required: true,
    maxlength: 15
  },
  date_of_birth: {
    type: Date,
    required: true
  },
  balance: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Patient', patientSchema);