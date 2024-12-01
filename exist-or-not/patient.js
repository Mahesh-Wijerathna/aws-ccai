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
  }
});
patientSchema.pre('save', async function (next) {
    if (this.isNew) {
      const maxPatient = await mongoose.model('Patient').findOne().sort('-patient_id');
      this.patient_id = maxPatient ? maxPatient.patient_id + 1 : 1;
    }
    next();
  });
  
module.exports = mongoose.model('Patient', patientSchema);