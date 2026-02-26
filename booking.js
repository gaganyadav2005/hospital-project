const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    sessionType: { type: String, enum: ['text', 'call', 'vc'] },
    amount: Number,
    status: { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' },
    paymentId: String,
    expertEmail: String,
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
