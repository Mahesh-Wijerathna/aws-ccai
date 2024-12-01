const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  doctor_id: {
    type: String,
    required: true,
    unique: true,
    autoIncrement: true
  },
  doctor_name: {
    type: String,
    required: true,
    maxlength: 255
  },
  specialization: {
    type: String,
    required: true,
    maxlength: 255
  }
});
// Pre-save hook to auto-increment doctor_id
doctorSchema.pre('save', async function (next) {
    if (this.isNew) {
      const maxDoctor = await mongoose.model('Doctor').findOne().sort('-doctor_id');
      this.doctor_id = maxDoctor ? maxDoctor.doctor_id + 1 : 1;
    }
    next();
  });
module.exports = mongoose.model('Doctor', doctorSchema);