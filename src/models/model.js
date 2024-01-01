const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: { type: String, select: true },
    cpassword: String,
});

// Index the 'email' field for faster search
empSchema.index({ email: 1 });

const EmpCollection = mongoose.model('EmpCollection', empSchema);

module.exports = EmpCollection;
